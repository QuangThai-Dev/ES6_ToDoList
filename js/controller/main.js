import Task from "../models/Task.js";
import TaskService from "../services/TaskService.js";

let taskService = new TaskService();

const getEle = (id) => document.getElementById(id);

const xoaForm = () => {
  getEle("newTask").value = "";
};

const renderTask = (arrTask) => {
  let content = "";
  arrTask.map((item, index) => {
    const { task } = item;
    content += `
        <li>
            <span>${task}</span>
            <div class="buttons">
                <button class="remove" onclick="deleteTask(${index})"><i class=" fa fa-trash-alt"></i></button>
                <button class="complete" onclick="TaskComplete(${index})"><i class=" fa fa-check"></i></button>
            </div>
        </li>
    `;
  });
  getEle("todo").innerHTML = content;
};

const renderTaskComplete = (arrTaskComplete) => {
  let content = "";
  arrTaskComplete.map((item, index) => {
    const { task } = item;
    content += `
        <li>
            <span>${task}</span>
            <div class="buttons">
                <button class="remove" onclick="deleteTaskComplete(${index})"><i class=" fa fa-trash-alt"></i></button>
                <button class="complete" onclick="refunTask(${index})"><i class="fa fa-redo"></i></button>
            </div>
        </li>
    `;
  });
  getEle("completed").innerHTML = content;
};
const setLocalTasK = (arrTask) => {
  localStorage.setItem("TASK", JSON.stringify(arrTask));
};
const getLocalTask = () => {
  if (localStorage.getItem("TASK")) {
    taskService.arrTask = JSON.parse(localStorage.getItem("TASK"));
  }
  renderTask(taskService.arrTask);
};
const setLocalTasKComplete = (arrTaskComplete) => {
  localStorage.setItem("TaskComplete", JSON.stringify(arrTaskComplete));
};
const getLocalTaskComplete = () => {
  if (localStorage.getItem("TaskComplete")) {
    taskService.arrTaskComplete = JSON.parse(
      localStorage.getItem("TaskComplete")
    );
  }
  renderTaskComplete(taskService.arrTaskComplete);
};
getLocalTask();
getLocalTaskComplete();
const renderAll = () => {
  renderTask(taskService.arrTask);
  setLocalTasK(taskService.arrTask);
  renderTaskComplete(taskService.arrTaskComplete);
  setLocalTasKComplete(taskService.arrTaskComplete);
};
// Thêm Task
const addTask = () => {
  let newtask = getEle("newTask").value;
  if (newtask === "") {
    alert("Yêu cầu nhập task!!");
    return;
  }
  const task = new Task(newtask);
  taskService.addTask(task);

  renderTask(taskService.arrTask);
  setLocalTasK(taskService.arrTask);
  xoaForm();
};
getEle("addItem").addEventListener("click", addTask);

// Thêm Task Complete
const TaskComplete = (index) => {
  taskService.addTaskComplete(index);
  renderAll();
};

// Xóa Task
const deleteTask = (index) => {
  taskService.deleteTask(index);
  renderTask(taskService.arrTask);
  setLocalTasK(taskService.arrTask);
};

// Xóa Task Complete
const deleteTaskComplete = (index) => {
  taskService.deleteTaskComplete(index);
  renderTaskComplete(taskService.arrTaskComplete);
  setLocalTasKComplete(taskService.arrTaskComplete);
};

// Check All Compete
const checkAll = () => {
  taskService.checkAllComplete();
  renderAll();
};
getEle("one").addEventListener("click", checkAll);

// Sắp xếp A-Z
const sortAZ = () => {
  taskService.sortAz();
  renderAll();
};
getEle("two").addEventListener("click", sortAZ);

// Sắp xếp Z-A
const sortZA = () => {
  taskService.sortZa();
  renderAll();
};

const refunTask = (index) => {
  taskService.refundTask(index);
  renderAll();
};
getEle("three").addEventListener("click", sortZA);

window.deleteTask = deleteTask;
window.TaskComplete = TaskComplete;
window.deleteTaskComplete = deleteTaskComplete;
window.refunTask = refunTask;
