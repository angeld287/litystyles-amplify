import { API } from 'aws-amplify';

export const findCognitoUser = async (apiOptions) => {
    let result = false;
    try {
        result = await API.post('apiForLambda', '/findUser', apiOptions);
    } catch (e) {
        console.log(e)
        result = false;
    }
    return result;
}