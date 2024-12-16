const button = document.getElementById('menu-button');
const menu = document.getElementById('menu');
const container = document.getElementById("container")

let searchInput = document.getElementById("searchInput")
let icon = document.getElementById("icon")

const items = document.querySelectorAll(".region p");

// toggle bettwen apper and hidden menu buttons
button.addEventListener('click', (event) => {
    event.preventDefault();
    menu.classList.toggle('hidden');
});
// hidden menu buttons if user clicks on any where
document.addEventListener('click', (event) => {
    const isClickInsideMenu = menu.contains(event.target);
    const isClickInsideButton = button.contains(event.target);

    if (!isClickInsideMenu && !isClickInsideButton) {
        menu.classList.add('hidden');
    }
});
// start all country
async function getCuntries() {
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/all`);
        const countries = response.data;
        countries.forEach(country => {
            if (country.name.common === "Israel") {
                return;
            }
            const item = document.createElement('div');
            item.classList.add("item-container")
            item.innerHTML = `
            <div class="item min-h-[355px] rounded-lg bg-Whitee dark:bg-DarkBlueDM  cursor-pointer drop-shadow-[0px_0px_5px_rgba(0,0,0,0.70)]" id="country" data-country="${country.name.common}" onclick="handleCountryClick(this)">
                <div class="lg:h-[200px] md:h-[158px] h-[200px] ">
                    <img src="${country.flags.svg}" class="lg:h-[200px] md:h-[158px] h-[200px] w-full object-cover drop-shadow-[0px_1px_5px_rgba(0,0,0,0.70)] rounded-t-lg" alt="flage of country">
                </div>
                <div class="p-4">
                    <p class="mb-3 text-xl font-bold text-VeryDarkBlueLM dark:text-Whitee"> ${country.name.common}</p>
                    <p class=" text-DarkBlueDM dark:text-Whitee">Population:<span class=" text-DarkGrayLM"> ${country.population.toLocaleString()}</span></p>
                    <p class=" text-DarkBlueDM dark:text-Whitee">Region:<span class=" text-DarkGrayLM"> ${country.region}</span></p>
                    <p class=" text-DarkBlueDM dark:text-Whitee">Capital:<span class=" text-DarkGrayLM"> ${country.capital ? country.capital.join(" , ") : "Unknown"}</span></p>
                </div>
            </div>
            `
            container.appendChild(item) // append to container
        });
    } catch (error) {
        console.error(error);
    }
}
getCuntries()
// end all country
// get name of country to storage it in local storage to send name to fuction getcountry in country.js
function handleCountryClick(element) {
    const countryName = element.getAttribute("data-country");
    localStorage.setItem("selectedCountry", countryName);
    window.location.href = "country.html";
}
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
    if (name === "" || name === "Israel") {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please enter a country name 😁",
        });
        return;
    }
    getCountry(name);
}
async function getCountry(name) {
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
        const countries = response.data;
        container.innerHTML = ""; 
        countries.forEach(country => {
            if (country.name.common === "Israel") {
                return;
            }
            const item = document.createElement('div');
            item.classList.add("item-container");
            item.innerHTML = `
                <div class="item min-h-[355px] rounded-lg bg-Whitee dark:bg-DarkBlueDM  cursor-pointer drop-shadow-[0px_0px_5px_rgba(0,0,0,0.70)]" id="country" data-country="${country.name.common}" onclick="handleCountryClick(this)">
                    <div class="lg:h-[200px] md:h-[158px] h-[200px]  ">
                        <img src="${country.flags.svg}" class="lg:h-[200px] md:h-[158px] h-[200px] w-full object-cover drop-shadow-[0px_1px_5px_rgba(0,0,0,0.70)] rounded-t-lg" alt="flage of country">
                    </div>
                    <div class="p-4">
                        <p class="mb-3 text-xl font-bold text-VeryDarkBlueLM dark:text-Whitee"> ${country.name.common}</p>
                        <p class="text-DarkBlueDM dark:text-Whitee">Population:<span class="text-DarkGrayLM"> ${country.population.toLocaleString()}</span></p>
                        <p class="text-DarkBlueDM dark:text-Whitee">Region:<span class="text-DarkGrayLM"> ${country.region}</span></p>
                        <p class="text-DarkBlueDM dark:text-Whitee">Capital:<span class="text-DarkGrayLM"> ${country.capital ? country.capital.join(" , ") : "Unknown"}</span></p>
                    </div>
                </div>
            `;
            container.appendChild(item);
        });
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Country not found. Please try again.",
        });
    }
}
// end search input

// start filter by region
async function getCountryByRegion(region) {
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/region/${region}`);
        const countries = response.data;
        container.innerHTML = ""; 
        countries.forEach(country => {
            if (country.name.common === "Israel") {
                return;
            }
            const item = document.createElement('div');
            item.classList.add("item-container");
            item.innerHTML = `
            <div class="item min-h-[355px] rounded-lg bg-Whitee dark:bg-DarkBlueDM  cursor-pointer drop-shadow-[0px_0px_5px_rgba(0,0,0,0.70)]" id="country" data-country="${country.name.common}" onclick="handleCountryClick(this)">
                <div class="lg:h-[200px] md:h-[158px] h-[200px] ">
                    <img src="${country.flags.svg}" class="lg:h-[200px] md:h-[158px] h-[200px] w-full object-cover drop-shadow-[0px_1px_5px_rgba(0,0,0,0.70)] rounded-t-lg" alt="flage of country">
                </div>
                <div class="p-4">
                    <p class="mb-3 text-xl font-bold text-VeryDarkBlueLM dark:text-Whitee"> ${country.name.common}</p>
                    <p class="text-DarkBlueDM dark:text-Whitee">Population:<span class="text-DarkGrayLM"> ${country.population.toLocaleString()}</span></p>
                    <p class="text-DarkBlueDM dark:text-Whitee">Region:<span class="text-DarkGrayLM"> ${country.region}</span></p>
                    <p class="text-DarkBlueDM dark:text-Whitee">Capital:<span class="text-DarkGrayLM"> ${country.capital ? country.capital.join(" , ") : "Unknown"}</span></p>
                </div>
            </div>
            `;
            container.appendChild(item);
        });
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "region not found. Please try again 😊",
        });
    }
}
// get the txt item from the menu
items.forEach(item => {
    item.addEventListener('click', (event) => {
        const region = event.target.textContent.trim(); // get the txt item from the menu
        menu.classList.add('hidden');
        getCountryByRegion(region)
    });
});
// end filter by region
// add and remove dark class from html element
const modeToggle = document.getElementById('modeToggle');
const html = document.documentElement;

if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark');
    modeToggle.innerHTML = `<i class="fa-solid fa-moon"></i> Dark Mode`;
} else {
    html.classList.remove('dark');
    modeToggle.innerHTML = `<i class="fa-solid fa-sun"></i> Light Mode`;
}
// toggle mode and storage it in local storage
modeToggle.addEventListener('click', () => {
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        modeToggle.innerHTML = `<i class="fa-solid fa-sun"></i> Light Mode`;
    } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        modeToggle.innerHTML = `<i class="fa-solid fa-moon"></i> Dark Mode`;
    }
});