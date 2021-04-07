let country;
let currentUrl = window.location.search;
let currentCountry = currentUrl.slice(9);
let countryUrl = `https://disease.sh/v3/covid-19/historical/${currentCountry}?lastdays=30`;

function getDailyData() {
    let cases = Object.values(country.cases);
    let deaths = Object.values(country.deaths);
    let recovered = Object.values(country.recovered);
    let dates = Object.keys(country.cases);
    let dailyCases = {};
    let dailyDeaths = {};
    let dailyRecovered = {};
    for (let x = 0; x < cases.length - 1; x++) {
        dailyCases[dates[x + 1]] = (cases[x + 1] - cases[x]);
        dailyDeaths[dates[x + 1]] = (deaths[x + 1] - deaths[x]);
        dailyRecovered[dates[x + 1]] = (recovered[x + 1] - recovered[x]);
    }
    country.dailyCases = dailyCases;
    country.dailyDeaths = dailyDeaths;
    country.dailyRecovered = dailyRecovered;
}

async function drawGraph(graphType) {
    try {
        let response = await fetch(countryUrl);
        let data = await response.json();
        country = {
            'name': data.country,
            'cases': data.timeline.cases,
            'deaths': data.timeline.deaths,
            'recovered': data.timeline.recovered,
        }
        getDailyData();

    } catch (error) {
        console.log(error);
        // window.location.replace('index.html');
        alert(`Error Displaying Graphs for: ${currentCountry}`);
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
            case 'dailyCases':
                dailyCasesGraph();
                break;
            case 'dailyDeaths':
                dailyDeathsGraph();
                break;
            case 'dailyRecovered':
                dailyRecoveredGraph();
                break;
        }
        console.log(country);
    }
}

function resetGraph() {
    const graph = document.getElementById('graph');
    graph.innerHTML = `<canvas id="myGraph" width="400" height="400"></canvas>`;
}

function caseGraph() {
    resetGraph();
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

function compareCountryCases(){
  resetGraph();
  const ctx = document.getElementById('myGraph').getContext('2d');
  const caseDates = Object.keys(country.cases);
  const caseCounts = Object.values(country.cases);
  //figure out how to get highest country?
  //hows it going?
  
  const data = {
        labels: caseDates,
        datasets: [{
            label: `${country.name} cases for the past 30 days`,
            data: caseCounts,
            fill: false,
            borderColor: 'rgb(0, 0, 205)',
            tension: 0.1,
        },
        {
          //idk how to get highest
        }]
    }
    let myLineChart = new Chart(ctx, {
        type: 'line',
        data: data,
    })
  
}


function dailyCasesGraph() {
    resetGraph();
    const ctx = document.getElementById('myGraph').getContext('2d');
    const dates = Object.keys(country.dailyCases);
    const dailyCases = Object.values(country.dailyCases);
    const data = {
        labels: dates,
        datasets: [{
            label: `${country.name} daily cases`,
            data: dailyCases,
            fill: false,
            // borderColor: 'rgb(75, 66, 118)',
            backgroundColor: 'rgb(75, 66, 118)',
            tension: 0.1,
        }]
    }
    let myBarChart = new Chart(ctx, {
        type: 'bar',
        data: data,
    })
}

function dailyDeathsGraph() {
    resetGraph();
    const ctx = document.getElementById('myGraph').getContext('2d');
    const dates = Object.keys(country.dailyDeaths);
    const dailyDeaths = Object.values(country.dailyDeaths);
    const data = {
        labels: dates,
        datasets: [{
            label: `${country.name} daily cases`,
            data: dailyDeaths,
            fill: false,
            // borderColor: 'rgb(75, 66, 118)',
            backgroundColor: 'rgb(75, 66, 118)',
            tension: 0.1,
        }]
    }
    let myBarChart = new Chart(ctx, {
        type: 'bar',
        data: data,
    })
}

function dailyRecoveredGraph() {
    resetGraph();
    const ctx = document.getElementById('myGraph').getContext('2d');
    const dates = Object.keys(country.dailyRecovered);
    const dailyRecovered = Object.values(country.dailyRecovered);
    const data = {
        labels: dates,
        datasets: [{
            label: `${country.name} daily recovered`,
            data: dailyRecovered,
            fill: false,
            // borderColor: 'rgb(75, 66, 118)',
            backgroundColor: 'rgb(75, 66, 118)',
            tension: 0.1,
        }]
    }
    let myBarChart = new Chart(ctx, {
        type: 'bar',
        data: data,
    })
}



//testing git
drawGraph('cases');