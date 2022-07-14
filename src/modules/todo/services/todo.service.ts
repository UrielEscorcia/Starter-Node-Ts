import { Service } from "typedi";
import { ObjectId } from "mongodb";

import { TodoModel } from "../models/todo.model";
import { Todo } from "../entities";
import { NewTodoDto } from "../dto";

@Service() // Dependencies injection
export class TodoService {
    constructor(private readonly todoModel: TodoModel) {}

    public async getById(_id: ObjectId): Promise<Todo | null> {
        return this.todoModel.getById(_id);
    }

    public async addTodo(data: NewTodoDto): Promise<Todo> {
        const newTodo = await this.todoModel.create(data);

        // Business logic goes here
        // Example:
        // Trigger push notification, analytics, ...

        return newTodo;
    }

    public async list(): Promise<Todo[]> {
        return this.todoModel.list();
    }

    public update(_id: ObjectId, data: NewTodoDto) {
        return this.todoModel.update(_id, data);
    }

    public async deleteById(_id: ObjectId): Promise<Todo> {
        return this.todoModel.remove(_id);
    }
}
