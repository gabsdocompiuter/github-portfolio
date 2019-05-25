let user = 'gmonteeeiro';

axios.get(`https://api.github.com/users/${user}`)
    .then(montaProfileInfo)
    .catch((error) => console.warn(error));

axios.get(`https://api.github.com/users/${user}/repos`)
    .then(montaRespositories)
    .catch((error) => console.warn(error));

function montaProfileInfo(response){
    $addProfileImage(response.data.avatar_url);
    let user = response.data.login;
    let bio = response.data.bio;
    $addBio(user, bio);
}

function montaRespositories(response){
    for(item of response.data){
        console.log(item.name);
        console.log(item.description);
        console.log(item.language);
        console.log(item.stargazers_count);
        console.log(item.forks_count);
        console.log(item.fork);

        $addRepository();
    }
    console.log(response.data);
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

    $addRepository = function(){
        $('<div/>',{
            class: 'testeRepo'
        }).appendTo('#repos');

        console.log('ok');
    }
});