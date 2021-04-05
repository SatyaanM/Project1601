url = 'https://disease.sh/v3/covid-19/countries?yesterday=true&allowNull=true'

function drawTable(countries) {
    let html = "";
    let result = document.getElementById("result");
    for (let country of countries) {
        Object.keys(country).forEach(function(key) {
            if (country[key] === null) {
                country[key] = '-';
            }
        })
        html += `
        <tr>
            <td class='td_left'><a href='graph.html?country=${country['name']}'>${country['name']}</a></td>
            <td class='td_middle'>${country['totalCases']}</td>
            <td class='td_middle'>${country['totalDeaths']}</td>
            <td class='td_middle'>${country['totalRecovered']}</td>
            <td class='td_middle'>${country.dailyCases}</td>
            <td class='td_right'>${country.dailyDeaths}</td>
        </tr>
        `;

    }
    result.innerHTML = html;
}

function fetchTable(url) {
    let countries = [];
    fetch(url)
        .then((response) => response.json())
        .then((response) => {

            response.forEach(e => {
                let country = {
                    'name': e.country,
                    'totalCases': e.cases,
                    'totalDeaths': e.deaths,
                    'totalRecovered': e.recovered,
                    'dailyCases': e.todayCases,
                    'dailyDeaths': e.todayDeaths,
                    'dailyRecovered': e.todayRecovered,
                }
                countries.push(country);
            });
            return countries;
        })
        .then((countries) => {
            drawTable(countries);
        });
    return countries;
}

function sortBy(key) {
    let sortUrl;
    if (key === 'country') {
        sortUrl = url;
    } else {
        sortUrl = url.slice(0, 55) + '&sort=' + key + url.slice(55);
    }
    fetchTable(sortUrl);
}

function search() {
    let inputField = document.getElementById('country_search');
    let searchTerm = inputField.value.toUpperCase();
    let table = document.getElementById('country_table');
    let tr = table.getElementsByTagName('tr');
    console.log(searchTerm);
    for (let i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue === '') {
                fetchTable(url);
            } else if (txtValue.trim().toUpperCase().includes(searchTerm)) {
                tr[i].style.display = '';
            } else {
                tr[i].style.display = 'none';
            }
        }
    }
}
let temp = fetchTable(url);