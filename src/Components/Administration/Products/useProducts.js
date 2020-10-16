import { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { deleteCompanyProduct, createCompanyProduct, updateCompanyProduct } from '../../../graphql/mutations';

import swal from 'sweetalert';

const useProducts = (props) => {

    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const [add, setAdd] = useState(false);

    const [ so, setSelectedObject ] = useState({ product: { name: ''  } });

    const [ product, setProduct ] = useState('');
    const [ cost, setCost ] = useState('');
    const [ productName, setProductName ] = useState('');

    const handleClose = () => setShow(false);

    const handleShow = (action, object) => {
        switch (action) {
            case 'edit':
                setSelectedObject(object);
                setCost(object.cost);
                setEdit(true);
                setAdd(false);
                setProductName(object.product.name);
                setShow(true);
                
                break;

            case 'view':
                setSelectedObject(object);
                setCost(object.cost);
                setEdit(false);
                setAdd(false);
                setProductName(object.product.name);
                setShow(true);
                
                break;

            case 'add':
                if(product === '')  {
                    swal({ title: "Agregar Producto!", text: "Debe seleccionar un producto.", type: "error", timer: 2000 });
                    break;
                }
    
                setSelectedObject(object);
                setCost('0');
                setEdit(false);
                setAdd(true);
                var lists = props.ap.pro.products;
                
                setProductName(lists[lists.findIndex(e => e.id === product)].name);
                setShow(true);

                break;
        
            default:
                break;
        }        
    };
    
    const handleDelete = async (id, i) => {
        swal({ title: "Esta seguro que desea eliminar el producto?", icon: "warning", buttons: true, dangerMode: true })
        .then( async (willDelete) => {
           if (willDelete) {

            try {
                props.ap.load.setLoading({ type: 'deleteproduct'+i });
    
                var list = props.ap.cpro.companyProducts;
    
                await API.graphql(graphqlOperation(deleteCompanyProduct, {input: {id: id}}));
                list.splice(list.findIndex(e => e.id === id), 1);
                
                props.ap.cpro.setCompanyProducts(list);
                props.ap.load.setLoading({ type: '' });
    
            } catch (e) {
                console.log(e);
    
                props.ap.load.setLoading({ type: '' });
    
                swal({ title: "Agregar Producto!", text: "Ha ocurrido un error. Favor intentarlo mas tarde.", type: "error", timer: 2000 });
            }
             
            swal({ title: "El registro ha sido eliminado!", text: "Se ha eliminado el producto correctamente.", type: "error", timer: 2000 });

           } else {
            swal({ title: "Eliminacion Cancelada!", text: "Se ha cancelado la eliminacion del producto.", type: "error", timer: 2000 });
           }
         });
    }

    const handleAddProduct = async () => {
        try {

             if(product === '') {
                 swal({ title: "Agregar Producto!", text: "Debe seleccionar un producto.", type: "error", timer: 2000 });
                return;
             }

             if(cost.match(/^[0-9]+$/) === null) {
                swal({ title: "Agregar Producto!", text: "El campo costo debe ser un numero.", type: "error", timer: 2000 });
                return;
             }

             var list = props.ap.cpro.companyProducts;

             if(list[list.findIndex(e => e.product.id === product)] !== undefined) {
                swal({title: "Agregar Producto!", text: "Este producto ya existe!", type: "error", timer: 2000 });
                return;
             }

             props.ap.load.setLoading({type: 'addproduct'});
    
             const api = await API.graphql(graphqlOperation(createCompanyProduct, {input: {companyProductProductId: product, companyProductComapnyId: props.ap.state.company.id, cost: cost}}));
             list.push(api.data.createCompanyProduct);

             props.ap.cpro.setCompanyProducts(list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
    
             props.ap.load.setLoading({type: ''});

             handleClose();

        } catch (e) {
            console.log(e);

            props.ap.load.setLoading({type: ''});

            handleClose()

            swal({title: "Agregar Producto!", text: "Ha ocurrido un error. Favor intentarlo mas tarde.", type: "error", timer: 2000 });

        }
    }

    const handleEditProduct = async () => {
        try {

            if(cost.match(/^[0-9]+$/) === null) {
               swal({ title: "Editar Producto!", text: "El campo costo debe ser un numero.", type: "error", timer: 2000 });
               return;
            }

            props.ap.load.setLoading({type: 'editproduct'});

            var list = props.ap.cpro.companyProducts;
   
            const api = await API.graphql(graphqlOperation(updateCompanyProduct, {input: {id: so.id, cost: cost}}));

            list.splice(list.findIndex(e => e.id === so.id), 1);

            list.push(api.data.updateCompanyProduct);

            props.ap.cpro.setCompanyProducts(list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
   
            props.ap.load.setLoading({type: ''});

            handleClose();

       } catch (e) {
           console.log(e);

           props.ap.load.setLoading({type: ''});

           handleClose()

           swal({title: "Editar Producto!", text: "Ha ocurrido un error. Favor intentarlo mas tarde.", type: "error", timer: 2000 });

       }
    }

	return {  add, productName, handleAddProduct, handleEditProduct, handleDelete, handleClose, handleShow, edit, show, so, cost, setProduct, setCost };
};

export default useProducts;

