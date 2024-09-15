const localStorageKey = 'To-do-list-TV';

function validateIfExistsNewTask() {
    const input = document.getElementById('input-new-task').value.trim();
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    return values.some(task => task.name === input);
}

function newTask() {
    const input = document.getElementById('input-new-task');
    input.style.border = '';

    // Validação
    if (!input.value.trim()) {
        input.style.border = '1px solid red';
        alert('Digite algo para inserir na lista');
        return; // Retorna para evitar a execução do código abaixo
    }
    
    if (validateIfExistsNewTask()) {
        alert('Já existe uma tarefa com essa descrição');
        return; // Retorna para evitar a execução do código abaixo
    }

    // Incrementar localStorage
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    values.push({ name: input.value.trim() });
    localStorage.setItem(localStorageKey, JSON.stringify(values));

    // Limpar o input após adicionar a tarefa
    input.value = '';

    showValues();
}

function showValues() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let list = document.getElementById('to-do-list');
    list.innerHTML = '';

    // Criar uma string com o HTML dos itens da lista
    const listItems = values.map((task, index) => `
        <li>
            ${escapeHTML(task.name)}
            <button id="btn-check-${index}" onclick="removeTask(${index})">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                </svg>
            </button>
        </li>
    `).join('');

    list.innerHTML = listItems;
}

// Função para escapar caracteres especiais em HTML
function escapeHTML(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// Função para remover uma tarefa
function removeTask(index) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    values.splice(index, 1);
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    showValues();
}

// Mostrar a lista de tarefas ao carregar a página
showValues();
