import "../scss/main.scss";
window.addEventListener('DOMContentLoaded', (e) => {

    // Fetching data
    const button = document.querySelector('.data__button')
    button.addEventListener('click', e => {
        const spinner = document.createElement("div");
        const dataContainer = document.querySelector('.data__content')
        document.querySelector(".data__info").classList.add("data__info--hidden")
        spinner.classList.add('data__spinner');
        dataContainer.appendChild(spinner);

        const url = 'https://randomuser.me/api/';
        const params = '?results=1000&gender=male&nat=fr'
        async function fetchData() {
            const response = await fetch(`${url}${params}`);
            const data = await response.json();
            await spinner.remove()
            console.log(data);
            
        }
        fetchData();
    })

});