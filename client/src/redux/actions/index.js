import axios from "axios";

export function getRecipes() {
    return async function (dispatch) {
        let response = await axios.get("http://localhost:3001/recipes");
        return dispatch({
            type: "GET_RECIPES",
            payload: response.data,
        });
    };
}

export function getRecipeByName(name) {
    return async function (dispatch) {
        try {
            const response = await axios.get(
                `http://localhost:3001/recipes?name=${name}`
            );
            return dispatch({
                type: "GET_RECIPE_BY_NAME",
                payload: response.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export function getDiets() {
    return async function (dispatch) {
        try {
            const response = await axios.get("http://localhost:3001/diets");
            return dispatch({
                type: "GET_DIETS",
                payload: response.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export function postRecipe(body) {
    return async function (dispatch) {
        try {
            const response = await axios.post(
                `http://localhost:3001/recipes/create`,
                body
            );
            return dispatch({
                type: "POST_RECIPE",
                payload: response.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export function filterRecipeByDiet(payload) {
    return {
        type: "FILTER_BY_DIET",
        payload,
    };
}

export function filterCreated(payload) {
    return {
        type: "FILTER_CREATED",
        payload,
    };
}

export function orderByName(payload) {
    return {
        type: "ORDER_BY_NAME",
        payload,
    };
}

export function orderByScore(payload) {
    return {
        type: "ORDER_BY_SCORE",
        payload,
    };
}

export default function getRecipeDetail(id) {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/recipes/${id}`);
            return dispatch({
                type: "GET_RECIPE_DETAIL",
                payload: response.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
}

// export function postRecipe(body) {
//     return async function (dispatch) {
//         try {
//             const response = await axios.post(
//                 ("http://localhost:3001/recipes/create", body)
//             );
//             return dispatch({
//                 type: "POST_RECIPE",
//                 payload: response.data
//             })
//         } catch (error) {
//             console.log(error);
//         }
//     };
// }

// export function postRecipe(payload) {
//     //accion para crear una nueva receta
//     return {
//         type: "POST_RECIPE",
//         payload,
//     };
// }
