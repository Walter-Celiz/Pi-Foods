require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_DEPLOY } = process.env;

const sequelize = new Sequelize(
  // `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  DB_DEPLOY,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Read all the files from the Models folder, require them and add them to the modelDefiners array
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Inject the connection (sequelize) to all the models
modelDefiners.forEach((model) => model(sequelize));
// Capitalize model names ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// Sequelize.models are all imported models as properties
// To relate them we do a destructuring
const { Recipe, Diet } = sequelize.models;

// Relations
Recipe.belongsToMany(Diet, { through: "recipe_diet" });
Diet.belongsToMany(Recipe, { through: "recipe_diet" });

module.exports = {
  ...sequelize.models,
  db: sequelize,
  Recipe,
  Diet,
};
