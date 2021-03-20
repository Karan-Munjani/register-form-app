// import "./App.css";
import RegisterForm from "./components/RegisterForm";
import Success from "./components/Success";
import { Route, Switch } from "react-router-dom";
import "./styles.css";

function App() {
  return (
    <div className="container">
      <Switch>
        <Route path="/success" component={Success}></Route>
        <Route path="/" exact component={RegisterForm}></Route>
      </Switch>
    </div>
  );
}

export default App;
