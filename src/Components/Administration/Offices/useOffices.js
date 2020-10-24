import { useState, useCallback } from 'react';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { updateOffice, createOffice } from '../../../graphql/mutations';

import getCroppedImg from '../../../commun/cropImage'

import moment from 'moment';

import swal from 'sweetalert';

const useOffices = (props) => {

    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const [add, setAdd] = useState(false);

    const [ so, setSelectedObject ] = useState({});

    const [ name, setName ] = useState('');
    const [ category, setCategory ] = useState(0);
    const [ location, setLocation ] = useState('');

    const [ _crop, setCrop] = useState({ x: 0, y: 0 })
    const [ rotation, setRotation] = useState(0)
    const [ zoom, setZoom] = useState(1)

    const [ imagePath, setImagePath ] = useState([]);
    const [ image, setImage ] = useState([]);
    const [ imageModal, setImageModal ] = useState(false);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [croppedImage, setCroppedImage] = useState(null)

    const [ employees, setEmployess ] = useState([]);

    const handleClose = () => setShow(false);

    const handleShow = (action, object) => {
        switch (action) {
            case 'edit':
                setSelectedObject(object);
                setName(object.name);
                setLocation(object.location);
                setEmployess(object.employees.items);
                setCategory(object.categoryId);
                setEdit(true);
                setAdd(false);
                //setServiceName(object.service.name);
                setShow(true);
                
                break;

            case 'view':
                setSelectedObject(object);
                setName(object.name);
                setLocation(object.location);
                setEmployess(object.employees.items);
                setCategory(object.categoryId);
                setEdit(false);
                setAdd(false);
                //setServiceName(object.service.name);
                setShow(true);
                
                break;

            case 'add':
                setName('');
                setLocation('');
                setCategory(0);
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

             var list = props.ap.off.offices;

             if(category === 0 || category === (0).toString()){
                swal({title: "Editar Oficina!", text: "Debe seleccionar una categoria.", type: "error", timer: 2500 });
                return;
             }

             if(list[list.findIndex(e => e.location === location)] !== undefined) {
                swal({title: "Agregar Oficina!", text: "Ya existe una oficina con esta ubicacion!", type: "error", timer: 2000 });
                return;
             }

             if(list[list.findIndex(e => e.name === name)] !== undefined) {
                swal({title: "Agregar Oficina!", text: "Ya existe una oficina con este nombre!", type: "error", timer: 2000 });
                return;
             }

             props.ap.load.setLoading({type: 'addoffice'});

             const inp = { name: name, location: location, categoryId: category, categoryOfficesId: category, companyOfficesId: props.cp.state.company.id };
    
             const api = await API.graphql(graphqlOperation(createOffice, {input: inp}));

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

            if(category === 0 || category === (0).toString()){
                swal({title: "Editar Oficina!", text: "Debe seleccionar una categoria.", type: "error", timer: 2500 });
                return;
            }

            props.ap.load.setLoading({type: 'editoffice'});

            var list = props.ap.off.offices;
   
            const api = await API.graphql(graphqlOperation(updateOffice, {input: {id: so.id, location: location, name: name, categoryId: category, categoryOfficesId: category}}));

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

    const handleImageSelected = (e) => {
        console.log(e.target.files);
        var selectedFile = e.target.files[0];
        var reader = new FileReader();

        reader.onload = function(event) {
            setImagePath(event.target.result);
            console.log(event.target.result);
        };       
        setImageModal(true);
        reader.readAsDataURL(selectedFile);
    }

    const putImageOnStorage = async (officeId) => {
        try {
            if(image[0] !== undefined){

                if(image[0].type === "application/pdf"){

                    return "";
                }
                const filename = "OFFICES_PROFILE_IMAGES/"+officeId+".pdf";
                await Storage.put(filename, image[0], { contentType: 'application/pdf' });
                return filename;
            }else{
                return ""
            }
            
        } catch (e) {
            console.log(e);

            props.ap.load.setLoading({type: ''});

            handleClose()

            swal({title: "Agregar Imagen!", text: "Ha ocurrido un error. Favor intentarlo mas tarde.", type: "error", timer: 2000 });
        }
    }

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const showCroppedImage = useCallback(async () => {
        try {
          const croppedImage = await getCroppedImg(
            imagePath,
            croppedAreaPixels,
            rotation
          )
          console.log('donee', { croppedImage })
          setCroppedImage(croppedImage)
        } catch (e) {
          console.error(e)
        }
      }, [croppedAreaPixels, rotation])

    const handleCloseImageModal = useCallback(() => {
        setImageModal(false);
        setImagePath([]);
        setCroppedImage(null)
    }, [])

    const handleAddImageCropped = () => {
        console.log('here');
    }

    const crop = {
        imagePath,
        handleAddImageCropped,
        handleCloseImageModal,
        handleImageSelected,
        imageModal,
        setImageModal,
        _crop,
        rotation,
        zoom,
        setCrop,
        setRotation,
        onCropComplete,
        setZoom,
        setCroppedImage,
        croppedImage
    };

	return { crop, add, handleAdd, handleEdit, handleDelete, handleClose, handleShow, edit, show, so, setLocation, setName, location, name, employees, setCategory, category };
};

export default useOffices;

