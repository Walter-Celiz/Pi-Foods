import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByName } from "../redux/actions";

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getRecipeByName(name));
        setName("")
    }

    return (
        <form>
            <input
                type="text"
                placeholder="Name of the Recipe..."
                autoComplete="off"
                onChange={(e) => handleInputChange(e)}
            />
            <input type="submit"
                onClick={(e) => handleSubmit(e)}
                value="Search"
            />
        </form>
    );
}
