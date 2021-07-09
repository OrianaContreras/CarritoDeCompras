const urlBaseApi = 'http://www.omdbapi.com/?' ;
const apiKey = 'apikey=91fea356';
const urlApi = urlBaseApi + apiKey + '&s=harry potter';
const movie = document.getElementById('movie');
 //const imgUrl = 'http://img.omdbapi.com/?'+apiKey+'&'+ ` ${search} ` ;
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
            <img src="${Poster }" alt="${Title}">
            <div class="">
                <h3>${Title}</h3>
            </div>
            <div>
                <h3>${Year}</h3>
            </div>
        `
        movie.appendChild(movieElement);
    })
}