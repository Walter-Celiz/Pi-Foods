const { Recipe, db } = require("../../src/db");

describe("Recipe Model", () => {
    before(() =>
        db.authenticate().catch((err) => {
            console.error("No se pudo conectar a la base de datos", err);
        })
    );

    describe("Validators", () => {
        beforeEach(() => Recipe.sync({ force: true }));

        describe("Name", () => {
            it("arroja un error si name es null", (done) => {
                Recipe.create({})
                    .then(() => done(new Error("It requires a valid name")))
                    .catch(() => done());
            });
            it("Funciona si el name es valido", () => {
                Recipe.create({ name: "Pizza" })
            });
        });
    });

    describe("Health Score", () => {
        it("El Health Score debe ser un numero", (done) => {
            Recipe.create({ name: "Pizza", healthScore: "asd" })
                .then(() => done(new Error("Health Score no es un numero")))
                .catch(() => done());
        });

        // it("La fuerza debe ser un numero", (done) => {
        //   Pokemon.create({ name: "Pikachu", attack: "asd" })
        //     .then(() => done(new Error("Fuerza no es un numero")))
        //     .catch(() => done());
        // });

        // it("La defensa debe ser un numero", (done) => {
        //   Pokemon.create({ name: "Pikachu", defense: "asd" })
        //     .then(() => done(new Error("Defensa no es un numero")))
        //     .catch(() => done());
        // });

        // it("La velocidad debe ser un numero", (done) => {
        //   Pokemon.create({ name: "Pikachu", speed: "asd" })
        //     .then(() => done(new Error("Velocidad no es un numero")))
        //     .catch(() => done());
        // });

        // it("La altura debe ser un numero", (done) => {
        //   Pokemon.create({ name: "Pikachu", height: "asd" })
        //     .then(() => done(new Error("Altura no es un numero")))
        //     .catch(() => done());
        // });

        // it("El peso debe ser un numero", (done) => {
        //   Pokemon.create({ name: "Pikachu", weight: "asd" })
        //     .then(() => done(new Error("Peso no es un numero")))
        //     .catch(() => done());
        // });

        it("Funciona si no se pasa un valor", () => {
            Recipe.create({ name: "Pizza" });
            Recipe.create({ name: "Pizza", healthScore: 100 });
        });

    });
});