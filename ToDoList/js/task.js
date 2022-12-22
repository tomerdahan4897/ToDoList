export var Status;
(function (Status) {
    Status[Status["uncompleted"] = 0] = "uncompleted";
    Status[Status["completed"] = 1] = "completed";
})(Status || (Status = {}));
export class Task {
    id;
    description;
    status;
    timeStamp;
    constructor(id, description, status = Status.uncompleted, timestamp = Task.getDate()) {
        this.id = id;
        this.description = description;
        this.status = status;
        this.timeStamp = timestamp;
    }
    static getDate() {
        const date = new Date();
        const currentDateString = date.toLocaleDateString("he-IL", {
            year: "numeric",
            month: "numeric",
            day: "2-digit",
            hour: "numeric",
            minute: "numeric"
        });
        return currentDateString;
    }
    static isCompleted(task) {
        if (task.status === 0) {
            return 'uncomplete';
        }
        else {
            return 'complete';
        }
    }
    toString() {
        return `descriptioon: ${this.description}, ${this.status}`;
    }
}
