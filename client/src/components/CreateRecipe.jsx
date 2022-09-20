import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postRecipe, getDiets } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = "Your recipe needs a Name";
    } else if (input.summary.length > 255) {
        errors.summary = "Please tell us what is your recipe about";
    } else if (input.healthScore > 100 || input.healthScore < 0) {
        errors.healthScore = "The health score must be a number between 0 and 100";
    } else if (!input.image) {
        errors.image = "It would be nice if you show us how it looks";
    } else if (!input.steps) {
        errors.steps = "Don't you wanna tell us how to do it ourselves?";
    }
    return errors;
}

export default function CreateRecipe() {
    const dispatch = useDispatch();
    const history = useHistory();
    const diets = useSelector((state) => state.diets);

    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        //state, setstate
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
        setErrors(validate(input));
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
                    {errors.name && <h5 className="error">{errors.name}</h5>}
                </div>
                <div>
                    <label>Summary:</label>
                    <input
                        type="text"
                        name="summary"
                        value={input.summary}
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.summary && <h5 className="error">{errors.summary}</h5>}
                </div>
                <div>
                    <label>healthScore:</label>
                    <input
                        type="number"
                        name="healthScore"
                        value={input.healthScore}
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.healthScore && (
                        <h5 className="error">{errors.healthScore}</h5>
                    )}
                </div>
                <div>
                    <label>Image:</label>
                    <input
                        type="text"
                        name="image"
                        value={input.image}
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.image && <h5 className="error">{errors.image}</h5>}
                </div>
                <div>
                    <label>Step by step:</label>
                    <input
                        type="text"
                        name="steps"
                        value={input.steps}
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.steps && <h5 className="error">{errors.steps}</h5>}
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
