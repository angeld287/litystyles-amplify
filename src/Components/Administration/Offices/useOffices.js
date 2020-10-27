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

    const [ s3Image, setS3Image ] = useState('');

    const [ employees, setEmployess ] = useState([]);

    const handleClose = () => setShow(false);

    const handleShow = (action, object) => {
        switch (action) {
            case 'edit':
                getImageFromStorage(object.image)
                setSelectedObject(object);
                setName(object.name);
                setLocation(object.location);
                setEmployess(object.employees.items);
                setCategory(object.categoryId);
                setEdit(true);
                setAdd(false);
                setShow(true);
                
                break;

            case 'view':
                getImageFromStorage(object.image)
                setSelectedObject(object);
                setName(object.name);
                setLocation(object.location);
                setEmployess(object.employees.items);
                setCategory(object.categoryId);
                setEdit(false);
                setAdd(false);
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

            const input = {id: so.id, location: location, name: name, categoryId: category, categoryOfficesId: category};

            if(croppedImage !== null){
                const _image = await putImageOnStorage(so.id);
                if(_image !== undefined){input.image = _image.key;}
            }
   
            const api = await API.graphql(graphqlOperation(updateOffice, {input: input}));

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

    const handleImageSelected = async (e) => {
        var selectedFile = e.target.files[0];
        var reader = new FileReader();

        reader.onload = async function(event) {
            if(selectedFile.size > 80000){
                //ResizeImage(selectedFile);
                setImagePath(event.target.result);
            }else{
                setImagePath(event.target.result);
            }
        };       

        setImageModal(true);
        reader.readAsDataURL(selectedFile);
    }

    const putImageOnStorage = async (officeId) => {
        try {
            if(image !== []){

                if(image.type.includes("image/")){
                    const filename = "OFFICES_PROFILE_IMAGES/"+officeId+".jpeg";
                    const putr = await Storage.put(filename, image, { contentType: image.type });
                    return putr;
                }else{
                    swal({title: "Agregar Imagen!", text: "Solo se puede agregar un archivo tipo imagen.", type: "error", timer: 3000 });
                    return "";
                }
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
          props.ap.load.setLoading({type: 'croppingimage'});

          const croppedImage = await getCroppedImg(
            imagePath,
            croppedAreaPixels,
            rotation
          )
          
          setCroppedImage(croppedImage);
          
          setImage(dataURLtoFile(croppedImage, so.id));

          setImageModal(false);

          props.ap.load.setLoading({type: ''});

        } catch (e) {

          console.error(e);

          props.ap.load.setLoading({type: ''});

        }
      }, [so.id, imagePath, croppedAreaPixels, rotation, props])

    const dataURLtoFile = (dataurl, filename) => {
 
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});
    }

    const handleCloseImageModal = useCallback(() => {
        setImageModal(false);
        setImagePath([]);
        //setCroppedImage(null);
    }, [])

    const handleAddImageCropped = () => {
        console.log('here');
    }

    const getImageFromStorage = async (image) => {
        if(s3Image === '' && image !== '' && image !== null) {
        const file = await Storage.get(image);
        setS3Image(file);
        }
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
        croppedImage,
        showCroppedImage
    };

	return { s3Image, crop, add, handleAdd, handleEdit, handleDelete, handleClose, handleShow, edit, show, so, setLocation, setName, location, name, employees, setCategory, category };
};

export default useOffices;

