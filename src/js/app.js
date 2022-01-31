import "../scss/main.scss";
window.addEventListener("DOMContentLoaded", (e) => {
  // Fetching data
  const button = document.querySelector(".data__button");
  button.addEventListener("click", (e) => {
    createSpinner();
    const url = "https://randomuser.me/api/";

    async function fetchData() {
      await createChart(url);
      await createTable(url);
      await document.querySelector(".data__spinner").remove();
    }
    fetchData();
  });

  const createChart = async (url) => {
    const chartContainer = document.querySelector(".data__chart");
    const params = "?results=1000&gender=male&nat=fr";
    chartContainer.innerHTML = '<div><canvas id="myChart"></canvas></div>';
    const response = await fetch(`${url}${params}`);
    const data = await response.json();
    const arrayOfData = [...data.results];
  };

  const createTable = async (url) => {
    const tableContainer = document.querySelector(".data__table");
    const params = "?results=5000&gender=male&inc=gender,name,nat,dob";

    const response = await fetch(`${url}${params}`);
    const data = await response.json();
    const arrayOfData = [...data.results];
    const specificData = arrayOfData.sort(compare);
    const oldestMenData = specificData.slice(0, 10);
    tableContainer.innerHTML =
      "<tr><th>Index</th><th>Age</th><th>Date od birth</th><th>Name</th><th>Nationality</th></tr>";
    oldestMenData.map((el, index) => {
      const tr = document.createElement("tr");
      tableContainer.append(tr);
      const number = document.createElement("td");
      number.innerText = ++index;
      const age = document.createElement("td");
      age.innerText = el.dob.age;
      const dob = document.createElement("td");
      dob.innerText = new Date(el.dob.date).toLocaleDateString();
      const name = document.createElement("td");
      name.innerText = `${el.name.title} ${el.name.first} ${el.name.last}`;
      const nat = document.createElement("td");
      nat.innerText = el.nat;
      tr.append(number, age, dob, name, nat);
    });
  };

  const compare = (a, b) => {
    if (a.dob.age > b.dob.age) {
      return -1;
    }
    if (a.dob.age < b.dob.age) {
      return 1;
    }
    if (Number(a.dob.date.slice(5, 7)) < Number(b.dob.date.slice(5, 7))) {
      return -1;
    }
    if (Number(a.dob.date.slice(5, 7)) > Number(b.dob.date.slice(5, 7))) {
      return 1;
    }
    if (Number(a.dob.date.slice(8, 10)) < Number(b.dob.date.slice(8, 10))) {
      return -1;
    }
    if (Number(a.dob.date.slice(8, 10)) > Number(b.dob.date.slice(8, 10))) {
      return 1;
    }
    return 0;
  };

  const createSpinner = () => {
    const spinner = document.createElement("div");
    const dataContainer = document.querySelector(".data__content");
    document.querySelector(".data__info").classList.add("data__info--hidden");
    spinner.classList.add("data__spinner");
    dataContainer.appendChild(spinner);
  };
});