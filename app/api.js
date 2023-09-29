const uri = "http://localhost:3001";

export default async function api(path, method, data){

    let options = {
        method: method,
        headers:{
            'Content-Type': 'application/json'
        }
        ,
        body: JSON.stringify(data),
    };

    let response = await fetch(`${uri}${path}`, options);
    return response;
}