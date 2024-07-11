const todoValue = document.getElementById("todoText");
const todoAlert = document.getElementById("Alert");
const listItems = document.getElementById("list-items");
const addUpdate = document.getElementById("AddUpdateClick");
let todo = JSON.parse(localStorage.getItem("todo-list"));
if (!todo) {
  todo = [];
}
function CreateToDoItems() {
    if (todoValue.value === "") {
      todoAlert.innerText = "Please enter your todo text!";
      todoValue.focus();
    } else {
      let IsPresent = false;
      todo.forEach((element) => {
        if (element.item == todoValue.value) {
          IsPresent = true;
        }
      });
  
      if (IsPresent) {
        setAlertMessage("This item already present in the list!");
        return;
      }
  
      let li = document.createElement("li");
      const todoItems = `<div title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">${todoValue.value}</div><div>
                      <img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="https://cdn.iconscout.com/icon/free/png-256/free-edit-2653695-2202691.png" />
                      <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="https://cdn.iconscout.com/icon/premium/png-256-thumb/delete-3141467-2612798.png?f=webp" /></div></div>`;
      li.innerHTML = todoItems;
      listItems.appendChild(li);
  
      if (!todo) {
        todo = [];
      }
      let itemList = { item: todoValue.value, status: false };
      todo.push(itemList);
      setLocalStorage();
    }
    todoValue.value = "";
    setAlertMessage("Todo item Created Successfully!");
  }
  function ReadToDoItems() {
    todo.forEach((element) => {
      let li = document.createElement("li");
      let style = "";
      if (element.status) {
        style = "style='text-decoration: line-through'";
      }
      const todoItems = `<div ${style} title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">${
        element.item
      }
      ${
        style === ""
          ? ""
          : '<img class="todo-controls" src="https://www.shutterstock.com/image-vector/black-check-mark-icon-tick-600nw-590651921.jpg" />'
      }</div><div>
      ${
        style === ""
          ? '<img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="https://cdn.iconscout.com/icon/free/png-256/free-edit-2653695-2202691.png" />'
          : ""
      }
      <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="https://cdn.iconscout.com/icon/premium/png-256-thumb/delete-3141467-2612798.png?f=webp" /></div></div>`;
      li.innerHTML = todoItems;
      listItems.appendChild(li);
    });
  }
  ReadToDoItems();
  function UpdateToDoItems(e) {
    if (
      e.parentElement.parentElement.querySelector("div").style.textDecoration ===
      ""
    ) {
      todoValue.value =
        e.parentElement.parentElement.querySelector("div").innerText;
      updateText = e.parentElement.parentElement.querySelector("div");
      addUpdate.setAttribute("onclick", "UpdateOnSelectionItems()");
      addUpdate.setAttribute("src", "https://st3.depositphotos.com/1688079/16331/i/450/depositphotos_163310302-stock-photo-update-icon-elegant-green-round.jpg");
      todoValue.focus();
    }
  }
  
  function UpdateOnSelectionItems() {
    let IsPresent = false;
    todo.forEach((element) => {
      if (element.item == todoValue.value) {
        IsPresent = true;
      }
    });
  
    if (IsPresent) {
      setAlertMessage("This item already present in the list!");
      return;
    }
  
    todo.forEach((element) => {
      if (element.item == updateText.innerText.trim()) {
        element.item = todoValue.value;
      }
    });
    setLocalStorage();
  
    updateText.innerText = todoValue.value;
    addUpdate.setAttribute("onclick", "CreateToDoItems()");
    addUpdate.setAttribute("src", "https://cdn.iconscout.com/icon/premium/png-256-thumb/add-list-3732600-3114312.png");
    todoValue.value = "";
    setAlertMessage("Todo item Updated Successfully!");
  }function DeleteToDoItems(e) {
    let deleteValue =
      e.parentElement.parentElement.querySelector("div").innerText;
  
    if (confirm(`Are you sure. Due you want to delete this ${deleteValue}!`)) {
      e.parentElement.parentElement.setAttribute("class", "deleted-item");
      todoValue.focus();
  
      todo.forEach((element) => {
        if (element.item == deleteValue.trim()) {
          todo.splice(element, 1);
        }
      });
  
      setTimeout(() => {
        e.parentElement.parentElement.remove();
      }, 1000);
  
      setLocalStorage();
    }
  }
  function CompletedToDoItems(e) {
    if (e.parentElement.querySelector("div").style.textDecoration === "") {
      const img = document.createElement("img");
      img.src = "https://www.shutterstock.com/image-vector/black-check-mark-icon-tick-600nw-590651921.jpg";
      img.className = "todo-controls";
      e.parentElement.querySelector("div").style.textDecoration = "line-through";
      e.parentElement.querySelector("div").appendChild(img);
      e.parentElement.querySelector("img.edit").remove();
  
      todo.forEach((element) => {
        if (
          e.parentElement.querySelector("div").innerText.trim() == element.item
        ) {
          element.status = true;
        }
      });
      setLocalStorage();
      setAlertMessage("Todo item Completed Successfully!");
    }
  }
  function setLocalStorage() {
    localStorage.setItem("todo-list", JSON.stringify(todo));
  }
  function setAlertMessage(message) {
    todoAlert.removeAttribute("class");
    todoAlert.innerText = message;
    setTimeout(() => {
      todoAlert.classList.add("toggleMe");
    }, 1000);
  }
