import React, { Component } from "react";
import RegisterForm from "./components/RegisterForm";
import Success from "./components/Success";
import { Route, Switch } from "react-router-dom";
import "./styles.css";
const axios = require("axios");

export class App extends Component {
  state = {
    cities: [],
    states: [],
  };

  async componentDidMount() {
    const { data: states } = await axios.get(
      "https://city-state-api-karan.herokuapp.com/api/getStatesOfCountry/IN/"
    );

    const { data: cities } = await axios.get(
      "https://city-state-api-karan.herokuapp.com/api/getCitiesOfCountry/IN"
    );

    this.setState({ states });
    this.setState({ cities });
  }

  render() {
    return (
      <div className="container">
        <Switch>
          <Route path="/success" component={Success}></Route>
          <Route
            path="/"
            exact
            render={(props) => (
              <RegisterForm
                states={this.state.states}
                cities={this.state.cities}
                {...props}
              ></RegisterForm>
            )}
          ></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
