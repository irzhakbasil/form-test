import React, { Component } from "react";
import ReactJson from "react-json-view";
import "./LableFinder.css";
import data from "../../data.json";

class LabelFinder extends Component {
  state = {
    number: null
  };

  formOnChangeHandler = (data, num) => {
    let id = Number(num);
    function getLabel(data, id) {
      let result = "not found";
      if (id === data.id) {
        return data.label;
      }
      Array.isArray(data.child) &&
        data.child.some(function(a) {
          result = getLabel(a, id);
          if (result !== "not found") {
            return true;
          }
        });
      return result;
    }
    let number = getLabel(data, id);
    this.setState({
      number: number
    });
  };
  render() {
    let content = null;
    if (this.props.error)
      content = (
        <div className="load-error">
          <p>{this.props.error}</p>
        </div>
      );
    if (this.props.error === null)
      content = (
        <>
          <div className="lable-finder-ui">
            <h1>Enter Id to find a label</h1>
            <input
              className="json-search_user-input"
              type="number"
              onChange={e => {
                this.formOnChangeHandler(this.props.data, e.target.value);
              }}
            />
            <div className="search-results">
              <span className="number-holder">{this.state.number}</span>
            </div>
          </div>
          <div className="json-formatter">
            <ReactJson src={data} theme="ocean" />
          </div>
        </>
      );
    return <div className="json-section-container">{content}</div>;
  }
}
export default LabelFinder;
