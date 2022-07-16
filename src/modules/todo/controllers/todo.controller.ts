import { Container, Service } from "typedi";
import { ObjectId } from "mongodb";
import { Router, Request, Response } from "express";

import { TodoService } from "../services";
import { NewTodoDto } from "../dto/todo.dto";
import { StatusCodes } from "http-status-codes";

/*
IMPORTANT: Your business logic must be in the service!
*/

class TodoRouter {
    private readonly todoService = Container.get(TodoService);
    router: Router;

    constructor() {
        this.router = Router();
        this.configEndpoints();
    }

    private configEndpoints() {
        this.router.get("/todo", this.list.bind(this));
        this.router.post("/todo", this.create.bind(this));
        this.router.get("/todo/:id", this.get.bind(this));
        this.router.put("/todo/:id", this.update.bind(this));
        this.router.delete("/todo/:id", this.delete.bind(this));
    }

    private async list(req: Request, res: Response) {
        const list = await this.todoService.list();
        res.status(StatusCodes.OK).json(list);
    }

    private async create(req: Request, res: Response) {
        const data = req.body as NewTodoDto;
        const todo = await this.todoService.addTodo(data);
        res.status(StatusCodes.CREATED).json(todo);
    }

    private async get(req: Request, res: Response) {
        const id = req.params.id;
        const todo = await this.todoService.getById(new ObjectId(id));
        if (!todo) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: "Todo not found",
            });
        } else {
            res.status(StatusCodes.OK).json(todo);
        }
    }

    private async update(req: Request, res: Response) {
        const id = req.params.id;
        const data = req.body as NewTodoDto;
        const todo = await this.todoService.update(new ObjectId(id), data);
        res.status(StatusCodes.OK).json(todo);
    }

    private async delete(req: Request, res: Response) {
        const id = req.params.id;
        const todo = await this.todoService.deleteById(new ObjectId(id));
        res.status(StatusCodes.NO_CONTENT).json(todo);
    }
}

export default new TodoRouter().router;
