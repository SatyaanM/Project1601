function fetchCountryGraphs(country) {
    let countryUrl = `https://disease.sh/v3/covid-19/historical/${country}?lastdays=30`;
    fetch(countryUrl)
        .then((response) => response.json())
        .then((response) => {
            drawGraphs(response);
        })
        .catch((error) => {
            alert('Error Displaying Graph for Selected Country.');
            window.location.replace('index.html');
        })

}

function drawGraphs(response) {
    let country = {
        'name': response.country,
        'cases': response.timeline.cases,
        'deaths': response.timeline.deaths,
        'recovered': response.timeline.recovered,
    }
    caseGraph(country);
    deathGraph(country);
    recoveredGraph(country);
}

function caseGraph(country) {
    const ctx = document.getElementById('caseGraph').getContext('2d');
    const caseDates = Object.keys(country.cases);
    const caseCounts = Object.values(country.cases);
    const data = {
        labels: caseDates,
        datasets: [{
            label: `${country.name} cases for the past 30 days`,
            data: caseCounts,
            fill: false,
            borderColor: 'rgb(75, 66, 118)',
            tension: 0.1,
        }]
    }
    let myLineChart = new Chart(ctx, {
        type: 'line',
        data: data,
    })
}

function deathGraph(country) {
    const ctx = document.getElementById('deathGraph').getContext('2d');
    const deathDates = Object.keys(country.deaths);
    const deathCounts = Object.values(country.deaths);
    const data = {
        labels: deathDates,
        datasets: [{
            label: `${country.name} deaths for the past 30 days`,
            data: deathCounts,
            fill: false,
            borderColor: 'rgb(75, 66, 118)',
            tension: 0.1,
        }]
    }
    let myLineChart = new Chart(ctx, {
        type: 'line',
        data: data,
    })
}

function recoveredGraph(country) {
    const ctx = document.getElementById('recoveredGraph').getContext('2d');
    const recoveredDates = Object.keys(country.recovered);
    const recoveredCounts = Object.values(country.recovered);
    const data = {
        labels: recoveredDates,
        datasets: [{
            label: `${country.name} recovered for the past 30 days`,
            data: recoveredCounts,
            fill: false,
            borderColor: 'rgb(75, 66, 118)',
            tension: 0.1,
        }]
    }
    let myLineChart = new Chart(ctx, {
        type: 'line',
        data: data,
    })
}

let currentUrl = window.location.search;
let currentCountry = currentUrl.slice(9);
// console.log(currentCountry);
fetchCountryGraphs(currentCountry);