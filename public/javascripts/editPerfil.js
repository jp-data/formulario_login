// adicionar caixas de experiência

const btn = document.getElementById('add-experience');
const experience1 = document.getElementById('experience1');
const btnDiscardEx1 = document.querySelector('#discard-experience1')

const btnSaveExperience = document.getElementById("save-experience1")



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

btnSaveExperience.addEventListener('click', (e) => {
    e.preventDefault()
    btn.disabled = false
    document.getElementById('save-experience1').innerHTML = `<i class="ph ph-pen"></i>`
    document.getElementById('save-experience1').title = 'Editar'
    document.getElementById('discard-experience1').innerHTML = `<i class="ph ph-trash"></i>`
    document.getElementById('discard-experience1').title = 'Excluir'

})
