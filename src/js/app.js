import "../scss/main.scss";
window.addEventListener('DOMContentLoaded', (e) => {

    // Fetching data
    const button = document.querySelector('.data__button')
    button.addEventListener('click', e => {
        createSpinner();
        const url = 'https://randomuser.me/api/';
        
        async function fetchData() {
            await createChart(url)
            await createTable(url)
            await document.querySelector('.data__spinner').remove() 
        }
        fetchData();
    })
    
    const createChart = async (url) => {
        const chartContainer = document.querySelector(".data__chart");
        const params = '?results=1000&gender=male&nat=fr'
            const response = await fetch(`${url}${params}`);
            const data = await response.json()
            const arrayOfData = [...data.results]
            console.log("🚀 ~ file: app.js ~ line 24 ~ createChart ~ arrayOfData", arrayOfData)
    }

    const createTable = async (url) => {
        const tableContainer = document.querySelector(".data__table");
        const params = '?results=5000&gender=male&inc=gender,name,nat,dob'

            const response = await fetch(`${url}${params}`);
            const data = await response.json();
            const arrayOfData = [...data.results]
            const specificData = arrayOfData.sort(compare)
            console.log("🚀 ~ file: app.js ~ line 37 ~ createTable ~ specificData", specificData)
    }

    const compare = (a,b) => {
        if(a.dob.age > b.dob.age) {
            return -1
        }
        if(a.dob.age < b.dob.age) {
            return 1
        }
        if(Number(a.dob.date.slice(5,7)) < Number(b.dob.date.slice(5,7))){
            return -1;
        }
        if(Number(a.dob.date.slice(5,7)) > Number(b.dob.date.slice(5,7))){
            return 1
        }
        if(Number(a.dob.date.slice(8,10)) < Number(b.dob.date.slice(8,10))){
            return -1;
        }
        if(Number(a.dob.date.slice(8,10)) > Number(b.dob.date.slice(8,10))){
            return 1
        }
        return 0
    }

    const createSpinner = () => {
        const spinner = document.createElement("div");
        const dataContainer = document.querySelector('.data__content')
        document.querySelector(".data__info").classList.add("data__info--hidden")
        spinner.classList.add('data__spinner');
        dataContainer.appendChild(spinner);
    }

});