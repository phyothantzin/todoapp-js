window.addEventListener('load', () => {
  const darkMode = JSON.parse(localStorage.getItem('dark-mode'))
  const darkModeMaintain = document.getElementById('input-color-switch')
  if (darkMode) {
    document.body.classList.add('dark-mode')
    darkModeMaintain.setAttribute('checked', true)
  }

  todos = JSON.parse(localStorage.getItem('todos')) || []

  const nameInput = document.getElementById('name')

  nameInput.value = localStorage.getItem('name') || ''

  nameInput.addEventListener('change', (e) => {
    localStorage.setItem('name', e.target.value)
  })

  const addtodoForm = document.getElementById('addtodo-form')

  addtodoForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const content = e.target.elements.content.value
    const category = e.target.elements.category.value

    if (content == '') return

    const todo = {
      content: content,
      category: category,
      done: false,
      createdAt: new Date().getTime(),
    }

    todos.push(todo)

    localStorage.setItem('todos', JSON.stringify(todos))
    e.target.reset()

    displayTodos()
  })

  displayTodos()
})

function displayTodos() {
  const todoList = document.getElementById('todolist')
  const toggleSwitch = document.getElementById('input-color-switch')

  toggleSwitch.addEventListener('click', darkMode)

  function darkMode() {
    localStorage.setItem('dark-mode', toggleSwitch.checked)

    if (toggleSwitch.checked) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }

  todoList.innerHTML = ''

  todos.forEach((todo) => {
    const todoDiv = document.createElement('div')
    const checkbox = document.createElement('button')
    // const edit = document.createElement('button')
    const deleteButton = document.createElement('button')
    const todoContent = document.createElement('div')

    if (todo.category == 'business') {
      todoDiv.classList.add('business-todo')
    } else {
      todoDiv.classList.add('personal-todo')
    }

    if (todo.done) {
      todoContent.classList.add('done')
    }

    todoDiv.classList.add('todo')
    checkbox.classList.add('checkbox')
    todoContent.classList.add('todo-content')
    // edit.classList.add('edit')
    deleteButton.classList.add('delete')

    // edit.innerText = '✔'
    deleteButton.innerText = 'Delete'
    checkbox.innerText = '✔'
    todoContent.innerHTML = `<textarea readonly>${todo.content}</textarea>`

    //displaying todo list

    todoList.appendChild(todoDiv)
    todoDiv.appendChild(todoContent)
    // todoDiv.appendChild(edit)
    todoDiv.appendChild(checkbox)
    todoDiv.appendChild(deleteButton)

    checkbox.addEventListener('click', (e) => {
      todo.done = !todo.done

      if (todo.done) {
        todoContent.classList.add('done')
      } else {
        todoContent.classList.remove('done')
      }
      localStorage.setItem('todos', JSON.stringify(todos))
      displayTodos()
    })

    // edit.addEventListener('click', (e) => {
    //   const input = document.querySelector('textarea')

    //   input.removeAttribute('readonly')
    //   input.focus()

    //   input.addEventListener('blur', (e) => {
    //     input.setAttribute('readonly', true)
    //     todo.content = e.target.value

    //     localStorage.setItem('todos', JSON.stringify(todos))

    //     displayTodos()
    //   })
    // })

    deleteButton.addEventListener('click', (e) => {
      todos = todos.filter((t) => t != todo)

      localStorage.setItem('todos', JSON.stringify(todos))
      displayTodos()
    })
  })
}
