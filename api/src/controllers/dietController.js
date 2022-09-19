// const axios = require("axios");
// require('dotenv').config()
// const { API_KEY } = process.env;
const { Diet } = require("../db");
const API = require("../api.json")

const getAllDiets = async (req, res) => {
    try {
        const allDiets = await Diet.findAll();
        if (allDiets.length === 0) {
            // const apiCall = await axios(
            //     `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=30`
            // )
            // const apiDiets = apiCall.data.results.map(recipe => {
            const apiDiets = API.results.map((recipe) => {
                const diets = recipe.diets;
                return diets;
            });

            const flatDiets = apiDiets.flat();
            const unique = [...new Set(flatDiets)];
            const diets = unique.map((name) => ({ name }))
            const result = await Diet.bulkCreate(diets)
            return res.status(200).send(result)
        } else {
            return res.status(200).send(allDiets);
        }
    } catch (error) {
        // console.log(error + " #getAllDiets fail!!! 🔴🔴🔴🔴");
    }
};



// let dietId = 0;

// let diets = [
//     {
//         name: "Gluten free",
//         id: ++dietId,
//     },
//     {
//         name: "Ketogenic",
//         id: ++dietId,
//     },
//     {
//         name: "Vegetarian",
//         id: ++dietId,
//     },
//     {
//         name: "Lacto-vegetarian",
//         id: ++dietId,
//     },
//     {
//         name: "Ovo-vegetarian",
//         id: ++dietId,
//     },
//     {
//         name: "Vegan",
//         id: ++dietId,
//     },
//     {
//         name: "Pescatarian",
//         id: ++dietId,
//     },
//     {
//         name: "Paleolithic",
//         id: ++dietId,
//     },
//     {
//         name: "Primal",
//         id: ++dietId,
//     },
//     {
//         name: "Whole 30",
//         id: ++dietId,
//     },
//     {
//         name: "Dairy free",
//         id: ++dietId,
//     },
//     {
//         name: "Lacto ovo vegetarian",
//         id: ++dietId,
//     },
// ];

// async function getAllDiets(req, res, next) {
//     try {
//         const response = await Diet.findAll();
//         if (response.length > 0) return res.json(response);
//         else {
//             try {
//                 const dietsDB = await Diet.bulkCreate(diets);
//                 return res.json(dietsDB);
//             } catch {
//                 (err) => next(err);
//             }
//         }
//     } catch {
//         (err) => next(err);
//     }
// }

module.exports = {
    getAllDiets,
};
