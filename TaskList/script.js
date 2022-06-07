class Task {
    constructor(TaskTitle) {
      this.TaskTitle = TaskTitle;
    }
  
  } 
  
  class UI {
    constructor() {
      this.form = document.getElementById('form');
  
      this.TaskTitle = document.getElementById('task-input');
  
      this.tableBody = document.getElementById('table-body');
  
      this.form.addEventListener('submit', (e) => this.onFormSubmit(e));
  
      this.tasks = [];
      this.loadTasksFromLocalStorage();
      this.renderTaskTable();
    }
  
    onFormSubmit(e) {
      e.preventDefault();
  
      const task = new Task(
        this.TaskTitle.value,
      );
  
      this.tasks.push(task);
      
      this.TaskTitle.value = '';
  
      this.saveTaskstoLocalStorage();
      this.renderTaskTable();
    }
  
    renderTaskTable() {
      this.tableBody.innerHTML = '';
  
      for (let i = 0; i < this.tasks.length; i++) {
        const task = this.tasks[i];
  
        const tr = this.createTaskTableRow(task);
        this.tableBody.appendChild(tr);
      }
    }
  
    createTaskTableRow(task) {
      const tr = document.createElement('tr');
  
      const tdTaskTitle = document.createElement('td');
      const tdCompleted = document.createElement('td');
      const tdActions = document.createElement('td');
  
      tdTaskTitle.innerHTML = task.TaskTitle;

      
  
      const removeButton = this.createRemoveBookButton(task);
      tdActions.appendChild(removeButton);

      const Checkbox = this.createCheckbox(task);
      tdCompleted.appendChild(Checkbox);

  
      tr.appendChild(tdTaskTitle);
      tr.appendChild(tdCompleted);
      tr.appendChild(tdActions);
  
      return tr;
    }

    createCheckbox(task){
      const box = document.createElement('box');
      box.setAttribute('class', 'form-check');
      box.setAttribute('class', 'form-check-input');
      box.setAttribute('type','checkbox');
      box.setAttribute('value','""');
      box.setAttribute('id','FlexCheckDefault');

      return box;
    }
  
    createRemoveBookButton(task) {
      const button = document.createElement('button');
  
      button.setAttribute('class', 'btn btn-outline-danger btn-sm');
      button.innerHTML = 'Remove'
      button.addEventListener('click', () => this.onRemoveBookClicked(task));
  
      return button;
    }
  
    onRemoveBookClicked(task) {
      this.tasks = this.tasks.filter((x) => {
        return task.TaskTitle !== x.TaskTitle;
      });
  
      this.saveTaskstoLocalStorage();
      this.renderTaskTable();
    }
  
    saveTaskstoLocalStorage() {
      const json = JSON.stringify(this.tasks);
      localStorage.setItem('tasks', json);
    }
  
    loadTasksFromLocalStorage() {
      const json = localStorage.getItem('tasks');
      if (json) {
        const bookArr = JSON.parse(json);
        this.tasks = bookArr.map(x => Task.fromJSON(x));
      }
    }

  }
  
  const ui = new UI();