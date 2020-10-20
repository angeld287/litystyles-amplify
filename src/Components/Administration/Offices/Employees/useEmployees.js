import { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listEmployees } from '../../../../graphql/queries';
import { createEmployeeService, deleteEmployeeService, /* updateEmployeeService, */ updateEmployee } from '../../../../graphql/mutations';

//import moment from 'moment';

import aws_exports from '../../../../aws-exports'; 

import swal from 'sweetalert';

const useEmployees = (props) => {

    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const [add, setAdd] = useState(false);
    const [lookingforuser, setlookingforuser ] = useState(false);

    const [ name, setName ] = useState('');
    const [ service, setService ] = useState('');

    const [ email, setEmail ] = useState('');
    const [ cognitoUsers, setCognitoUsers ] = useState([])

    const [ so, setSelectedObject ] = useState({});


    const handleClose = () => setShow(false);

    const handleShow = (action, object) => {
        switch (action) {
            case 'edit':
                setSelectedObject(object);
                setName(object.name);
                setEdit(true);
                setAdd(false);
                setShow(true);
                
                break;

            case 'view':
                setSelectedObject(object);
                setName(object.name);
                setEdit(false);
                setAdd(false);
                setShow(true);
                
                break;

            case 'add':
                setSelectedObject({});
                setName('');
                setEdit(false);
                setAdd(true);
                setShow(true);

                break;
        
            default:
                break;
        }        
    };

    const addServiceToEmployee = async () =>{
        try {

            var _services = so.services.items;
            
            if(service === '')  {
                swal({ title: "Agregar Servicio a Empleado!", text: "Debe seleccionar un servicio.", type: "error", timer: 2500 });
                return;
            }

            if(_services[_services.findIndex(e => e.service.id === service)] !== undefined) {
                swal({title: "Agregar Servicio a Empleado!", text: "Este servicio ya existe!", type: "error", timer: 2500 });
                return;
            }

            props.ap.load.setLoading({type: 'addemployeeservice'});
   
            const api = await API.graphql(graphqlOperation(createEmployeeService, {input: {employeeServiceEmployeeId: so.id, employeeServiceServiceId: service}}));

            var sobject = {
                id: api.data.createEmployeeService.id,
                service: {
                    name: api.data.createEmployeeService.service.name,
                    id: api.data.createEmployeeService.service.id
                }
            };

            _services.push(sobject);
   
            props.ap.load.setLoading({type: ''});

       } catch (e) {
           console.log(e);

           props.ap.load.setLoading({type: ''});

           swal({title: "Agregar Oficina!", text: "Ha ocurrido un error. Favor intentarlo mas tarde.", type: "error", timer: 2000 });

       }
    }

    const handleDelete = async (id, i) => {

        var _services = so.services.items;

        swal({ title: "Esta seguro que desea desasociar el servicio?", icon: "warning", buttons: true, dangerMode: true })
        .then( async (willDelete) => {
           if (willDelete) {

            try {
                props.ap.load.setLoading({ type: 'deleteservice'+i });
    
                await API.graphql(graphqlOperation(deleteEmployeeService, {input: {id: id}}));

                _services.splice(_services.findIndex(e => e.id === id), 1);
                
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


    //se actualiza el empleado limpiando los campos que lo relacionan con la empresa. 
    const handleUnlinkEmployee = async (item, i) => {
        try {
            var id = item.id;

            var oi = props.ap.off.offices.findIndex(e => e.id === item.officeId);

            var officeList = props.ap.off.offices;

            var office = officeList[oi];

            var employeesList = office.employees.items;

            props.ap.load.setLoading({type: 'unlinkemployee'+i});
   
            await API.graphql(graphqlOperation(updateEmployee, {input: {id: id, officeEmployeesId: 'nan', officeId: 'nan'}}));

            employeesList.splice(employeesList.findIndex(e => e.id === item.id), 1);
   
            props.ap.load.setLoading({type: ''});

            handleClose();

       } catch (e) {
           console.log(e);

           props.ap.load.setLoading({type: ''});

           handleClose()

           swal({title: "Editar Servicio!", text: "Ha ocurrido un error. Favor intentarlo mas tarde.", type: "error", timer: 2000 });

       }
    }

    const handleFindUser = async () => {
        try {
            setlookingforuser(true);
            const apiOptions = {
                headers: {'Content-Type': 'application/json' },
                body: { 
                    UserPoolId: aws_exports.aws_user_pools_id,
                    filterBy: 'email',
                    value: email
                }
            };
            
            const _user = await API.post('apiForLambda', '/findUser', apiOptions);

            setCognitoUsers(_user.body.Users);

            setlookingforuser(false);
            
        } catch (e) {
            console.log(e);

            setlookingforuser(false);

            handleClose()

            swal({title: "Buscar Empleado!", text: "Ha ocurrido un error. Favor intentarlo mas tarde.", type: "error", timer: 2000 });
        }
    }

    
    const handleLinkEmployee = async (item, i) => {
        //console.log(item);
        
        //con el username en cognito identificado, se buscara el usuario en la db
        const employee = await API.graphql(graphqlOperation(listEmployees, {filter: {username: {eq: item.Username}}}));
        const _employee = employee.data.listEmployees.items;
        if (_employee.length > 0) {
            //si esta asociado a una oficina mostrara un mensaje indicando que ya esta en una oficina
            if (_employee[0].officeId !== 'nan' && _employee[0].officeId !== '') {
                swal({title: "Asociar Empleado!", text: "Este empleado ya esta asociado a una empresa.", type: "error", timer: 2000 });
                return;
            }

            //si no esta asiciado en ninguna oficina entonses sera actualizado agregando las respectivas asociaciones    
            //var id = _employee[0].id;

            //var oi = props.ap.off.offices.findIndex(e => e.id === item.officeId);

            //var officeList = props.ap.off.offices;

            //var office = officeList[oi];

            //var employeesList = office.employees.items;

            //props.ap.load.setLoading({type: 'linkemployee'+i});
   
            //await API.graphql(graphqlOperation(updateEmployee, {input: {id: id, officeEmployeesId: 'nan', officeId: 'nan'}}));

            //employeesList.splice(employeesList.findIndex(e => e.id === item.id), 1);
   
            props.ap.load.setLoading({type: ''});

            //handleClose();

        }else {
            //si no existe en la db sera creado con las respectivas asociaciones e informaciones
            console.log(props.office);

        }    
    }

	return { lookingforuser, handleLinkEmployee, cognitoUsers, handleFindUser, add, handleClose, handleShow, email, setEmail, edit, show, so, name, setName, setService, addServiceToEmployee, handleDelete, handleUnlinkEmployee };
};

export default useEmployees;