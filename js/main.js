
let url = 'https://api.github.com/users/gmonteeeiro';

axios.get(url)
    .then(montaPortfolio)
    .catch((error) => console.warn(error));

function montaPortfolio(response){
    
    $addProfileImage(response.data.avatar_url);
    let user = response.data.login;
    let bio = response.data.bio;
    $addBio(user, bio);
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
        $addParagraph('info', user, 'profileUser');
        $addParagraph('info', bio, 'profileBio');
    }

    $addParagraph = function(parent, texto, textClass){
        let parentDiv = `#${parent}`;

        $('<p/>', {
            text: `${texto}`,
            class: textClass
        }).appendTo(parentDiv);
    }
});