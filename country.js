let container = document.getElementById('container');

async function getCountry(name) {
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
        const countries = response.data[0];
        console.log(countries);

        container.innerHTML = ""; 
        
        container.innerHTML = `
                    <div class="">
                        <img src="" alt="flage">
                    </div>
                    <div class="info">
                        <div>
                            <p class="text-4xl text-white font-bold mb-8">${countries.name.common}</p>
                        </div>
                        <div class="flex flex-col md:flex-row">
                            <div>
                                <p class="text-white font-medium">Native Name: <span class="text-DarkGrayLM font-medium">Blegie</span></p>
                                <p class="text-white font-medium">Population: <span class="text-DarkGrayLM font-medium">11.111.111</span></p>
                                <p class="text-white font-medium">Rigion: <span class="text-DarkGrayLM font-medium">Europe</span></p>
                                <p class="text-white font-medium">Sub Region: <span class="text-DarkGrayLM font-medium">Western Europe</span></p>
                                <p class="text-white font-medium">Capital: <span class="text-DarkGrayLM font-medium">Brussles</span></p>
                            </div>
                            <div>
                                <p class="text-white font-medium">Top Level Domain: <span class="text-DarkGrayLM font-medium">be</span></p>
                                <p class="text-white font-medium">Currencies: <span class="text-DarkGrayLM font-medium">Euro</span></p>
                                <p class="text-white font-medium">Language: <span class="text-DarkGrayLM font-medium">Dutch, Franch, German</span></p>
                            </div>
                        </div>
                        <div class="flex  flex-col md:flex-row gap-8 md:gap-4">
                            <div>
                                <P class="text-white font-medium">Border Countries:</P>
                            </div>
                            <div id="BorderCountries">
                                <button class="px-4 py-1 drop-shadow-[0px_0px_5px_rgba(0,0,0,0.70)] rounded-md text-DarkGrayLM bg-DarkBlueDM">France</button>
                                <button class="px-4 py-1 drop-shadow-[0px_0px_5px_rgba(0,0,0,0.70)] rounded-md text-DarkGrayLM bg-DarkBlueDM">Germany</button>
                                <button class="px-4 py-1 drop-shadow-[0px_0px_5px_rgba(0,0,0,0.70)] rounded-md text-DarkGrayLM bg-DarkBlueDM">Netherlands</button>
                            </div>
                        </div>
                    </div>
            `;
    } catch (error) {
        console.error(error);
        alert("Country not found. Please try again.");
    }
}
getCountry("Egypt")