class TaskService {
  constructor() {
    this.arrTask = [];
    this.arrTaskComplete = [];
  }

  //Thêm task
  addTask(task) {
    return this.arrTask.push(task);
  }

  //Xóa Task
  deleteTask(index) {
    return this.arrTask.splice(index, 1);
  }

  //Thêm vào TaskComplete
  addTaskComplete(index) {
    let taskComplete = "";
    // debugger;
    if (index < this.arrTask.length) {
      taskComplete = this.arrTask.slice(index, index + 1);
    } else {
      taskComplete = this.arrTask.slice(index);
    }
    this.arrTaskComplete = [...this.arrTaskComplete, ...taskComplete];
    this.deleteTask(index);
  }

  //Trả lại task khi chưa hoàn thành xong
  refundTask(index) {
    let task = "";
    if (index < this.arrTaskComplete.length) {
      task = this.arrTaskComplete.slice(index, index + 1);
    } else {
      task = this.arrTaskComplete.slice(index);
    }
    this.arrTask = [...this.arrTask, ...task];
    this.deleteTaskComplete(index);
  }

  //Xóa task complete
  deleteTaskComplete(index) {
    return this.arrTaskComplete.splice(index, 1);
  }

  //check all Task Complete
  checkAllComplete() {
    let taskComplete = "";
    taskComplete = this.arrTask.splice(0);
    this.arrTaskComplete = [...this.arrTaskComplete, ...taskComplete];
    this.arrTask = [];
  }

  //Sắp xếp A-Z
  sortAz() {
    this.arrTask.sort((a, b) => a.task.localeCompare(b.task));
    this.arrTaskComplete.sort((a, b) => a.task.localeCompare(b.task));
  }

  //Sắp xếp Z-A
  sortZa() {
    this.arrTask.reverse((a, b) => a.task.localeCompare(b.task));
    this.arrTaskComplete.reverse((a, b) => a.task.localeCompare(b.task));
  }
}
export default TaskService;
