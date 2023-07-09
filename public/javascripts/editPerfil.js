const experience2 = document.getElementById('experience2');
const experience3 = document.getElementById('experience3')
const btn = document.querySelector('#add-experience')

btn.addEventListener('click', (e) => {
    e.preventDefault()
    experience2.style.visibility = 'visible'
})
