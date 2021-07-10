const urlBaseApi = 'http://www.omdbapi.com/?' ;
const apiKey = 'apikey=91fea356';
const urlApi = urlBaseApi + apiKey + '&s=harry potter';

const movie = document.getElementById('movie');
const formBusqueda = document.getElementById('formBusqueda');
const inputBusqueda = document.getElementById('inputBusqueda');
const urlSearch = 'http://www.omdbapi.com/?'+apiKey+'&s=';
getElements(urlApi);

function getElements(url){

    fetch(url).then(response => response.json()).then(data => {
        console.log(data);
        showElements(data.Search);
    })
    .catch(error => console.log(error))
}

function showElements(data){

    movie.innerHTML='';

    data.forEach(element => {
        const {Title, Poster, Year,} = element; 
        const movieElement = document.createElement('div');
        movieElement.classList.add('element');
        movieElement.innerHTML = `
            <img  src="${Poster }" alt="${Title}">
            <div class="title">
                <h3>${Title}</h3>
            </div>
            <div>
                <h3>${Year}</h3>
            </div>
            <div>
            <button class="btnAgregarAlCarrito" >
            Agregar
            </button>
            </div>
        `
        movie.appendChild(movieElement);
    })
}

formBusqueda.addEventListener('submit', (element) => {
    element.preventDefault();
    const buscarTermino = inputBusqueda.value;

    if(buscarTermino){
        getElements(urlSearch + buscarTermino)
    }
})

