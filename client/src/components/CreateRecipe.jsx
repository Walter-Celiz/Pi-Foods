import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postRecipe, getDiets } from "../redux/actions";

export default function CreateRecipe() {
    const dispatch = useDispatch();
    const history = useHistory();
    const diets = useSelector((state) => state.diets);

    const [input, setInput] = useState({ //state, setstate
        name: "",
        summary: "",
        healthScore: "",
        image: "",
        steps: "",
        diets: [],
    });

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        console.log(input);
    }

    function handleCheck(e) {
        console.log(input);
        if (e.target.checked) {
            setInput({
                ...input,
                diets: [...input.diets, e.target.value],
            });
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(input);
        dispatch(postRecipe(input));
        alert("recipe created");
        setInput({
            name: "",
            summary: "",
            healthScore: "",
            image: "",
            steps: "",
            diets: [],
        });
        history.push("/home"); //hook para redirigir
    }

    useEffect(() => {
        dispatch(getDiets());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Link to="/home">Home</Link>
            <h3>Create your own recipe!</h3>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={input.name}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Summary:</label>
                    <input
                        type="text"
                        name="summary"
                        value={input.summary}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>healthScore:</label>
                    <input
                        type="number"
                        name="healthScore"
                        value={input.healthScore}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input
                        type="text"
                        name="image"
                        value={input.image}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Step by step:</label>
                    <input
                        type="text"
                        name="steps"
                        value={input.steps}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <h3>Select which diet it belongs to</h3>
                    {diets.map((diet) => {
                        return (
                            <span key={`${diet.id}`}>
                                <input
                                    type="checkbox"
                                    value={`${diet.name}`}
                                    name={`${diet.name}`}
                                    onChange={(e) => handleCheck(e)}
                                />
                                {`${diet.name} `}
                            </span>
                        );
                    })}
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}
