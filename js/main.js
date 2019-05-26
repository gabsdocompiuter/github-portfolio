let user = 'gmonteeeiro';

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
        $addRepository(
            item.name,
            item.description,
            item.language,
            item.stargazers_count,
            item.forks_count,
            item.fork
        );
    }

    let qtdRepos = response.data.length;
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

    $addRepositoryBackground = function(name){
        let repoDiv = document.createElement('div');
        repoDiv.setAttribute('id', `bg${name}`);

        $('#repos').append(repoDiv);
        $(`#bg${name}`).addClass('divRepo');
    }

    $addRepositoryDiv = function(name){
        let repoDiv = document.createElement('div');
        repoDiv.setAttribute('id', name);

        $(`#bg${name}`).append(repoDiv);
        $(`#${name}`).addClass('teste');
    }

    $addRepositoryHeader = function(name, isFork){
        let parentDiv = `#${name}`;

        
        if(isFork){
            $(`<i class='fas fa-code-branch'></i>`, {
                style: 'display: inline-block'
            }).appendTo(parentDiv);
        }

        let h3Style = 'display: inline-block;';
        h3Style += isFork ? 'margin-left: 6px' : '';
        $('<h3/>', {
            text: `${name}`,
            style: h3Style
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
        //Caso a quantidade de repositórios for ímpar, adiciona div vazia
        if(name == null){
            $addRepositoryBackground();
            return;
        }

        description = description == null ? '' : description;

        $addRepositoryBackground(name);
        $addRepositoryDiv(name);
        $addRepositoryHeader(name, isFork);
        $addParagraph(name, description);
        $addRepositoryInfo(name, language, stars, forks);
    }
});