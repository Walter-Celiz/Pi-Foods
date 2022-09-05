const { DataTypes } = require("sequelize");
// Export a function that defines the model
// then inject the connection to sequelize.
module.exports = (sequelize) => {
  sequelize.define("recipe", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    spoonacularScore: {
      type: DataTypes.FLOAT(1),
      validate: {
        min: 0,
        max: 100,
      },
    },
    healthScore: {
      type: DataTypes.FLOAT(1),
      allowNull: false,
      validate: {
        min: 0,
        max: 100,
      },
    },
    instructions: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  });
};
