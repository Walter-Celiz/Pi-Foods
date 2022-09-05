const { DataTypes } = require("sequelize");
// Export a function that defines the model
// then inject the connection to sequelize.
module.exports = (sequelize) => {
    sequelize.define("diet", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    });
};
