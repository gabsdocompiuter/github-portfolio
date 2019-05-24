
let url = 'https://api.github.com/users/gmonteeeiro';

axios.get(url)
    .then(montaPortfolio)
    .catch((error) => console.warn(error));

function montaPortfolio(response){
    $addProfileImage(response.data.avatar_url);
}

$(function(){
    $addProfileImage = function(avatarLink){
        let imgElement = document.createElement('img');
        imgElement.setAttribute('src', avatarLink);
        imgElement.setAttribute('id', 'profilePic');

        $('#img').append(imgElement);
        $('#profilePic').addClass('profilePic');
    }
});