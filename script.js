const form = document.querySelector("#newTaskForm");
const input = document.querySelector("#newTaskInput");
const list_el = document.querySelector("#ToDo");
const icon = document.getElementById("icon");
const alert = document.querySelector("#alert");
const text = document.querySelector(".text");
const popup = document.querySelector(".horray_popup");
const ok = document.querySelector(".okButton");
const todos = JSON.parse(localStorage.getItem("todos")) || [];

//sumbit/add task

form.addEventListener("submit", function (e) {
  e.preventDefault();
  addingTask();
  localStorage.setItem("todos", JSON.stringify(todos));
});

//background color switch
icon.addEventListener("click", function () {
  const body = document.querySelector("body");
  if (body.style.background == "white") {
    body.style.background = "black";
  } else if ((body.style.background = "black")) {
    body.style.background = "white";
  }
});

function addingTask() {
  const todo = input.value;
  todos.push(todo);
  //pop up for fill todo
  if (!todo) {
    alert.removeAttribute("hidden");
    return;
  }
  if (todo) {
    alert.setAttribute("hidden", "hidden");
  }

  todos.forEach((todo) => {
    //creates element of list
    const todo_el = document.createElement("div");
    todo_el.classList.add("ToDo-lists");
    //contents added
    const todo_content_el = document.createElement("div");
    todo_content_el.classList.add("content");

    todo_el.appendChild(todo_content_el);
    //content type added
    const todo_input_el = document.createElement("input");
    todo_input_el.classList.add("text");
    todo_input_el.type = "text";
    todo_input_el.value = todo;
    todo_input_el.setAttribute("readonly", "readonly");

    todo_content_el.appendChild(todo_input_el);
    //action buttons being added complete delete edit
    const todo_action_el = document.createElement("div");
    todo_action_el.classList.add("actions");

    const todo_completed_el = document.createElement("button");
    todo_completed_el.classList.add("completed");
    todo_completed_el.innerHTML = "Completed";

    const todo_edit_el = document.createElement("button");
    todo_edit_el.classList.add("edit");
    todo_edit_el.innerHTML = "Edit";

    const todo_delete_el = document.createElement("button");
    todo_delete_el.classList.add("delete");
    todo_delete_el.innerHTML = "Delete";

    todo_action_el.appendChild(todo_completed_el);
    todo_action_el.appendChild(todo_edit_el);
    todo_action_el.appendChild(todo_delete_el);

    todo_el.appendChild(todo_action_el);

    list_el.appendChild(todo_el);

    input.value = "";
    //completed line action
    todo_completed_el.addEventListener("click", () => {
      todo_input_el.style.textDecoration = "line-through";
      popup.removeAttribute("hidden");
    });

    ok.addEventListener("click", () => {
      popup.setAttribute("hidden", "hidden");
    });

    //edit line action
    todo_edit_el.addEventListener("click", () => {
      if (todo_edit_el.innerText.toLowerCase() == "edit") {
        todo_input_el.removeAttribute("readonly");
        todo_input_el.focus();
        todo_edit_el.innerText = "Save";
        todo_input_el.style.textDecoration = "none";
      } else {
        todo_input_el.setAttribute("readonly", "readonly");
        todo_edit_el.innerText = "Edit";
      }
    });
    //deleted line action
    todo_delete_el.addEventListener("click", () => {
      list_el.removeChild(todo_el);
    });
  });
}
