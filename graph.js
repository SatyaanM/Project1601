let country;
let currentUrl = window.location.search;
let currentCountry = currentUrl.slice(9);

async function drawGraph(graphType) {
    try {
        const countryUrl = `https://disease.sh/v3/covid-19/historical/${currentCountry}?lastdays=30`;
        let response = await fetch(countryUrl);
        let data = await response.json();
        country = {
            'name': data.country,
            'cases': data.timeline.cases,
            'deaths': data.timeline.deaths,
            'recovered': data.timeline.recovered,
        }
    } catch (e) {
        console.log(e);
    } finally {
        switch (graphType) {
            case 'cases':
                caseGraph();
                break;
            case 'deaths':
                deathGraph();
                break;
            case 'recovered':
                recoveredGraph();
                break;
        }
    }
}

function resetGraph() {
    const graph = document.getElementById('graph');
    graph.innerHTML = `<canvas id="myGraph" width="400" height="400"></canvas>`;
}

function caseGraph() {
    resetGraph();
    console.log('hi');
    const ctx = document.getElementById('myGraph').getContext('2d');
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

function deathGraph() {
    resetGraph();
    console.log('hi');
    const ctx = document.getElementById('myGraph').getContext('2d');
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

function recoveredGraph() {
    resetGraph();
    console.log('hi');
    const ctx = document.getElementById('myGraph').getContext('2d');
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
//testing git
drawGraph('cases');