import { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { deleteCompanyService, createCompanyService, updateCompanyService } from '../../../graphql/mutations';

import swal from 'sweetalert';

const useServices = (props) => {

    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const [add, setAdd] = useState(false);

    const [ so, setSelectedObject ] = useState({ service: { name: ''  } });

    const [ service, setService ] = useState('');
    const [ cost, setCost ] = useState('');
    const [ serviceName, setServiceName ] = useState('');

    const handleClose = () => setShow(false);

    const handleShow = (action, object) => {
        switch (action) {
            case 'edit':
                setSelectedObject(object);
                setCost(object.cost);
                setEdit(true);
                setAdd(false);
                setServiceName(object.service.name);
                setShow(true);
                
                break;

            case 'view':
                setSelectedObject(object);
                setCost(object.cost);
                setEdit(false);
                setAdd(false);
                setServiceName(object.service.name);
                setShow(true);
                
                break;

            case 'add':
                if(service === '')  {
                    swal({ title: "Agregar Servicio!", text: "Debe seleccionar un servicio.", type: "error", timer: 2000 });
                    break;
                }
    
                setSelectedObject(object);
                setCost('0');
                setEdit(false);
                setAdd(true);
                var lists = props.ap.ser.services;
                
                setServiceName(lists[lists.findIndex(e => e.id === service)].name);
                setShow(true);

                break;
        
            default:
                break;
        }        
    };
    
    const handleDelete = async (id, i) => {
        swal({ title: "Esta seguro que desea eliminar el servicio?", icon: "warning", buttons: true, dangerMode: true })
        .then( async (willDelete) => {
           if (willDelete) {

            try {
                props.ap.load.setLoading({ type: 'deleteservice'+i });
    
                var list = props.ap.cser.companyServices;
    
                await API.graphql(graphqlOperation(deleteCompanyService, {input: {id: id}}));
                list.splice(list.findIndex(e => e.id === id), 1);
                
                props.ap.cser.setCompanyServices(list);
                props.ap.load.setLoading({ type: '' });
    
            } catch (e) {
                console.log(e);
    
                props.ap.load.setLoading({ type: '' });
    
                swal({ title: "Eliminar Servicio!", text: "Ha ocurrido un error. Favor intentarlo mas tarde.", type: "error", timer: 2000 });
            }
             
            swal({ title: "El registro ha sido eliminado!", text: "Se ha eliminado el servicio correctamente.", type: "error", timer: 2000 });

           } else {
            swal({ title: "Eliminacion Cancelada!", text: "Se ha cancelado la eliminacion del servicio.", type: "error", timer: 2000 });
           }
         });
    }

    const handleAddService = async () => {
        try {

             if(service === '') {
                 swal({ title: "Agregar Servicio!", text: "Debe seleccionar un servicio.", type: "error", timer: 2000 });
                return;
             }

             if(cost.match(/^[0-9]+$/) === null) {
                swal({ title: "Agregar Servicio!", text: "El campo costo debe ser un numero.", type: "error", timer: 2000 });
                return;
             }

             var list = props.ap.cser.companyServices;

             if(list[list.findIndex(e => e.service.id === service)] !== undefined) {
                swal({title: "Agregar Servicio!", text: "Este servicio ya existe!", type: "error", timer: 2000 });
                return;
             }

             props.ap.load.setLoading({type: 'addservice'});
    
             const api = await API.graphql(graphqlOperation(createCompanyService, {input: {companyServiceServiceId: service, companyServiceComapnyId: props.ap.state.company.id, cost: cost}}));
             list.push(api.data.createCompanyService);

             props.ap.cser.setCompanyServices(list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
    
             props.ap.load.setLoading({type: ''});

             handleClose();

        } catch (e) {
            console.log(e);

            props.ap.load.setLoading({type: ''});

            handleClose()

            swal({title: "Agregar Servicio!", text: "Ha ocurrido un error. Favor intentarlo mas tarde.", type: "error", timer: 2000 });

        }
    }

    const handleEditService = async () => {
        try {

            if(cost.match(/^[0-9]+$/) === null) {
               swal({ title: "Editar Servicio!", text: "El campo costo debe ser un numero.", type: "error", timer: 2000 });
               return;
            }

            props.ap.load.setLoading({type: 'editservice'});

            var list = props.ap.cser.companyServices;
   
            const api = await API.graphql(graphqlOperation(updateCompanyService, {input: {id: so.id, cost: cost}}));

            list.splice(list.findIndex(e => e.id === so.id), 1);

            list.push(api.data.updateCompanyService);

            props.ap.cser.setCompanyServices(list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
   
            props.ap.load.setLoading({type: ''});

            handleClose();

       } catch (e) {
           console.log(e);

           props.ap.load.setLoading({type: ''});

           handleClose()

           swal({title: "Editar Servicio!", text: "Ha ocurrido un error. Favor intentarlo mas tarde.", type: "error", timer: 2000 });

       }
    }

	return {  add, serviceName, handleAddService, handleEditService, handleDelete, handleClose, handleShow, edit, show, so, cost, setService, setCost };
};

export default useServices;

