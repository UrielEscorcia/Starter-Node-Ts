import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import supertest from "supertest";

import { TodoMongooseModel } from "../../modules/todo/models";

import {
    connect,
    clearDatabase,
    closeDatabase,
    populateDatabase,
    initializeApp,
} from "../utils";

describe("Todo Testing", () => {
    let request: supertest.SuperTest<supertest.Test>;

    beforeAll(async () => {
        request = supertest(initializeApp());
        await connect();
    });

    // You can populate de DB before each test
    beforeEach(async () => {
        await populateDatabase(TodoMongooseModel, [
            {
                content: "todo 4",
            },
            {
                content: "todo 5",
            },
        ]);
    });

    afterEach(async () => {
        await clearDatabase();
    });

    afterAll(async () => {
        await closeDatabase();
    });

    /**
     * Prompt test suite.
     */

    it("should get list of todos, there are 2 items", async () => {
        const res = await request.get("/v1/todo");
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body).toHaveLength(2);
    });

    it(`should create a new todo and get it`, async () => {
        // We define the query and the variables as you would do from your front-end
        const body = {
            content: `Test todo.`,
        };

        const res = await request
            .post("/v1/todo")
            .send(body)
            .set("Accept", "application/json");

        expect(res.status).toBe(StatusCodes.CREATED);
        expect(res.body).toMatchObject(body);
    });

    it(`should get a todo by id`, async () => {
        // We generate a todo ID
        const todoId = new mongoose.Types.ObjectId().toHexString().toString();
        // Add a todo with the generated ID in the database
        const data = {
            _id: todoId,
            content: "todo 1",
        };
        await populateDatabase(TodoMongooseModel, [data]);
        const res = await request.get(`/v1/todo/${todoId}`);
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body).toMatchObject(data);
    });

    it(`should update a todo by id and get it updated`, async () => {
        // We generate a todo ID
        const todoId = new mongoose.Types.ObjectId().toHexString().toString();
        // Add a todo with the generated ID in the database

        const data = {
            _id: todoId,
            content: "todos 1",
        };
        await populateDatabase(TodoMongooseModel, [data]);
        const res = await request
            .put(`/v1/todo/${todoId}`)
            .send({ content: "todos 2" });

        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body).toMatchObject({
            _id: todoId,
            content: "todos 2",
        });
    });

    it(`should delete a todo by id`, async () => {
        // We generate a todo ID
        const todoId = new mongoose.Types.ObjectId().toHexString().toString();
        // Add a todo with the generated ID in the database
        const data = {
            _id: todoId,
            content: "todo delete",
        };
        await populateDatabase(TodoMongooseModel, [data]);
        const res = await request.delete(`/v1/todo/${todoId}`);
        expect(res.status).toBe(StatusCodes.NO_CONTENT);
    });
});
