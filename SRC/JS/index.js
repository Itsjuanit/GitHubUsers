let nameEl = document.querySelector(".js-name");
let locationEl = document.querySelector(".js-location");
let publicreposEl = document.querySelector(".js-publicrepos");
let followersEl = document.querySelector(".js-followers");
let input = document.querySelector(".input-user");
let usernameLink = document.querySelector(".user-name");
let searchButton = document.querySelector(".button-js");
let fotoPerfil = document.querySelector(".js-pic-box");
let infoBox = document.querySelector(".info-box");
let mensajeError = document.querySelector(".error");

//Hace que sólo se ejecute al clickear el botón
searchButton.addEventListener("click", getData);

async function getData() {
    try {
        let info = {};
        let username = input.value;

        //chequear si ingresaste algo
        if (username.length === 0) {
            console.log("El usuario no buscó ningún valor");
            return;
        } else {
            const response = await fetch(`https://api.github.com/users/${username}`);
            const json = await response.json();
            console.log(json);
            info = json;
            input.value = null;
        }
        if (info.login == undefined) {
            //si el usuario no existe:
            console.log("El usuario no existe");
            return seguiParticipando();
        } else {
            //si el usuario existe agregar la informacion especifica a la seccion del html correspondiente
            funciono();
            nameEl.innerHTML = info.name;
            usernameLink.innerHTML = info.login;
            usernameLink.href = `https://github.com/${username}`;
            locationEl.innerHTML = info.location;
            publicreposEl.innerHTML = info.public_repos;
            followersEl.innerHTML = info.followers;
            fotoPerfil.style.backgroundImage = `url("` + info.avatar_url + `")`;
            //si fuera fotoPerfil.src = info.avatar_url;
            showPicture();
        }
    } catch (error) {
        console.log("Ocurrió un error");
        console.log(error);
    }
}

function showPicture() {
    fotoPerfil.style.visibility = "visible";
}

function seguiParticipando() {
    infoBox.style.visibility = "hidden";
    mensajeError.style.display = "inline";
    fotoPerfil.style.visibility = "hidden";
}

function funciono() {
    infoBox.style.visibility = "visible";
    mensajeError.style.display = "none";
    infoBox.style.height = "330px";
}

input.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        getData();
    }
});