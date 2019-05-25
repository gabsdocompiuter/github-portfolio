let user = 'gmonteeeiro';

let qtdRepos;

getProfile();
getRepositories();

async function getProfile(){
    await axios.get(`https://api.github.com/users/${user}`)
            .then(montaProfileInfo)
            .catch((error) => console.warn(error));
}

async function getRepositories(){
    await axios.get(`https://api.github.com/users/${user}/repos`)
        .then(montaRespositories)
        .catch((error) => console.warn(error));
}

function montaProfileInfo(response){
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

        $addRepository(
            item.name,
            item.description,
            item.language,
            item.stargazers_count,
            item.forks_count,
            item.fork
        );
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

    $addRepositoryDiv = function(name){
        let repoDiv = document.createElement('div');
        repoDiv.setAttribute('id', name);

        $('#repos').append(repoDiv);
        $(`#${name}`).addClass('divRepo');
    }

    $addRepositoryHeader = function(name){
        let parentDiv = `#${name}`;

        $('<h3/>', {
            text: `${name}`,
        }).appendTo(parentDiv);
    }


    $addIconText = function(ico, text){
        let iconDiv = document.createElement('div');

        let iconElement = document.createElement('i');
        iconElement.setAttribute('class', `fas fa-${ico}`);

        let textNode = document.createTextNode(` ${text}`);
        
        iconDiv.appendChild(iconElement);
        iconDiv.appendChild(textNode);
        
        return iconDiv;
    }

    $addRepositoryInfo = function(parent, language, stars, forks){
        let infoDiv = document.createElement('div');
        infoDiv.setAttribute('class', 'infoDiv');
        
        infoDiv.appendChild($addIconText('laptop-code', language))
        infoDiv.appendChild($addIconText('star', stars));
        infoDiv.appendChild($addIconText('code-branch', forks));

        $(`#${parent}`).append(infoDiv);
    }

    $addRepository = function(name, description, language, stars, forks, isFork){
        if(isFork) return;

        //Caso a quantidade de repositórios for ímpar, adiciona div vazia
        if(name == null){
            $addRepositoryDiv();
            return;
        }
        
        qtdRepos++;

        $addRepositoryDiv(name);    
        $addRepositoryHeader(name);
        $addParagraph(name, description);
        $addRepositoryInfo(name, language, stars, forks);
    }
});