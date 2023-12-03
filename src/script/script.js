const localStorageKey = 'todo-items'

// Pegar o input de tarefa
const inputTask = document.querySelector('.todo-item')

// Pegar o input de responsável
const inputResponsible = document.querySelector('.todo-responsible')

// Buscar os valores no local storage
const values = JSON.parse(localStorage.getItem(localStorageKey) || '[]')

// Pegar a lista de tarefas
const list = document.querySelector('.list')

// Adicionar uma tarefa 
function addTask() {

    // Validar o input de tarefa
    if (!inputTask.value) {
        alert('Por favor, insira uma tarefa!')
        return
    }

    // Validar o input de responsável
    if (!inputResponsible.value) {
        alert('Por favor, insira um responsável pela tarefa!')
        return
    }

    // Input dos atributos
    values.push({
        task: inputTask.value,
        responsible: inputResponsible.value,
        completed: false
    })

    // Set dos values no localstorage
    localStorage.setItem(localStorageKey, JSON.stringify(values))

    inputTask.value = ''
    inputResponsible.value = ''

    // Atualiza a lista
    showTasks()
}


// Mostrar a lista
function showTasks() {
    // Começa com a lista vazia
    list.innerHTML=''

    // Para cada index dentro de values, uma div é gerada
    for (let i = 0; i<values.length; i++) {
        list.innerHTML += `
            <div class="list-item ${values[i]['completed'] ? "done" : ""}">
            <button onclick="completeTask(${i})" class="complete-todo"><img src="/src/assets/icon/complete-icon.svg" alt="complete task"></button> 
            <li>
                <span>Tarefa: ${values[i]['task']}</span>
                <span>Responsável: ${values[i]['responsible']}</span>   
            </li>
            <button onclick="removeTask(${i})" class="remove-todo"><img src="/src/assets/icon/trash-icon.svg" alt="remove task"></button>
            </div>
            `
    }
}

// Remove a tarefa da lista
function removeTask(index) {
    // Remove a tarefa de acordo com o index 
    values.splice(index, 1)
    // Atualiza o localStorage
    localStorage.setItem(localStorageKey, JSON.stringify(values))

    // Atualiza a lista
    showTasks()
}

// Marca adicona ou remove a tarefa de "Completa"
function completeTask(index) {
    // Inverte o atributo completed para o seu valor oposto
    values[index]['completed'] = !values[index]['completed']
    // Atualiza o localStorage
    localStorage.setItem(localStorageKey, JSON.stringify(values))

    // Atualiza a lista
    showTasks()
}

// Mostra a lista
showTasks()