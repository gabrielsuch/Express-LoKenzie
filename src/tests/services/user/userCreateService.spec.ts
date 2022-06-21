import supertest from "supertest";
import { validate } from "uuid";
import { Connection } from "../..";
import app from "../../../app";
import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"


describe("Create an user", () => {
    const dbConnection = new Connection();

    beforeAll(async () => {
        await dbConnection.create();
    });

    afterAll(async () => {
        await dbConnection.clear();
        await dbConnection.close();
    });

    afterEach(async () => {
        await dbConnection.clear();
    });

    it("Return: User as JSON response and Status code: 201", async () => {
        const name = "name";
        const email = "email@mail.com";
        const password = "123456";
    
        const userData = { name, email, password };
    
    
        const response = await supertest(app)
            .post("/users/register")
            .send({ ...userData });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("email");
        expect(response.body.email).toStrictEqual(userData.email);
        expect(validate(response.body.userUuid)).toBeTruthy();
    });
}); 