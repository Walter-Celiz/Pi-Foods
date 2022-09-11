const { Diet } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

const getAllDiets = async (req, res) => {
    try {
        const apiCall = await axios.get(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=30`
        );
        const apiDiets = apiCall.data.results.map(recipe => recipe.diets);
        const flatDiets = apiDiets.flat();
        const unique = [...new Set(flatDiets)];
        const diets = unique.map((name) => ({ name }));

        let aux = await Diet.bulkCreate(diets);
        res.status(200).send(aux)
    } catch (error) {
        res.status(404).send(error);
    }
};

module.exports = {
    getAllDiets,
};
