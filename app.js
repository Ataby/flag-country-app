
let allCountries =[];

const countryList = function(){

     const urlAll = `https://restcountries.com/v3.1/all
     `;
     fetch(urlAll)
     .then((res)=>{
         if(!res.ok){
             renderError(`Something went wrong: ${res.status}`);
             throw new Error();
            }
            else{
                return res.json(); //RETURN OLMAZSA UNDEFINED CEVIRIR.
            }
            
        }     
        )
        .then((data)=>{
            //A-Z =>[...data].sort((a,b)=> (a < b ? -1 : 1)),
            //Z-A =>[...data].sort((a,b)=> (a < b ? 1 : -1)),
            //1-100 =>[...data].sort((a,b) => a.releaseYear - b.releaseYear),
            //100-1 =>[...data].sort((a, b) => b.releaseYear - a.releaseYear),
            data.sort((a, b) => (a.name.common < b.name.common ? -1 : 1));
            
            allCountries=data;
            const selectDiv = document.querySelector(".selectDiv");

            data.forEach((country)=>{
                const name = Object.values(country)[0].common;
                // const dropUL = document.querySelector(".dropdown-menu");
                // const createLi=document.createElement("li");

                selectDiv.innerHTML+= `
                <option value="${name}">${name}</option>
                `;                

            })
            selectDiv.addEventListener("change", (e) => {
                renderCountries(e.target.value);})
        })
        
    }
    
countryList();

const emptyDiv = document.querySelector(".cardDiv");
const renderError =function(){
    emptyDiv.innerHTML += `
    <h2>Country can not be fetched</h2>
    `;
}

const renderCountries = function(data){
    
    let country = allCountries.filter((item) => {
        if(item.name.common == data){
            return item.name.common
        }}) 
        
        const {name:{common},
        capital,flags:{svg},
        languages,currencies,region}=country[0];
            
    emptyDiv.innerHTML= `
    <div class="row col-md-6 col-lg-4 col-xl-3 g-4 mx-auto mt-2">
    <div class="card shadow-lg pt-2">
        <img src="${svg}" class="card-img-top border border-2px" alt="...">
        <div class="card-body">
        <h5 class="card-title">${common}</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item"> <i class="fa-solid fa-landmark"></i> ${capital}, ${region.toUpperCase()}</li>

            <li class="list-group-item"><i class="fa-solid fa-language"></i> ${Object.values(languages)}</li>
            
            <li class="list-group-item">
            <i class="fa-solid fa-money-bill-1-wave"></i> ${Object.values(Object.values(currencies)[0])}</li>
            
           
        </ul>
        
        </div>
    <div>
    `
}

