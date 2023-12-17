
const fetchCountryName = function(name){
    
    const url = `https://restcountries.com/v3.1/name/${name}`;
    fetch(url)
    .then((res)=>{
        if(!res.ok){
            renderError(`Something went wrong: ${res.status}`);
            throw new Error();
        }
        else{
           return res.json(); //RETURN OLMAZSA UNDEFINED CEVIRIR.
        }
    })
    .then((data)=>{
        renderCountries(data);
    })
}

const renderError =function(){
    const countryDiv = document.querySelector(".countries");
    countryDiv.innerHTML += `
    <h2>Country can not be fetched</h2>
    `;
}

const renderCountries = function(data){
    const countryDiv = document.querySelector(".countries");
    const {name:{common},
            capital,
            flags:{svg},
            languages,
            currencies,
            region
        }=data[0];

    // console.log(Object.values(Object.values(currencies)[0]));

    countryDiv.innerHTML+= `
    <div class="row col-md-6 col-lg-4 col-xl-3 g-4 ">
        <div class="card shadow-lg pt-2">
            <img src="${svg}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${common}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item"> <i class="fa-solid fa-landmark"></i>${capital}</li>

                <li class="list-group-item"><i class="fa-solid fa-language"></i> ${Object.values(languages)}</li>

                <li class="list-group-item">
                <i class="fa-solid fa-money-bill-1-wave"></i>${Object.values(Object.values(currencies)[0])}</li>
            </ul>
        
        </div>
    <div>
    `;

    // console.log(data);
}

fetchCountryName("turkey");
fetchCountryName("usa");
fetchCountryName("germany");