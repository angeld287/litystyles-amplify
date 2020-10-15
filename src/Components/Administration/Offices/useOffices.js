import { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { updateOffice, createOffice } from '../../../graphql/mutations';

import moment from 'moment';

import swal from 'sweetalert';

const useOffices = (props) => {

    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const [add, setAdd] = useState(false);

    const [ so, setSelectedObject ] = useState({});

    const [ name, setName ] = useState('');
    const [ location, setLocation ] = useState('');
    const [ employees, setEmployess ] = useState([]);

    const handleClose = () => setShow(false);

    const handleShow = (action, object) => {
        switch (action) {
            case 'edit':
                setSelectedObject(object);
                setName(object.name);
                setLocation(object.location);
                setEdit(true);
                setAdd(false);
                //setServiceName(object.service.name);
                setShow(true);
                
                break;

            case 'view':
                setSelectedObject(object);
                setName(object.name);
                setLocation(object.location);
                setEmployess(object.employees.items)
                setEdit(false);
                setAdd(false);
                //setServiceName(object.service.name);
                setShow(true);
                
                break;

            case 'add':
                setName('');
                setLocation('');
                setEdit(false);
                setAdd(true);
                setShow(true);

                break;
        
            default:
                break;
        }        
    };
    
    const handleDelete = async (id, i) => {
        var list = props.ap.off.offices;

        var office = list[list.findIndex(e => e.id === id)]

        if(props.ap.off.offices.length === 1) {
            swal({title: "Eliminar Oficina!", text: "Esta es la unica oficina que existe, no puede ser eliminada", type: "error", timer: 3000 });
            return;
        }

        if(office.employees.items.length > 0) {
            swal({title: "Eliminar Oficina!", text: "Borre los empleados asignados a esta oficina antes de eliminarla", type: "error", timer: 3000 });
            return;
        }


        swal({ title: "Esta seguro que desea eliminar la oficina?", icon: "warning", buttons: true, dangerMode: true })
        .then( async (willDelete) => {
           if (willDelete) {

            try {
                props.ap.load.setLoading({ type: 'deleteoffice'+i });
    
                await API.graphql(graphqlOperation(updateOffice, {input: {id: id, deleted: true, deletedAt: moment(new Date()).format('YYYY-MM-DDTHH:mm:ss.SSS')+'Z'}}));
                list.splice(list.findIndex(e => e.id === id), 1);
                
                props.ap.off.setOffices(list);
                props.ap.load.setLoading({ type: '' });
    
            } catch (e) {
                console.log(e);
    
                props.ap.load.setLoading({ type: '' });
    
                swal({ title: "Agregar Oficina!", text: "Ha ocurrido un error. Favor intentarlo mas tarde.", type: "error", timer: 2000 });
            }
             
            swal({ title: "El registro ha sido eliminado!", text: "La oficina se ha eliminado correctamente.", type: "error", timer: 2000 });

           } else {
            swal({ title: "Eliminacion Cancelada!", text: "La eliminacion de la oficina se ha cancelado.", type: "error", timer: 2000 });
           }
         });
    }

    const handleAdd = async () => {
        try {

             /* if(service === '') {
                 swal({ title: "Agregar Oficina!", text: "Debe seleccionar un servicio.", type: "error", timer: 2000 });
                return;
             }

             if(cost.match(/^[0-9]+$/) === null) {
                swal({ title: "Agregar Oficina!", text: "El campo costo debe ser un numero.", type: "error", timer: 2000 });
                return;
             } */

             var list = props.ap.off.offices;

             if(list[list.findIndex(e => e.location === location)] !== undefined) {
                swal({title: "Agregar Oficina!", text: "Ya existe una oficina con esta ubicacion!", type: "error", timer: 2000 });
                return;
             }

             if(list[list.findIndex(e => e.name === name)] !== undefined) {
                swal({title: "Agregar Oficina!", text: "Ya existe una oficina con este nombre!", type: "error", timer: 2000 });
                return;
             }

             props.ap.load.setLoading({type: 'addoffice'});
    
             const api = await API.graphql(graphqlOperation(createOffice, {input: { name: name, location: location }}));

             list.push(api.data.createOffice);

             props.ap.off.setOffices(list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
    
             props.ap.load.setLoading({type: ''});

             handleClose();

        } catch (e) {
            console.log(e);

            props.ap.load.setLoading({type: ''});

            handleClose()

            swal({title: "Agregar Oficina!", text: "Ha ocurrido un error. Favor intentarlo mas tarde.", type: "error", timer: 2000 });

        }
    }

    const handleEdit = async () => {
        try {

            props.ap.load.setLoading({type: 'editoffice'});

            var list = props.ap.off.offices;
   
            const api = await API.graphql(graphqlOperation(updateOffice, {input: {id: so.id, location: location, name: name}}));

            list.splice(list.findIndex(e => e.id === so.id), 1);

            list.push(api.data.updateOffice);

            props.ap.off.setOffices(list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
   
            props.ap.load.setLoading({type: ''});

            handleClose();

       } catch (e) {
           console.log(e);

           props.ap.load.setLoading({type: ''});

           handleClose()

           swal({title: "Editar Oficina!", text: "Ha ocurrido un error. Favor intentarlo mas tarde.", type: "error", timer: 2000 });

       }
    }

	return {  add, handleAdd, handleEdit, handleDelete, handleClose, handleShow, edit, show, so, setLocation, setName, location, name, employees };
};

export default useOffices;

