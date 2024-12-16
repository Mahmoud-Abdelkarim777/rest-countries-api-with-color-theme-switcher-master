let container = document.getElementById('container');
// Called to support other functions, such as displaying the names of neighboring countries in a function getCountry
async function fetchCountries() {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    countries = response.data;
}
fetchCountries();
async function getCountry(name) {
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
        const country = response.data[0];
        container.innerHTML = ""; 
        const currencies = Object.values(country.currencies)
            .map(currency => currency.name)
            .join(" , ");
        const languages = Object.values(country.languages).join(", ");
        const borders = country.borders 
            ? country.borders
                .map(border => {
                    const borderName = countries.find(c => c.cca3 === border)?.name.common || "Unknown";
                    if (borderName === "Israel") return null;
                    return `<button onclick="getCountry('${borderName}')" class="w-[100px] px-1 py-1 ms-2 mb-2 drop-shadow-[0px_0px_5px_rgba(0,0,0,0.70)] rounded-md text-sm md:text-base text-DarkGrayLM bg-Whitee dark:bg-DarkBlueDM">${borderName}</button>`;
                })
                .filter(Boolean) // لإزالة العناصر التي تحتوي على null
                .join(" ")
            : "No borders";
        container.innerHTML = `
            <div class="drop-shadow-[0px_0px_5px_rgba(0,0,0,0.70)]">
                <img src="${country.flags.svg}" class="rounded-sm" alt="${country.flags.alt}">
            </div>
            <div class="info ">
                <div>
                    <p class="text-4xl  dark:text-Whitee font-bold mb-8">${country.name.common}</p>
                </div>
                <div class="flex flex-col md:flex-row gap-8">
                    <div>
                        <p class="mb-3 text-DarkBlueDM dark:text-Whitee font-medium">Native Name: <span class="text-DarkGrayLM font-medium">${Object.values(country.name.nativeName)[0]?.common || "N/A"}</span></p>
                        <p class="mb-3 text-DarkBlueDM dark:text-Whitee font-medium">Population: <span class="text-DarkGrayLM font-medium">${country.population.toLocaleString()}</span></p>
                        <p class="mb-3 text-DarkBlueDM dark:text-Whitee font-medium">Region: <span class="text-DarkGrayLM font-medium">${country.region}</span></p>
                        <p class="mb-3 text-DarkBlueDM dark:text-Whitee font-medium">Sub Region: <span class="text-DarkGrayLM font-medium">${country.subregion || "N/A"}</span></p>
                        <p class="mb-3 text-DarkBlueDM dark:text-Whitee font-medium">Capital: <span class="text-DarkGrayLM font-medium">${country.capital?.join(" , ") || "N/A"}</span></p>
                    </div>
                    <div>
                        <p class="mb-3 text-DarkBlueDM dark:text-Whitee font-medium">Top Level Domain: <span class="text-DarkGrayLM font-medium">${country.tld ? country.tld.join(" , ") : "N/A"}</span></p>
                        <p class="mb-3 text-DarkBlueDM dark:text-Whitee font-medium">Currencies: <span class="text-DarkGrayLM font-medium">${currencies}</span></p>
                        <p class="mb-3 text-DarkBlueDM dark:text-Whitee font-medium">Languages: <span class="text-DarkGrayLM font-medium">${languages}</span></p>
                    </div>
                </div>
                <div class="flex flex-col md:flex-row gap-8 md:gap-4 mt-16">
                    <div class="">
                        <p class="w-[130px] text-DarkBlueDM dark:text-Whitee font-medium">Border Countries: </p>
                    </div>
                    <div id="BorderCountries" class="">
                        ${borders}
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Country not found. Please try again.",
        });
    }
}
// get the name of the country from the local srorage to send it to function getCountry
document.addEventListener("DOMContentLoaded", () => {
    const countryName = localStorage.getItem("selectedCountry");
    if (countryName) {
        getCountry(countryName);
    }
});
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

