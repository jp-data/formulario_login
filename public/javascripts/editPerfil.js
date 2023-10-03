// adicionar caixas de experiência

//eventos - experiência 1
const btn = document.getElementById('add-experience1');
const experience1 = document.getElementById('experience1');
const btnDiscardEx1 = document.querySelector('#discard-experience1')
const btnSaveExperience = document.getElementById('save-experience1')

//eventos - experiência 2

const experience2 = document.getElementById('experience2')

btn.addEventListener('click', (e) => {
    e.preventDefault()
    btn.disabled = true
    experience1.style.visibility = 'visible'
    
});

btnDiscardEx1.addEventListener('click', (e) => {
    e.preventDefault()
    btn.disabled = false
    experience1.style.visibility = 'hidden'
    document.getElementById('save-experience1').innerHTML = `<i class="ph ph-check-circle"></i>`
    document.getElementById('save-experience1').title = 'Salvar'
    document.getElementById('discard-experience1').innerHTML = `<i class="ph ph-x-circle"></i>`
    document.getElementById('discard-experience1').title = 'Descartar'
    
});

btnSaveExperience.addEventListener('click', (e) => {
    e.preventDefault()
    btn.disabled = false
    document.getElementById('save-experience1').innerHTML = `<i class="ph ph-pen"></i>`
    document.getElementById('save-experience1').title = 'Editar'
    document.getElementById('discard-experience1').innerHTML = `<i class="ph ph-trash"></i>`
    document.getElementById('discard-experience1').title = 'Excluir'

    let btn2 = document.getElementById('add-experience1');
    btn2.id = 'add-experience2'

    btn2.addEventListener('click', (e) => {
        e.preventDefault
        experience2.style.visibility = 'visible'
    })
})

