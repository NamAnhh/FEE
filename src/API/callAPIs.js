import { token } from './token';
import { url } from './url';

export function postData(params, lastString) {
    return fetch(url + lastString, {
        method: 'post',
        body: JSON.stringify(params),
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log('urlPost', url + lastString)
            console.log('API postUser', data)
        })
}