
let url = 'https://api.github.com/users/gmonteeeiro';

axios.get(url)
    .then(montaPortfolio)
    .catch((error) => console.warn(error));

function montaPortfolio(response){
    
    $addProfileImage(response.data.avatar_url);
    let user = response.data.user;
    let nome = response.data.nome;
    let bio = response.data.bio;
    $addBio(user, nome, bio);
}

$(function(){
    $addProfileImage = function(avatarLink){
        let imgElement = document.createElement('img');
        imgElement.setAttribute('src', avatarLink);
        imgElement.setAttribute('id', 'profilePic');

        $('#info').append(imgElement);
        $('#profilePic').addClass('profilePic');
    }

    $addBio = function(user, nome, bio){
        let prgElement = document.createElement('p');
        let prgText = document.createTextNode('teste');
        prgElement.appendChild(prgText);

        $('#info').append(prgElement);
    }
});