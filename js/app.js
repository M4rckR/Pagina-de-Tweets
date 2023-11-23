import { DateTime } from 'luxon'

const btnEliminar = document.querySelector('#vaciar-tweets')
const formulario = document.querySelector('#caja-formulario');
const header = document.querySelector('header');
const boxTweets = document.querySelector('#caja-tweets')
let dt = DateTime.now().setZone("America/Lima").setLocale("es");
let tweets = [];
let numero = 0;

document.addEventListener('DOMContentLoaded', ()=> {
    tweets = JSON.parse(localStorage.getItem('tweets')) || []

    agregarTweethtml();

    formulario.addEventListener('click', presionarBtn)
    btnEliminar.addEventListener('click', eliminarTodo)
    boxTweets.addEventListener('click',seleccionTweetParaBorrado)
    
    function seleccionTweetParaBorrado(e){
        if(e.target.classList.contains('eliminar-tweet')){
            const data_id = e.target.getAttribute('data-id')
            eliminarTweet(data_id);
        }
    }

    function eliminarTweet(id){
        tweets = tweets.filter(tweet => tweet.numero != id)
        agregarTweethtml();
    }

    function eliminarTodo(){
        formulario.querySelector('input').value = ''
        tweets = []
        numero = 0
        resetearHtml();
        agregarTweethtml();
    }

    function presionarBtn(e){
        e.preventDefault();
        if(e.target.classList.contains('agregar-tweet')){
            validarInput(formulario.querySelector('input').value);
            formulario.querySelector('input').value = ''
        };
    }

    function validarInput(valor) {
        !valor.trim()?  mandarAlerta() : agregarTweet(valor);
    }

    function agregarTweet(mensaje) {
        numero++;
        const tiempo = dt.toLocaleString(DateTime.DATETIME_MED)
        tweets = [{mensaje,tiempo,numero}, ...tweets]
        agregarTweethtml();
    }

    function agregarTweethtml(){
        resetearHtml();
        tweets.forEach( tweet => {
            const {mensaje, tiempo, numero} = tweet;
            const publicacion = document.createElement('div');
            const titulo = document.createElement('h1')
            const texto = document.createElement('p')
            const fechita = document.createElement('p')
            const boton = document.createElement('button')


            publicacion.className = 'col-span-1 bg-white p-5 rounded relative mb-4 lg:mb-0' 
            titulo.className = 'font-bold'
            boton.className = 'eliminar-tweet absolute top-0 right-0 px-4 py-2 bg-red-700 text-white text-center font-bold rounded-tr';
            fechita.className = 'text-end mt-2 text-gray-500'

            titulo.textContent = `Tweet ${numero}`
            texto.textContent = `${mensaje}`
            fechita.textContent = `${tiempo}`
            boton.textContent = 'x'
            boton.setAttribute('data-id', numero)

            publicacion.appendChild(titulo)
            publicacion.appendChild(texto)
            publicacion.appendChild(fechita)
            publicacion.appendChild(boton)

            boxTweets.appendChild(publicacion)
        })
        sincronizarStorage()
    }

    function sincronizarStorage(){
        localStorage.setItem('tweets', JSON.stringify(tweets))
    }

    function mandarAlerta(){
        const alerta = document.createElement('div');
        const parrafo = document.createElement('p');
        

        alerta.appendChild(parrafo);
        alerta.className = 'container mx-auto px-4 mb-3'
        parrafo.textContent = "No se ha escrito nada!!";
        parrafo.classList.add('p-4','bg-teal-800','text-center','text-white','border', 'border-white')
        header.appendChild(alerta)
    
        setTimeout(() => {
            header.removeChild(alerta)
        }, 3000);
    }

    function resetearHtml(){
        while(boxTweets.firstChild){
            boxTweets.removeChild(boxTweets.firstChild)
        }
    }

})