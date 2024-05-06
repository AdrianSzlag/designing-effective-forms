let clickCount = 0;

const countryInput = document.getElementById('country');
const myForm = document.getElementById('form');
const modal = document.getElementById('form-feedback-modal');
const clicksInfo = document.getElementById('click-count');

function handleClick() {
    clickCount++;
    clicksInfo.innerText = clickCount;
}

async function fetchAndFillCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
            throw new Error('Błąd pobierania danych');
        }
        const data = await response.json();
        const countries = data.map(country => country.name.common).sort((a, b) => a.localeCompare(b));
        countryInput.innerHTML += countries.map(country => `<option value="${country}">${country}</option>`).join('');
    } catch (error) {
        console.error('Wystąpił błąd:', error);
    }
}

function getCountryByIP() {
    fetch('https://get.geojs.io/v1/ip/geo.json')
        .then(response => response.json())
        .then(data => {
            const country = data.country;
            // TODO inject country to form and call getCountryCode(country) function
            const countryInput = document.getElementById('country');
            countryInput.value = country;
            getCountryCode(country);
        })
        .catch(error => {
            console.error('Błąd pobierania danych z serwera GeoJS:', error);
        });
}

function getCountryCode(countryName) {
    const apiUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Błąd pobierania danych');
            }
            return response.json();
        })
        .then(data => {
            const countryCodeInput = document.getElementById('countryCode');
            countryCodeInput.value = data[0].name.common;
        })
        .catch(error => {
            console.error('Wystąpił błąd:', error);
        });
}

countryInput.addEventListener('change', (event) => {
    const countryName = event.target.value;
    getCountryCode(countryName);
});

async function injectCountriesPhoneCodes() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        console.log(data);

        const countries = data.sort((a, b) => {
            return a.name.common.localeCompare(b.name.common);
        }).
            map(country => {
                const countryCode = `${country.idd.root}` + `${country.idd.suffixes?.length === 1
                    ? country.idd.suffixes[0]
                    : ''
                    }`;

                return `<option value="${country.name.common}">${country.name.common} (${countryCode})</option>`;
            });

        const countryCodesInput = document.getElementById('countryCode');
        countryCodesInput.innerHTML += countries.join('');
    } catch (error) {
        console.error('Wystąpił błąd:', error);
    }
}

const name = document.getElementById('firstName');
const surname = document.getElementById('lastName');
const email = document.getElementById('exampleInputEmail1');
const invoiceData = document.getElementById('invoiceData'); // textArea

let isInvoicedDataFilled = false;

// when user clicks onto invoice data for the first time, the form will be filled with the same data as in the personal data
invoiceData.addEventListener('focus', () => {
    if (!isInvoicedDataFilled) {
        invoiceData.value = `Imię: ${name.value}\nNazwisko: ${surname.value}\nEmail: ${email.value}`;
        isInvoicedDataFilled = true;
    }
});


(async () => {
    // nasłuchiwania na zdarzenie kliknięcia myszką
    document.addEventListener('click', handleClick);

    await injectCountriesPhoneCodes();
    fetchAndFillCountries();
    getCountryByIP();
})()



