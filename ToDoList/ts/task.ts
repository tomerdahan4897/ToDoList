export enum Status {
    uncompleted = 0,
    completed = 1
}
export class Task {
    id: number;
    description: string;
    status: Status;
    timeStamp: string;
    constructor(id: number, description: string, status: Status = Status.uncompleted, timestamp: string = Task.getDate()) {
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
    static isCompleted(task: Task) {
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