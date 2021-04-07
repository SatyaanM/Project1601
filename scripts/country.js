let currentUrl = window.location.search;
let currentCountry = currentUrl.slice(9);

let urlConfirmed = "https://api.covid19api.com/total/country/" + currentCountry + "/status/confirmed";
let urlDeaths = "https://api.covid19api.com/total/country/" + currentCountry + "/status/deaths";
let urlRecovered = "https://api.covid19api.com/total/country/" + currentCountry + "/status/recovered";

let cases = [];
let deaths = [];
let recovered = [];
let dates = [];
let countryName;
async function fetchData() {
    try {

        let responseConfirmed = await fetch(urlConfirmed);

        let responseRecovered = await fetch(urlRecovered);

        let responseDeaths = await fetch(urlDeaths);

        let dataConfirmed = await responseConfirmed.json();
        let dataDeaths = await responseDeaths.json();
        let dataRecovered = await responseRecovered.json();
        countryName = dataConfirmed[0].Country;

        dataConfirmed.forEach(e => {
            cases.push(e.Cases);
            dates.push(e.Date.slice(0, 10));
        })
        dataDeaths.forEach(e => {
            deaths.push(e.Cases);
        })
        dataRecovered.forEach(e => {
            recovered.push(e.Cases);
        })
    } catch (error) {
        console.log(error);
        alert('Error Loading Page.');
        window.location.replace('index.html');
    } finally {
        totalGraph();
        drawTable();

        setPageTitle();
    }
}

function setPageTitle() {
    const ctx = document.getElementById('country-title');
    const length = cases.length - 1;
    let title = `${countryName}: Cases: ${ cases[length]}  Deaths: ${deaths[length]}  Recovered: ${recovered[length]}`;
    ctx.innerText = title;
}

function totalGraph() {
    const ctx = document.getElementById('myGraph').getContext('2d');
    const data = {
        labels: dates,
        datasets: [{
                label: `${countryName} cases`,
                data: cases,
                fill: false,
                borderColor: 'rgba(0, 200, 0, 0.5)',
                tension: 1,
            },
            {
                label: `${countryName} deaths`,
                data: deaths,
                fill: false,
                borderColor: 'rgba(200, 0, 0, 0.5)',
                tension: 0.1,
            },
            {
                label: `${countryName} recovered`,
                data: recovered,
                fill: false,
                borderColor: 'rgba(0, 0,200, 0.5)',
                tension: 0.1,
            },
        ]
    }
    let myLineChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: { responsive: false },
    })
}


function drawTable() {
    let html = ``;
    let result = document.getElementById("result");
    for (let x = 0; x < cases.length; x++) {
        if ((cases[x] + deaths[x] + recovered[x]) == 0) {
            continue;
        }
        html += `
      <tr>
        <td class='td_left'>${cases[x]}</td>
        <td class='td_middle'>${deaths[x]}</td>
        <td class='td_middle'>${recovered[x]}</td>
        <td class='td_right'>${dates[x]}</td>
      </tr>
      `
    }
    console.log("hello");
    result.innerHTML = html;
}
fetchData();
// sorttable.innerSortFunction.apply(document.getElementById('th-newdeaths'), []);