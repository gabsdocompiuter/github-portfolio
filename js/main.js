
let url = 'https://api.github.com/users/gmonteeeiro';

axios.get(url)
    .then(montaPortfolio)
    .catch((error) => console.warn(error));

function montaPortfolio(response){
    
    $addProfileImage(response.data.avatar_url);
    let user = response.data.login;
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

    $addBio = function(user, bio){
        $('#info').append($addParagraph(user));
        $('#info').append($addParagraph(bio));
    }

    $addParagraph = function(text){
        let element = document.createElement('p');
        let elementText = document.createTextNode(text);
        element.appendChild(elementText);

        return element;
    }
});