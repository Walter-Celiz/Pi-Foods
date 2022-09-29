import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import CreateRecipe from "./components/CreateRecipe";
import DetailRecipe from "./components/DetailRecipe";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <>
        <Switch>
          <Route exact path="/" component={LandingPage}></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/recipes/create" component={CreateRecipe}></Route>
          <Route path="/recipes/:id" component={DetailRecipe}></Route>
        </Switch>
      </>
    </BrowserRouter>
  );
}
