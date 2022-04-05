import { API, graphqlOperation } from 'aws-amplify';

export const getList = async (queryId, query, parameters) => {
    var list = [];
    const _parameters = parameters === undefined ? {} : parameters;

    try {
        const gresult = await API.graphql(graphqlOperation(query, _parameters));
        list = gresult.data[queryId];
    } catch (e) {
        list = [e];
    }

    return list;
}

export const getItemById = async (queryId, query, parameters) => {
    var list = [];
    const _parameters = parameters === undefined ? {} : parameters;
    try {
        const gresult = await API.graphql(graphqlOperation(query, _parameters));
        list = gresult.data[queryId];
    } catch (e) {
        console.log(e);
        list = false;
    }
    return list;
}

export const createUpdateItem = async (queryId, query, _input) => {
    var createObject = {}
    try {
        const create = await API.graphql(graphqlOperation(query, { input: _input }));
        createObject = create.data[queryId];
    } catch (e) {
        console.log("Error en el metodo 'createUpdateItem' de AppSync: ", e);
        createObject = false;
    }
    return createObject
}

export const deleteItem = async (queryId, query, _id) => {
    var deletedObject = {}
    try {
        const _delete = await API.graphql(graphqlOperation(query, { input: { id: _id } }));
        deletedObject = _delete.data[queryId];
    } catch (e) {
        console.log("Error en el metodo 'deleteItem' de AppSync: ", e);
        deletedObject = false;
    }
    return deletedObject
}