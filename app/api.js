const uri = "http://localhost:3001";

export default async function api(path, method, data){

    let options = {
        method: method,
        credentials: 'include',
        headers:{
            'Content-Type': 'application/json',
        }
        ,
    };

    if(method != 'GET'){
        options.body = JSON.stringify(data)
        //options.headers['Content-Type'] = 'application/json'
    }

    let response = await fetch(`${uri}${path}`, options);
    return response;
}