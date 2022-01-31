window.addEventListener('DOMContentLoaded', (e) => {

    const button = document.querySelector('.data__button')
    button.addEventListener('click', e => {
        const url = 'https://randomuser.me/api/';
        const params = '?results=1000&gender=male&nat=fr'
        async function fetchData() {
            const response = await fetch(`${url}${params}`);
            const data = await response.json();
            console.log(data);
        }
        fetchData();
    })

});