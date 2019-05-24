    
var url = 'https://api.github.com/users/gmonteeeiro';

axios.get(url)
    .then(function(response)
    {
        console.log(response);
    })
    .catch(function(error)
    {
        console.warn(error);
    })