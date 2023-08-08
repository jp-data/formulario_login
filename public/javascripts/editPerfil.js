const experience2 = document.getElementById('experience2');
const btn2 = document.querySelector('#add-experience2')
const experience3 = document.getElementById('experience3')
const btn3 = document.querySelector('#add-experience3')

btn2.addEventListener('click', (e) => {
    e.preventDefault()
    experience2.style.visibility = 'visible'
});

btn3.addEventListener('click', (e) => {
    e.preventDefault()
    experience3.style.visibility = 'visible'
});
