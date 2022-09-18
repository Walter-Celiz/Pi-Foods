import axios from "axios";

export function getRecipes() {
    return async function (dispatch) {
        let json = await axios.get("http://localhost:3001/recipes");
        return dispatch({
            type: "GET_RECIPES",
            payload: json.data,
        });
    };
}

export function filterRecipeByDiet(payload) {
    return {
        type: 'FILTER_BY_DIET',
        payload
    }
}

export function filterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

export function orderBy(payload) {
    return {
        type: 'ORDER_BY',
        payload
    }
}

