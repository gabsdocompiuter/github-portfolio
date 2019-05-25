let user = 'gmonteeeiro';

let qtdRepos;

axios.get(`https://api.github.com/users/${user}`)
     .then(montaProfileInfo)
     .catch((error) => console.warn(error));

axios.get(`https://api.github.com/users/${user}/repos`)
    .then(montaRespositories)
    .catch((error) => console.warn(error));

function montaProfileInfo(response){
    qtdRepos = response.data.public_repos;

    $addProfileImage(response.data.avatar_url);
    
    let name = response.data.name
    name = name == null ? response.data.login : name;

    let bio = response.data.bio;
    bio = bio == null ? '' : bio;

    $addBio(name, bio);
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

    if (qtdRepos % 2 != 0) $addRepository();
}

$(function(){
    $addProfileImage = function(avatarLink){
        let imgElement = document.createElement('img');
        imgElement.setAttribute('src', avatarLink);
        imgElement.setAttribute('id', 'profilePic');

        $('#info').append(imgElement);
        $('#profilePic').addClass('profilePic');
    }

    $addBio = function(name, bio){
        $addParagraph('info', name, 'profileUser');
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