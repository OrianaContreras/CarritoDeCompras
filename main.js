const urlBaseApi = 'http://www.omdbapi.com/?' ;
const apiKey = 'apikey=91fea356';
const urlApi = urlBaseApi + apiKey + '&s=harry potter';

const movie = document.getElementById('movie');
const formBusqueda = document.getElementById('formBusqueda');
const inputBusqueda = document.getElementById('inputBusqueda');
const urlSearch = 'http://www.omdbapi.com/?'+apiKey+'&s=';
const templateCarrito = document.getElementById('template-carrito').content
const templateFooter = document.getElementById('template-footer').content
const fragment = document.createDocumentFragment();
const items = document.getElementById('items')

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
        const productoSeleccionado = {
            title:element.querySelector('.titleProducto').innerText,
            index:parseInt(element.querySelector('.btnAgregarAlCarrito').id),
            img:element.querySelector('.img').src,
            cantidad:1,
        }
        if(carrito.hasOwnProperty(productoSeleccionado.index)){
            productoSeleccionado.cantidad = carrito[productoSeleccionado.index].cantidad + 1
        }
        carrito[productoSeleccionado.index] = {...productoSeleccionado}
        console.log(carrito)
        mostrarCarrito()
    }
    
    const mostrarCarrito = () => {
        
        items.innerHTML ='';
        Object.values(carrito).forEach(productoSeleccionado => {
        templateCarrito.querySelector('th').textContent = productoSeleccionado.index;
        templateCarrito.querySelectorAll('td')[0].textContent = productoSeleccionado.title;
        templateCarrito.querySelectorAll('td')[1].textContent = productoSeleccionado.cantidad;
        templateCarrito.querySelector('.btn-info').dataset.index = productoSeleccionado.index;
        templateCarrito.querySelector('.btn-danger').dataset.index = productoSeleccionado.index;
        console.log(templateCarrito.querySelector('.btn-info').dataset.index = productoSeleccionado.index)


            const clone = templateCarrito.cloneNode(true);
            fragment.appendChild(clone);
        })

        items.appendChild(fragment)

        footerTabla()
    }
        const footerTabla = () =>{
            footer.innerHTML = '';
            if(Object.keys(carrito).length === 0){
                footer.innerHTML=`
                <th scope="row" colspan="5">Carrito vacío</th>
                `
            return 
            }
            const cantidadDeProductosAgregados = Object.values(carrito).reduce((acc,{cantidad}) => acc + cantidad,0)
            templateFooter.querySelectorAll('td')[0].textContent = cantidadDeProductosAgregados
            const clone = templateFooter.cloneNode(true) 
            fragment.appendChild(clone)
            footer.appendChild(fragment)

            const btnVaciarCarrito = document.getElementById('vaciar-carrito')
            btnVaciarCarrito.addEventListener('click',() => {
                carrito = {}
            mostrarCarrito()

            })   
        }
    
    items.addEventListener('click', element => { btnAumentarDisminuir(element) })

    let btnAumentarDisminuir = element => {
       
        if(element.target.className == 'btn-info'){
            console.log('estoy dentro del if')
        let producto = carrito[element.target.dataset.index]
        producto.cantidad = producto.cantidad + 1
        console.log(producto)
        carrito[element.target.dataset.index] = {...producto}
        mostrarCarrito()
        }

        if (element.target.className == 'btn-danger'){
            
            let producto = carrito[element.target.dataset.index]
            producto.cantidad = producto.cantidad - 1
            if (producto.cantidad === 0) {
                delete carrito[element.target.dataset.index]
            } else {
                carrito[element.target.dataset.index] = {...producto}
            }
            mostrarCarrito()
        }

    }

    