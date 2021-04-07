let currentUrl = window.location.search;
let currentCountry = currentUrl.slice(9);

let urlConfirmed = "https://api.covid19api.com/total/country/" + currentCountry + "/status/confirmed";
let urlDeaths = "https://api.covid19api.com/total/country/" + currentCountry+ "/status/deaths";
let urlRecovered = "https://api.covid19api.com/total/country/" + currentCountry + "/status/recovered";

let cases = [];
let deaths = [];
let recovered = [];
let dates = [];
let name;
async function fetchData() {
  try {
    let responseConfirmed = await fetch(urlConfirmed);
    let responseRecovered = await fetch(urlRecovered);
    let responseDeaths = await fetch(urlDeaths);
    let dataConfirmed = await responseConfirmed.json();
    let dataDeaths = await responseDeaths.json();
    let dataRecovered = await responseRecovered.json();
    name = dataConfirmed[0].Country;

    dataConfirmed.forEach(e => {
      cases.push(e.Cases);
      dates.push(e.Date);
    })
    dataDeaths.forEach(e => {
      deaths.push(e.Cases);
    })
    dataRecovered.forEach(e => {
      recovered.push(e.Cases);
    })
  } catch (error) {
    console.log(error);
  } finally {
    totalGraph();
  }
}
fetchData();
function totalGraph() {
    const ctx = document.getElementById('myGraph').getContext('2d');
    const data = {
        labels: dates,
        datasets: [{
            label: `${name} cases`,
            data: cases,
            fill: false,
            borderColor: 'rgba(0, 200, 0, 0.5)',
            tension: 1,
        },
        {
          label: `${name} deaths`,
          data: deaths,
          fill: false,
          borderColor: 'rgba(200, 0, 0, 0.5)',
          tension: 0.1,
        },
        {
          label: `${name} recovered`,
          data: recovered,
          fill: false,
          borderColor: 'rgba(0, 0,200, 0.5)',
          tension: 0.1,
        },]
    }
    let myLineChart = new Chart(ctx, {
        type: 'line',
        data: data,
    })
}
