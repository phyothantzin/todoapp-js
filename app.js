window.addEventListener('load', () => {
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

    const todo = {
      content: content,
      category: category,
      done: false,
      createdAt: new Date().getTime(),
    }

    todos.push(todo)
    console.log(todos)

    localStorage.setItem('todos', JSON.stringify(todos))
    e.target.reset()

    displayTodos()
  })

  displayTodos()
})

function displayTodos() {
  const todoList = document.getElementById('todolist')

  todoList.innerHTML = ''

  todos.forEach((todo) => {
    const todoDiv = document.createElement('div')
    const checkbox = document.createElement('button')
    const edit = document.createElement('button')
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
    edit.classList.add('edit')
    deleteButton.classList.add('delete')

    edit.innerText = 'Edit'
    deleteButton.innerText = 'Delete'
    checkbox.innerText = '✔'
    todoContent.innerHTML = `<textarea readonly>${todo.content}</textarea>`

    //displaying todo list

    todoList.appendChild(todoDiv)
    todoDiv.appendChild(checkbox)
    todoDiv.appendChild(todoContent)
    todoDiv.appendChild(edit)
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

    edit.addEventListener('click', (e) => {
      const input = document.querySelector('textarea')

      input.removeAttribute('readonly')
      input.focus()

      input.addEventListener('blur', (e) => {
        input.setAttribute('readonly', true)
        todo.content = e.target.value

        localStorage.setItem('todos', JSON.stringify(todos))

        displayTodos()
      })
    })

    deleteButton.addEventListener('click', (e) => {
      todos = todos.filter((t) => t != todo)

      localStorage.setItem('todos', JSON.stringify(todos))
      displayTodos()
    })
  })
}
