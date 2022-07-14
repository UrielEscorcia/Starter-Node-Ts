import { Router } from "express";
import TodoRouter from "./todo/controllers/todo.controller";

// Important: Add all your module's routers in this
export const ModuleRouters: [Router, ...Router[]] = [TodoRouter];
