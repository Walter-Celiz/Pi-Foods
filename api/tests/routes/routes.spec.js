/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const assert = require("assert");
const session = require("supertest-session");
const app = require("../../src/app");

const agent = session(app);

const recipe = {
    name: "example",
    healthScore: 50,
};

describe("Recipe routes", () => {
    describe("GET /recipes", () => {
        it("should get 200", () => agent.get("/recipes").expect(200)).timeout(
            40000
        );
    });

    describe("GET /recipes/:id", () => {
        it("should get 200", (done) => {
            agent.get("/recipes/1").expect(200).timeout(40000);
            done();
        });
        it("should res with 404 if the recipes is not found.", (done) => {
            agent.get("/recipes/impossibleToExist").expect(404).timeout(40000);
            done();
        });
    });

    describe("POST /recipes", () => {
        it("should create a new recipe", (done) => {
            agent.post("/recipe/create").send(recipe).expect(200);
            done();
        });
    });
});
