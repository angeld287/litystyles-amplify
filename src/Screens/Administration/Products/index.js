import React, { useState, useMemo, useEffect, useCallback } from 'react';
import CustomButton from '../../../Components/CustomButton';
import CustomModal from '../../../Components/CustomModal';
import CustomSelect from '../../../Components/CustomSelect';
import CustomTable from '../../../Components/CustomTable';

import { listProducts, getCompanyProducts } from "../../../graphql/customQueries"
import { createCompanyProduct, deleteCompanyProduct, updateCompanyProduct } from "../../../graphql/customMutations"
import { getList, getItemById, createUpdateItem, deleteItem } from "../../../services/AppSync"

import { QUERY_LIMIT } from '../../../utils/Constants'

import { connect } from 'react-redux';
import { setCompanyProduct, removeCompanyProduct, setItemsFromStore, setNextToken, editCompanyProduct } from '../../../redux/products/products.actions'

import swal from 'sweetalert';

import { Container, Row, Col } from 'react-bootstrap';

const Products = ({ currentTab, _companyProducts, products, setCompanyProduct, removeCompanyProduct, setItemsFromStore, setNextToken, company, companyProductsNextToken, productsNextToken, editCompanyProduct }) => {

    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [product, setProduct] = useState('0');
    const [companyProducts, setCompanyProducts] = useState([]);
    const [companyProductObj, setCompanyProductObj] = useState({ id: '0', product: { id: '0', name: 'no item selected', cost: '0' }, cost: '0' });
    const [dlBtnLoading, setDlBtnLoading] = useState('');
    const [loading, setLoading] = useState(false);
    const [mutation, setMutation] = useState('');

    //#region Actions to fetch data

    useEffect(() => {
        let didCancel = false;
        const fetch = async () => {
            setLoading(true);

            var result = [];
            var _products = products;
            var __companyProducts = _companyProducts;
            let parameters = {};
            let tokens = { productsNextToken, companyProductsNextToken };

            try {
                //get products
                if (products.length === 0) {
                    parameters = { limit: QUERY_LIMIT, filter: { deleted: { ne: true } } };
                    result = await getList('listProducts', listProducts, parameters);
                    _products = result.items;
                    tokens.productsNextToken = result.nextToken
                    while (_products.length < QUERY_LIMIT && result.nextToken !== null) {
                        parameters.nextToken = result.nextToken;
                        result = await getList('listProducts', listProducts, parameters);
                        _products = [..._products, ...result.items];
                        tokens.productsNextToken = result.nextToken
                    }
                }

                //get companyProducts
                if (_companyProducts.length === 0) {
                    parameters = { id: company.id, limit: QUERY_LIMIT };
                    result = await getItemById('getCompany', getCompanyProducts, parameters);
                    __companyProducts = result.products.items;
                    tokens.companyProductsNextToken = result.products.nextToken
                    while (__companyProducts.length < QUERY_LIMIT && result.products.nextToken !== null) {
                        parameters.nextToken = result.products.nextToken;
                        result = await getItemById('getCompany', getCompanyProducts, parameters);
                        __companyProducts = [...__companyProducts, ...result.products.items];
                        tokens.companyProductsNextToken = result.products.nextToken
                    }
                }

            } catch (e) {
                console.log(e)

                setLoading(false);
                throw new Error('CompanyProducts - 01: ', e)
            }

            if (!didCancel) {
                if (products.length === 0 || _companyProducts.length === 0) {
                    setItemsFromStore({
                        products: _products,
                        companyProducts: __companyProducts
                    });

                    setNextToken(tokens);
                }
                setLoading(false);
            }
        };

        if (currentTab === "products") {
            fetch();
        }

        return () => {
            didCancel = true;
            setLoading(false)
        };

    }, [setNextToken, setItemsFromStore, company, currentTab, products, _companyProducts, productsNextToken, companyProductsNextToken])

    const getItemsNextToken = useCallback(async () => {
        setLoading(true);

        var result = [];
        var parameters = {};
        var tokens = { productsNextToken, companyProductsNextToken }
        var __companyProducts = [];

        if (companyProductsNextToken !== null) {
            try {
                parameters = { id: company.id, limit: QUERY_LIMIT, nextToken: companyProductsNextToken };
                result = await getItemById('getCompany', getCompanyProducts, parameters);
                __companyProducts = result.products.items;
                tokens.companyProductsNextToken = result.products.nextToken

                setItemsFromStore({
                    products: products,
                    companyProducts: [..._companyProducts, ...__companyProducts]
                });

                setNextToken(tokens);
            } catch (e) {
                console.log(e)
                throw new Error('CompanyProducts - 02: ', e)
            }
        }

        setLoading(false);
    }, [productsNextToken, companyProductsNextToken, company, products, setItemsFromStore, setNextToken, _companyProducts]);

    const getItemsNextTokenSelect = useCallback(async () => {

        var result = [];
        var parameters = {};
        var tokens = { productsNextToken, companyProductsNextToken }
        var _products = [];

        if (productsNextToken !== null) {
            try {

                parameters = { limit: QUERY_LIMIT, filter: { deleted: { ne: true } }, nextToken: productsNextToken };
                result = await getList('listProducts', listProducts, parameters);
                _products = result.items;
                tokens.productsNextToken = result.nextToken

                setItemsFromStore({
                    products: [...products, ..._products],
                    companyProducts: _companyProducts,
                });

                setNextToken(tokens);
            } catch (e) {
                console.log(e)
                throw new Error('CompanyProducts - 03: ', e)
            }
        }
    }, [productsNextToken, companyProductsNextToken, products, setItemsFromStore, setNextToken, _companyProducts]);

    const getCompanyProductById = useCallback(async (id) => {
        let _product = _companyProducts.find(e => e.product.id === id);

        if (_product === undefined && companyProductsNextToken !== null) {

            let result = [];
            let __companyProducts = [];
            let parameters = { id: company.id };
            let tokens = {};

            result = await getItemById('getCompany', getCompanyProducts, parameters);
            __companyProducts = result.products.items;

            tokens.productsNextToken = productsNextToken;
            tokens.companyProductsNextToken = result.products.nextToken;

            _product = __companyProducts.find(e => e.product.id === id);

            while (_product === undefined && result.products.nextToken !== null) {
                parameters.nextToken = result.products.nextToken;
                result = await getItemById('getCompany', getCompanyProducts, parameters);
                __companyProducts = [...__companyProducts, ...result.products.items];
                tokens.companyProductsNextToken = result.products.nextToken
                _product = __companyProducts.find(e => e.product.id === id);
            }

            setItemsFromStore({
                products: products,
                companyProducts: __companyProducts
            });

            setNextToken(tokens);
        }

        return _product;

    }, [company, _companyProducts, companyProductsNextToken, productsNextToken, products, setItemsFromStore, setNextToken]);

    const handleShowModal = useCallback((e) => {
        if (!showModal) {
            if (e === null) {
                if (product === '0') {
                    swal({ title: "Agregar Producto!", text: "Debe seleccionar un producto.", icon: "error", timer: 2000 });
                    return null;
                }
                setMutation('create')
            } else if (e.product !== undefined) {
                setCompanyProductObj(e)
                setMutation('update')
            }
        } else {
            setCompanyProductObj({ id: '0', product: { id: '0', name: 'no item selected', cost: '0' }, cost: '0' })
            setMutation('')
        }

        setShowModal(!showModal);
    }, [product, showModal]);

    //#endregion

    //#region Mutation Actions

    const onSubmitModal = useCallback(async (e) => {
        try {
            if (mutation === 'create' && product === '0') {
                swal({ title: "Agregar Producto!", text: "Debe seleccionar un producto.", icon: "error", timer: 2000 });
                return;
            }

            if (e.cost.match(/^[0-9]+$/) === null) {
                swal({ title: "Agregar Producto!", text: "El campo costo debe ser un numero.", icon: "error", timer: 2000 });
                return;
            }

            const result = mutation === 'create' ? await getCompanyProductById(product) : undefined;
            if (result !== undefined) {
                swal({ title: "Agregar Producto!", text: "Este producto ya existe en su empresa!", icon: "error", timer: 2000 });
                return;
            }

            let input = {};
            let messageTitle = '';
            let sucessText = '';
            let errorText = '';
            let mutationResult = false;

            if (mutation === 'create') {
                messageTitle = "Agregar Producto";
                sucessText = "Se ha creado el producto correctamente.";
                errorText = "Ha ocurrido un error al crear el producto.";
                input = { companyProductProductId: product, companyProductComapnyId: company.id, cost: e.cost };
                mutationResult = await createUpdateItem('createCompanyProduct', createCompanyProduct, input);

            } else if (mutation === 'update') {
                messageTitle = "Editar Producto";
                sucessText = "Se ha editado el producto correctamente.";
                errorText = "Ha ocurrido un error al editar el producto.";
                input = { id: companyProductObj.id, cost: e.cost };
                console.log(e.cost !== companyProductObj.product.cost)
                mutationResult = e.cost !== companyProductObj.product.cost ? await createUpdateItem('updateCompanyProduct', updateCompanyProduct, input) : true;
            }

            //console.log(mutationResult)
            if (mutationResult === false) {
                swal({ title: messageTitle, text: errorText, icon: "error", timer: 2000 });
            } else {
                if (mutation === 'create') {
                    setCompanyProduct(mutationResult);
                } else if (mutation === 'update') {
                    editCompanyProduct(mutationResult);
                }
                swal({ title: messageTitle, text: sucessText, icon: "success", timer: 2000 });

            }

            handleShowModal();
        } catch (error) {
            setError(true);
            setErrorMessage('CompanyProducts - xx');
        }

    }, [company, getCompanyProductById, handleShowModal, product, setCompanyProduct, editCompanyProduct, mutation, companyProductObj]);

    const handleDelete = useCallback(async (e) => {
        swal({ title: "Esta seguro que desea eliminar el producto?", icon: "warning", buttons: true, dangerMode: true })
            .then(async (willDelete) => {
                if (willDelete) {
                    let _delete = null;
                    setDlBtnLoading(true);
                    try {
                        _delete = await deleteItem('deleteCompanyProduct', deleteCompanyProduct, e.id);

                    } catch (err) {
                        console.log(err);
                    }

                    if (_delete === false) {
                        swal({ title: "Eliminar Producto", text: "Ha ocurrido un error al eliminar el producto.", icon: "error", timer: 2000 });
                    } else {
                        removeCompanyProduct(_delete)
                        swal({ title: "Eliminar Producto", text: "Se ha eliminado el producto correctamente.", icon: "success", timer: 2000 });
                    }

                } else {
                    swal({ title: "Eliminar Producto", text: "Se ha cancelado la eliminacion del producto.", icon: "error", timer: 2000 });
                }

                setDlBtnLoading(false);
            });
    }, [removeCompanyProduct]);

    //#endregion

    //#region Elements of presentation

    useEffect(() => {
        try {
            if (_companyProducts !== undefined) {
                setCompanyProducts(_companyProducts.map(e => ({
                    producto: e.product.name,
                    costo: e.cost,
                    acciones: [
                        { id: e.id, color: 'blue', icon: 'edit', onClick: () => { handleShowModal(e) }, text: "Editar" },
                        { id: e.id, color: 'red', icon: 'trash', onClick: () => { handleDelete(e) }, loading: dlBtnLoading === e.id, text: "Remover" }
                    ],
                    id: e.id
                })))
            }
        } catch (error) {
            throw new Error('CompanyProducts - xx: ', error)
        }
    }, [_companyProducts, dlBtnLoading, handleDelete, handleShowModal]);

    const productObj = useMemo(() => {
        const obj = products !== undefined ? products.find(_ => _.id === product) : undefined;
        if (obj !== undefined) {
            return products.find(_ => _.id === product);
        } else {
            return { id: '0', name: 'no item selected', cost: '0' }
        }
    }, [products, product]);

    const modalFields = useMemo(() => {
        return [
            { name: 'name', placeholder: 'Nombre de Producto', validationmessage: 'Digita el Nombre de Producto', disabled: true, defaultValue: mutation === 'update' ? companyProductObj.product.name : productObj.name },
            { name: 'cost', placeholder: 'Costo de Producto', validationmessage: 'Digita el Costo de Producto', defaultValue: mutation === 'update' ? companyProductObj.cost : productObj.cost }
        ];
    }, [productObj, mutation, companyProductObj]);

    const tableHeaders = useMemo(() => ['Producto', 'Costo', 'Acciones'], []);
    const tableItems = useMemo(() => companyProducts, [companyProducts]);

    const modalTitles = useMemo(() => mutation === 'create' ? 'Agregar Producto' : 'Editar Producto', [mutation]);

    //#endregion

    return (
        <Container fluid>
            <Row>
                <Col sm={4}>
                    <CustomSelect id="products" dataTestId="select-products" onChange={e => setProduct(e)} items={products} placeHolder="selecciona un nuevo producto para agregar" getItemsNextToken={getItemsNextTokenSelect} />
                </Col>
                <Col sm={2}><CustomButton loading={false} onClick={e => { e.preventDefault(); handleShowModal(null); }} icon="add"></CustomButton></Col>
            </Row>
            <CustomModal title={modalTitles} saveButtonText={'Guardar'} show={showModal} onSubmit={onSubmitModal} handleClose={handleShowModal} fields={modalFields} error={error} errorMessage={errorMessage} />
            <CustomTable
                items={tableItems}
                headers={tableHeaders}
                getItemsNextToken={getItemsNextToken}
                itemsLoading={loading}
            />
        </Container>
    );
}

const mapStateToProps = state => ({
    _companyProducts: state.products.companyProducts,
    products: state.products.products,
    productsNextToken: state.products.nextToken.productsNextToken,
    companyProductsNextToken: state.products.nextToken.companyProductsNextToken,
    company: state.company.company,
})

const mapDispatchToProps = dispatch => ({
    setCompanyProduct: companyProduct => dispatch(setCompanyProduct(companyProduct)),
    removeCompanyProduct: companyProduct => dispatch(removeCompanyProduct(companyProduct)),
    setItemsFromStore: data => dispatch(setItemsFromStore(data)),
    setNextToken: token => dispatch(setNextToken(token)),
    editCompanyProduct: companyProduct => dispatch(editCompanyProduct(companyProduct)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Products)