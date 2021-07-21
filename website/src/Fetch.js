//fetch interface for server requrests 
class Fetch
{
    //GET request to server.    
    static get(url)
    {
        const requestOptions =
        {
            method: 'GET',
            credentials: 'include',
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        return fetch(url, requestOptions)
            .then(response => response.json());
    }

    //POST request to server. param data as obejct
    static post(url, data)
    {
        let dataAsJson = data.stringify();
        const requestOptions =
        {
            method: 'POST',
            credentials: 'include',
            body: dataAsJson,
            headers:
            {
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/plain, text/html',
                mode: 'no-cors'
            }
        };
        
        return fetch(url, requestOptions)
            .then(response => response.json());
    }
}