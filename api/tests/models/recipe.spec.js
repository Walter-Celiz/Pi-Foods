const { Recipe, db } = require("../../src/db");

describe("Recipe Model", () => {
    before(() =>
        db.authenticate().catch((err) => {
            console.error("Could not connect to database", err);
        })
    );

    describe("Validators", () => {
        beforeEach(() => Recipe.sync({ force: true }));

        describe("Name", () => {
            it("throw an error if name is null", (done) => {
                Recipe.create({})
                    .then(() => done(new Error("It requires a valid name")))
                    .catch(() => done());
            });
            it("Works if name is valid", () => {
                Recipe.create({ name: "Pizza" });
            });
        });
    });

    describe("Health Score", () => {
        it("Health Score must be a number", (done) => {
            Recipe.create({ name: "Pizza", healthScore: "asd" })
                .then(() => done(new Error("Health Score is not a number")))
                .catch(() => done());
        });

        it("Works if no value is passed", () => {
            Recipe.create({ name: "Pizza" });
            Recipe.create({ name: "Pizza", healthScore: 100 });
        });
    });
});
