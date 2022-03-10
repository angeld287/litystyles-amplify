import { API } from 'aws-amplify';

export const findCognitoUser = async (apiOptions) => {
    let result = false;
    try {
        result = await API.post('apiForLambda', '/findUser', apiOptions);
    } catch (e) {
        result = false;
    }
    return result;
}