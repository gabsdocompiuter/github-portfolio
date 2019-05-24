
let url = 'https://api.github.com/users/gmonteeeiro';

axios.get(url)
    .then(montaPortfolio)
    .catch((error) => console.warn(error));

function montaPortfolio(response){
    let user = response.data.login;
    let name = response.data.name;
    let avatar = response.data.avatar_url;
    console.log(avatar);

    let myDiv = document.getElementById('img');

    let imgElement = document.createElement('img');
    imgElement.setAttribute('src', avatar);

    myDiv.appendChild(imgElement);


}