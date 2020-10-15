import { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { updateOffice, createOffice } from '../../../../graphql/mutations';

import moment from 'moment';

import swal from 'sweetalert';

const useEmployees = (props) => {

    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const [add, setAdd] = useState(false);

    const [ name, setName ] = useState('');

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

	return {  add, handleClose, handleShow, edit, show, so, name, setName };
};

export default useEmployees;