const urlBaseApi = 'http://www.omdbapi.com/?' ;
const apiKey = 'apikey=91fea356';
const urlApi = urlBaseApi + apiKey + '&s=harry potter';

const movie = document.getElementById('movie');
const formBusqueda = document.getElementById('formBusqueda');
const inputBusqueda = document.getElementById('inputBusqueda');
const urlSearch = 'http://www.omdbapi.com/?'+apiKey+'&s=';
// const tablaProductosSeleccionados = document.getElementById('tablaProductosSeleccionados').content
const fragment = document.createDocumentFragment();

let carrito = [];
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

    data.forEach(function callback(element, index) {
        const {Title, Poster, Year, imdbID} = element; 
        const movieElement = document.createElement('div');
        movieElement.classList.add('element');
        movieElement.innerHTML = `
            <img  class="img" src="${Poster }" alt="${Title}">
            <div id="${imdbID}" class="title">
                <h5 class="id">Id: ${imdbID}</h5>
                <h2 class="titleProducto">${Title}</h2>
            </div>
            <div>
                <h3>${Year}</h3>
            </div>
            <div>
            <button id="${index}" class="btnAgregarAlCarrito" >
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

movie.addEventListener('click', element =>{
    addCarrito(element)
})

    const addCarrito = element =>{
        if (element.target.classList.contains('btnAgregarAlCarrito')){
            setCarrito(element.target.parentElement.parentElement)
        }
    }

    const setCarrito = element =>{
        const productoSaleccionado = {
            title:element.querySelector('.titleProducto').innerText,
            index:parseInt(element.querySelector('.btnAgregarAlCarrito').id),
            img:element.querySelector('.img').src,
            cantidad:1,
        }
        if(carrito.hasOwnProperty(productoSaleccionado.index)){
            productoSaleccionado.cantidad = carrito[productoSaleccionado.index].cantidad + 1
        }
        carrito[productoSaleccionado.index] = {...productoSaleccionado}
        console.log(carrito[productoSaleccionado.index])
        // mostrarCarrito()
    }
    
    // const mostrarCarrito = () => {
    //     innerHTML ='';
    //     Object.values(carrito).forEach(productoSaleccionado => {
    //         tablaProductosSeleccionados.querySelector('th').textContent = productoSaleccionado.id;
    //         tablaProductosSeleccionados.querySelector('td').textContent = productoSaleccionado.title;
    //         tablaProductosSeleccionados.querySelector('th').textContent = productoSaleccionado.cantidad;

    //         const clone = tablaProductosSeleccionados.cloneNode(true);
    //         fragment.appendChild(clone);

    //         if(Object.keys(carrito).length == 0){
    //             footer.innerHTML=`
    //             <th scope="row" colspan="5">Carrito vacío con innerHTML</th>
    //             `
    //             return
                
    //         }


    //     })
    // }

