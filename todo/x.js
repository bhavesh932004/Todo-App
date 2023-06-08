let form = document.getElementById("form");
let tasks = document.getElementById("tasks");
let title_input = document.getElementById("title-input");
let date_input = document.getElementById("date-input");
let description = document.getElementById("textarea");
let title_msg = document.getElementById("title-msg");
let msgs = document.getElementsByClassName("msg");
let add = document.getElementById("add");

//validating the form
let form_validation = function () {
  if (title_input.value === "" && description.value === "") {
    msgs[0].innerHTML = "Title cannot be blank";
    msgs[1].innerHTML = "Description cannot be blank";
  } else if (title_input.value === "") {
    msgs[0].innerHTML = "Title cannot be blank";
    msgs[1].innerHTML = "";
  } else if (description.value === "") {
    msgs[1].innerHTML = "Description cannot be blank";
    msgs[0].innerHTML = "";
  } else {
    msgs[0].innerHTML = "";
    msgs[1].innerHTML = "";
    accept_data();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (function () {
      add.setAttribute("data-bs-dismiss", "modal");
    })();
  }
};

//storing the tasks to local storage of the browser
let data = [];

//accept the data
let accept_data = function () {
  data.push({
    title: title_input.value,
    date: date_input.value,
    description: description.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);

  create_task();
};

//create a new task
let create_task = function () {
  tasks.innerHTML = "";
  data.map(function (task, index) {
    return (tasks.innerHTML += `<div id=${index}>
    <span class="fw-bold">${task.title}</span>
    <br />
    <span class="small text-secondary">${task.date}</span>
    <p>${task.description}</p>
    <span class="options">
      <i data-bs-toggle="modal" data-bs-target="#form" onClick="edit_task(this)" class="fas fa-edit"></i>
      <i onClick="delete_task(this); create_task()" class="fas fa-solid fa-trash"></i>
    </span>
  </div>`);
  });

  clear_form();
};

//clear the form after collecting the data
let clear_form = function () {
  title_input.value = "";
  date_input.value = "";
  description.value = "";
};

//edit a task
let edit_task = function (icon) {
  let task = icon.parentElement.parentElement;

  title_input.value = task.children[0].innerHTML;
  date_input.value = task.children[2].innerHTML;
  description.value = task.children[3].innerHTML;

  delete_task(icon);
};

//delete a task
let delete_task = function (icon) {
  let post = icon.parentElement.parentElement;
  // console.log(post.id);

  data.splice(post.id, 1); //id of the post to be removed when delete icon is clicked.
  localStorage.setItem("data", JSON.stringify(data)); //storing the new data array with this post deleted.
  console.log(data);
  post.remove(); //removing the task from the tasks list (from the html)
};

form.addEventListener("submit", function callback(x) {
  x.preventDefault();
  //   console.log(title_input.value, date_input.value, description.value);

  form_validation();
});

(function () {
  data = JSON.parse(localStorage.getItem("data")) || [];

  create_task();
  console.log(data);
})();
