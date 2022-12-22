import { Task } from "./task.js";
export class TaskManager {
    tasks = [];
    maxId = 0;
    constructor() {
        const tm = this.getFromLocal();
        this.tasks = tm.tasks.map(t => new Task(t.id, t.description, t.status, t.timeStamp));
        this.maxId = tm.maxId || 0;
    }
    getNextId() {
        return this.maxId++;
    }
    addTask(task) {
        this.tasks.push(task);
        this.saveToLocal();
    }
    removeTask(id) {
        let index = this.tasks.findIndex(t => t.id === id);
        this.tasks.splice(index, 1);
        this.saveToLocal();
    }
    editTask(task) {
        let index = this.tasks.findIndex(t => t.id === task.id);
        this.tasks.splice(index, 1, task);
        this.saveToLocal();
    }
    saveToLocal() {
        localStorage.setItem('tasks', JSON.stringify(tm));
    }
    getFromLocal() {
        const str = localStorage.getItem('tasks') ?? '[]';
        const obj = JSON.parse(str);
        return obj;
    }
}
export let tm = new TaskManager();
