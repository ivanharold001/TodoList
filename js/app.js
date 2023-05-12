// Variables
const formulario = document.querySelector('#formulario');
const txtTweet = document.querySelector('#tweet');
const listaTweets = document.querySelector('#lista-tweets');
let tweetArray = [];
// Eventos
document.addEventListener('DOMContentLoaded', () => {
    
    tweetArray = JSON.parse(localStorage.getItem('twees')) || [];
    mostrarTwees();

    formulario.addEventListener('submit', agregarTweets);
});

function agregarTweets(e) {
    e.preventDefault();
    if (txtTweet.value.trim() === '') {
        mostrarAlerta();
        return;
    }

    tweetArray = [...tweetArray, txtTweet.value];
    mostrarTwees();
    txtTweet.value = '';
}

function mostrarTwees() {
    limpiarHTML();
    tweetArray.forEach( tweets => {
        const listTweet = document.createElement('UL');
        const btnEliminar = document.createElement('A');
        btnEliminar.classList.add('borrar-tweet');
        btnEliminar.innerText = "X";

        btnEliminar.onclick = () => {
            borrarTwee(tweets);
        }

        listTweet.innerHTML = `<li>${tweets}</li>`;
        listaTweets.appendChild(btnEliminar);
        listaTweets.appendChild(listTweet);
    });

    localStorage.setItem("twees", JSON.stringify(tweetArray));
}

function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

function mostrarAlerta() {
    const container = document.querySelector('.container');
    const alerta = document.createElement('P');
    alerta.textContent = 'Un mensaje no puede ir vacio'.toUpperCase();
    alerta.classList.add('error');
    
    if (container.childNodes.length < 6) {
        container.appendChild(alerta);
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

function borrarTwee(id) {
    tweetArray = tweetArray.filter( tweets => tweets !== id);
    mostrarTwees();
}