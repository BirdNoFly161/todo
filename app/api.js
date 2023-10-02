const uri = "http://localhost:3001";

export default async function api(path,token=null, method, data){
    
    let options = {
        method: method,
        credentials: 'include',
        headers:{
            'Content-Type': 'application/json',
        }
    };

    if(method != 'GET'){
        options.body = JSON.stringify(data)
        //options.headers['Content-Type'] = 'application/json'
    }

    if(token){
        options.headers.Authorization= `Bearer ${token}`
    }
console.log('made api call with options: ', options)
    let response = await fetch(`${uri}${path}`, options);
    return response;
}