const { DataTypes } = require("sequelize");
// Export define model function 
// Then inject sequelize connection 
module.exports = (sequelize) => {
    // define model
    sequelize.define("diet", {
        name: {
            type: DataTypes.STRING,
        },
    },
        {
            timestamps: false,
            createdAt: false,
        }
    );
};
