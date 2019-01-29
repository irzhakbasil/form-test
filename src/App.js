import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { Route, Link, Switch } from "react-router-dom";
import LabelFinder from "./containers/LabelFinder/LabelFinder";
import StartPage from "./Components/StartPage";
import Form from "./containers/Form/Form";

class App extends Component {
  state = {
    data: null,
    error: null
  };

  componentDidMount() {
    var url = "https://react-my-burger-marvin.firebaseio.com/testData.json";
    axios
      .get(url)
      .then(result => {
        let res = result.data;
        for (let key in res) {
          let data = {
            ...res[key]
          };
          this.setState({
            data: data
          });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error: "Data cant be loaded from remote server"
        });
      });
  }

  render() {
    return (
      <div className="App">
        <div className="nav">
          <Link className="link" to="json">
            JSON Task
          </Link>
          <Link className="link" to="form">
            Form and form validation
          </Link>
          <Link className="link" to="/">
            Start Page
          </Link>
        </div>
        <Switch>
          <Route exact path="/" component={StartPage} />
          <Route
            exact
            path="/json"
            render={() => (
              <LabelFinder data={this.state.data} error={this.state.error} />
            )}
          />
          <Route exact path="/form" component={Form} />
          <Route component={StartPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
