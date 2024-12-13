const button = document.getElementById('menu-button');
const menu = document.getElementById('absolute');
const container = document.getElementById("container")

let searchInput = document.getElementById("searchInput")
let icon = document.getElementById("icon")

const items = document.querySelectorAll(".region p");

button.addEventListener('click', (event) => {
    event.preventDefault();
    menu.classList.toggle('hidden');
});

// start all country
async function getCuntries() {
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/all`);
        console.log(response);
        const countries = response.data;
        countries.forEach(country => {
            if (country.name.common === "Israel") {
                return;
            }
            
            const item = document.createElement('div');
            item.classList.add("item-container")
            item.innerHTML = `
            <div class="item bg-DarkBlueDM pb-8 cursor-pointer" id="country">
                <div class="lg:h-[200px] md:h-[158px] h-[200px] lg:w-[300px]">
                    <img src="${country.flags.svg}" class="lg:h-[200px] md:h-[158px] h-[200px] w-full object-cover" alt="flage of country">
                </div>
                <div class="p-4">
                    <p class="mb-3 text-xl font-bold text-white"> ${country.name.common}</p>
                    <p class="text-white">Population:<span class="text-DarkGrayLM"> ${country.population}</span></p>
                    <p class="text-white">Region:<span class="text-DarkGrayLM"> ${country.region}</span></p>
                    <p class="text-white">Capital:<span class="text-DarkGrayLM"> ${country.capital}</span></p>
                </div>
            </div>
            `
            container.appendChild(item)
        });
    } catch (error) {
        console.error(error);
    }
}
getCuntries()
// end all country

// start search input
icon.addEventListener('click', () => {
    performSearch();
});

searchInput.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        performSearch();
    }
});

function performSearch() {
    let name = searchInput.value.trim();
    if (name === "") {
        alert("Please enter a country name.");
        return;
    }
    getCountry(name);
}

async function getCountry(name) {
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
        const countries = response.data;
        console.log(countries);

        container.innerHTML = ""; 
        
        countries.forEach(country => {
            const item = document.createElement('div');
            item.classList.add("item-container");
            item.innerHTML = `
                <div class="item bg-DarkBlueDM pb-8 cursor-pointer" id="country">
                <div class="lg:h-[200px] md:h-[158px] h-[200px] lg:w-[300px]">
                    <img src="${country.flags.svg}" class="lg:h-[200px] md:h-[158px] h-[200px] w-full object-cover" alt="flage of country">
                </div>
                <div class="p-4">
                    <p class="mb-3 text-xl font-bold text-white"> ${country.name.common}</p>
                    <p class="text-white">Population:<span class="text-DarkGrayLM"> ${country.population}</span></p>
                    <p class="text-white">Region:<span class="text-DarkGrayLM"> ${country.region}</span></p>
                    <p class="text-white">Capital:<span class="text-DarkGrayLM"> ${country.capital}</span></p>
                </div>
            </div>
            `;
            container.appendChild(item);
        });
    } catch (error) {
        console.error(error);
        alert("Country not found. Please try again.");
    }
}
// end search input

// start filter by region
async function getCountryByRegion(region) {
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/region/${region}`);
        const countries = response.data;
        console.log(countries);

        container.innerHTML = ""; 
        
        countries.forEach(country => {
            const item = document.createElement('div');
            item.classList.add("item-container");
            item.innerHTML = `
            <div class="item bg-DarkBlueDM pb-8 cursor-pointer" id="country">
                <div class="lg:h-[200px] md:h-[158px] h-[200px] lg:w-[300px]">
                    <img src="${country.flags.svg}" class="lg:h-[200px] md:h-[158px] h-[200px] w-full object-cover" alt="flage of country">
                </div>
                <div class="p-4">
                    <p class="mb-3 text-xl font-bold text-white"> ${country.name.common}</p>
                    <p class="text-white">Population:<span class="text-DarkGrayLM"> ${country.population}</span></p>
                    <p class="text-white">Region:<span class="text-DarkGrayLM"> ${country.region}</span></p>
                    <p class="text-white">Capital:<span class="text-DarkGrayLM"> ${country.capital}</span></p>
                </div>
            </div>
            `;
            container.appendChild(item);
        });
    } catch (error) {
        console.error(error);
        alert("region not found. Please try again.");
    }
}

items.forEach(item => {
    item.addEventListener('click', (event) => {
        const region = event.target.textContent.trim(); // احصل على النص الداخلي للعنصر
        getCountryByRegion(region)
    });
});

// end filter by region

// start details for selected

document.addEventListener('DOMContentLoaded', () => {
    let country = document.getElementById('country');
    country.addEventListener('click', (event) => {
        event.preventDefault
        window.location = ""
    });
});

// end details for selected
