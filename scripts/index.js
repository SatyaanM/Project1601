let countries = [];
let global;
let data;
let options = {
  method: 'GET',
  mode: 'cors',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};
function drawTable(countries) {
  let html = `
    <tr>
        <td class='td_left'><a href='country.html?country=Global'>Global</a></td>
        <td class='td_middle'>${global.totalConfirmed}</td>
        <td class='td_middle'>${global.totalDeaths}</td>
        <td class='td_middle'>${global.totalRecovered}</td>
        <td class='td_middle'>${global.newConfirmed}</td>
        <td class='td_right'>${global.newDeaths}</td>
    </tr>
    `;
  let result = document.getElementById("result");
  for (let country of countries) {
    Object.keys(country).forEach(function (key) {
      if (country[key] === null) {
        country[key] = '-';
      }
    })
    html += `
        <tr>
            <td class='td_left'><a href='country.html?country=${country.name}'>${country.name}</a></td>
            <td class='td_middle'>${country.totalConfirmed}</td>
            <td class='td_middle'>${country.totalDeaths}</td>
            <td class='td_middle'>${country.totalRecovered}</td>
            <td class='td_middle'>${country.newConfirmed}</td>
            <td class='td_right'>${country.newDeaths}</td>
        </tr>
        `;

  }
  result.innerHTML = html;
}

function search() {
  let inputField = document.getElementById('country_search');
  let searchTerm = inputField.value.toUpperCase();
  let table = document.getElementById('home_table');
  let tr = table.getElementsByTagName('tr');
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

function setCountries(data) {
  global = {
    'newConfirmed': data.Global.NewConfirmed,
    'totalConfirmed': data.Global.TotalConfirmed,
    'newDeaths': data.Global.NewDeaths,
    'totalDeaths': data.Global.TotalDeaths,
    'newRecovered': data.Global.NewRecovered,
    'totalRecovered': data.Global.TotalRecovered,
  }
  data.Countries.forEach(e => {
    let country = {
      'name': e.Country,
      'newConfirmed': e.NewConfirmed,
      'totalConfirmed': e.TotalConfirmed,
      'newDeaths': e.NewDeaths,
      'totalDeaths': e.TotalDeaths,
      'newRecovered': e.NewRecovered,
      'totalRecovered': e.TotalRecovered,

    }
    countries.push(country);
  })
}

async function fetchSummary() {
  try {
    let response = await fetch('https://api.covid19api.com/summary', options);
    data = await response.json();
  } catch (error) {
    console.log(error);
  } finally {
    setCountries(data);
    updateDate();
    drawTable(countries);
  }
}

function updateDate() {
  const ctx = document.getElementById('update-date');
  const dateUpdated = data['Date'];
  let txt = `Last Updated: ${dateUpdated}`;
  ctx.innerText = txt;
}

fetchSummary();