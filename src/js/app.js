import "../scss/main.scss";
import Chart from "chart.js/auto";

window.addEventListener("DOMContentLoaded", (e) => {

  // fetch data
  const button = document.querySelector(".data__button");
  button.addEventListener("click", (e) => {
    const info = document.querySelector(".data__info");

    info.classList.add("data__info--hidden");
    createSpinner();
    const url = "https://randomuser.me/api/";

    async function fetchData() {
      try {
        await createChart(url);
        await createTable(url);
        document.querySelector(".data__spinner").remove();

      } catch (error) {
        document.querySelector(".data__spinner").remove();
        info.innerText = "something went wrong, try again later";
        info.classList.remove("data__info--hidden");
        info.classList.add("data__info--error");
        document.querySelector(".data__table").innerHTML = "";
        document.querySelector(".data__chart").innerHTML = "";

        console.log(error);
      }
    }
    fetchData();
  });

  const createChart = async (url) => {
    const chartContainer = document.querySelector(".data__chart");
    const params = "?results=1000&gender=male&nat=fr&seed=abc";
    const response = await fetch(`${url}${params}`);
    const data = await response.json();
    const arrayOfData = [...data.results];
    chartContainer.innerHTML = '<div><canvas id="myChart"></canvas></div>';

    setChartDetails(arrayOfData);
  };

  const setChartDetails = (data) => {
    const ctx = document.getElementById("myChart");

    const overTwenty = data.filter(
      (el) => el.dob.age > 19 && el.dob.age < 30
    ).length;
    const overThirty = data.filter(
      (el) => el.dob.age > 29 && el.dob.age < 40
    ).length;
    const overForty = data.filter(
      (el) => el.dob.age > 39 && el.dob.age < 50
    ).length;
    const overFifty = data.filter(
      (el) => el.dob.age > 49 && el.dob.age < 60
    ).length;
    const overSixty = data.filter(
      (el) => el.dob.age > 59 && el.dob.age < 70
    ).length;
    const overSeventy = data.filter(
      (el) => el.dob.age > 69 && el.dob.age < 80
    ).length;

    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["20-29", "30-39", "40-49", "50-59", "60-69", "70-79"],
        datasets: [
          {
            label: "number of men of this age",
            data: [
              overTwenty,
              overThirty,
              overForty,
              overFifty,
              overSixty,
              overSeventy,
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  const createTable = async (url) => {
    const tableContainer = document.querySelector(".data__table");
    const params = "?results=5000&gender=male&inc=gender,name,nat,dob&seed=abc";

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
    if (a.dob.age > b.dob.age) return -1;
    if (a.dob.age < b.dob.age) return 1;
    if (Number(a.dob.date.slice(5, 7)) < Number(b.dob.date.slice(5, 7))) return -1;
    if (Number(a.dob.date.slice(5, 7)) > Number(b.dob.date.slice(5, 7))) return 1;
    if (Number(a.dob.date.slice(8, 10)) < Number(b.dob.date.slice(8, 10))) return -1;
    if (Number(a.dob.date.slice(8, 10)) > Number(b.dob.date.slice(8, 10))) return 1;

    return 0;
  };

  const createSpinner = () => {
    const spinner = document.createElement("div");
    const dataContainer = document.querySelector(".data__content");
    spinner.classList.add("data__spinner");
    dataContainer.appendChild(spinner);
  };

  // change background after fifth refresh page
  window.addEventListener(
    "unload",
    function () {
      let count = parseInt(localStorage.getItem("counter") || 0);
      localStorage.setItem("counter", ++count);
    },
    false
  );

  if (localStorage.getItem("counter") == 5) {
    const articles = document.querySelectorAll(".article");
    [...articles].map(el => el.style.background = "#489fe6");
    localStorage.setItem("counter", 0);
  }
});
