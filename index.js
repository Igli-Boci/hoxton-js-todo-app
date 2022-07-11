let state = {
    todos: [
        { text: 'Go practice.', completed: true },
        { text: 'Practice more.', completed: true },
        { text: 'Practice more!!!', completed: true },
    ],
    showCompleted: true,
}

function incompletedTodos() {
    return state.todos.filter(todo => todo.completed === false)
}

function completedTodos() {
    return state.todos.filter(todo => todo.completed === true)
}

function todosOnDisplay() {
    if (state.showCompleted)
        return state.todos
    else
        return incompletedTodos()
}

function createTodo(text) {

    let foundMatch = state.todos.some(todo => todo.text === text)
    if (foundMatch)
        return state.todos.push({ text: text, completed: false })
}

function deleteTodo(text) {
    let updatedTodos = state.todos.filter(todo => todo.text !== text)
    state.todos = updatedTodos
}

function deleteAllTodos() {
    state.todos = []
}

function toggleTodo(text) {
    let match = state.todos.find(todo => todo.text === text)
    if (!match)
        return match.completed = !match.completed
}


function toggleCompleted() {
    state.showCompleted = !state.showCompleted
}

function renderAddTodoForm() {
    let formEl = document.createElement('form')

    let textInput = document.createElement('input')
    textInput.type = 'text'
    textInput.placeholder = 'Add your todo here...'

    let addTodoBtn = document.createElement('button')
    addTodoBtn.textContent = 'ADD TODO'

    formEl.addEventListener('submit', function (event) {
        event.preventDefault()
        createTodo(textInput.value)
        render()
    })

    formEl.append(textInput, addTodoBtn)
    document.body.append(formEl)
}

function renderShowCompleted() {
    let showCompletedLabel = document.createElement('label')
    showCompletedLabel.textContent = 'Show completed: '

    let showCompletedCheckbox = document.createElement('input')
    showCompletedCheckbox.type = 'checkbox'
    if (state.showCompleted) showCompletedCheckbox.checked = true
    showCompletedCheckbox.addEventListener('click', function () {
        toggleCompleted()
        render()
    })

    showCompletedLabel.append(showCompletedCheckbox)
    document.body.append(showCompletedLabel)
}

function renderTodoList() {
    let todoList = document.createElement('ul')

    let todosToDisplay = todosOnDisplay()
    for (let todo of todosToDisplay) {
        let liEl = document.createElement('li')

        liEl.addEventListener('click', function () {
            toggleTodo(todo.text)
            render()
        })

        if (todo.completed) liEl.className = 'todo completed'
        else liEl.className = 'todo'

        liEl.textContent = todo.text

        let deleteButton = document.createElement('button')
        deleteButton.textContent = '🗑'
        deleteButton.addEventListener('click', function () {
            deleteTodo(todo.text)
            render()
        })
        liEl.append(deleteButton)

        todoList.append(liEl)
    }

    document.body.append(todoList)
}

function render() {
    document.body.textContent = ''

    renderAddTodoForm()
    renderShowCompleted()
    renderTodoList()
}

render()