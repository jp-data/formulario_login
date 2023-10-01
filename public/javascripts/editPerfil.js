// adicionar caixas de experiência

const btn = document.getElementById('add-experience');
const experience1 = document.getElementById('experience1');
const btnDiscardEx1 = document.querySelector('#discard-experience1')


btn.addEventListener('click', (e) => {
    e.preventDefault()
    btn.disabled = true
    experience1.style.visibility = 'visible'
    
});

btnDiscardEx1.addEventListener('click', (e) => {
    e.preventDefault()
    btn.disabled = false
    experience1.style.visibility = 'hidden'
    
});
