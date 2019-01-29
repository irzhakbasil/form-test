import React, { Component } from "react";
import "./Form.css";

const numericRegex = /^-?\d+\.?\d*$/;
const alphanumRegex = /^[,/a-zA-Z0-9/\s]+$/;
const alphaRegex = /^[A-Za-z\s]+$/;

class Form extends Component {
  state = {
    name: "",
    adress: "",
    adress2: "",
    city: "",
    state: "",
    zipCode: "",
    formErrors: {
      name: "",
      adress: "",
      adress2: "",
      city: "",
      state: "",
      zipCode: "",
      blankFields: ""
    }
  };

  formValid = ({ formErrors, ...rest }) => {
    let valid = true;
    Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false);
    });
    let check = true;
    for (let key in rest) {
      if (rest[key] === "" && key != "adress2") {
        valid = false;
        check = false;
      }
      if (!check) {
        let updatedErrors = { ...this.state.formErrors };
        updatedErrors.blankFields = "All required fields should be fulfilled";
        this.setState({
          formErrors: updatedErrors
        });
      }
    }
    return valid;
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.formValid(this.state)) {
      console.log("submitting...");
      this.props.history.push("/json");
    } else {
      console.error("Form invalid");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;

    let formErrors = this.state.formErrors;
    if (formErrors.blankFields.length > 0) formErrors.blankFields = "";

    // console.log(alphanumRegex.test("Vizvolenia, * 123/7"));

    switch (name) {
      case "name":
        if (value.length < 1) formErrors.name = "Minimum 1 character required";
        if (value.length >= 1 && alphaRegex.test(value) != true)
          formErrors.name = "Should contain only characters";
        if (value.length >= 1 && alphaRegex.test(value)) formErrors.name = "";
        break;

      case "adress":
        if (value.length < 1)
          formErrors.adress = "Minimum 1 character required";
        if (value.length >= 1 && alphanumRegex.test(value) != true)
          formErrors.adress = "Should contain characters and digits";
        if (value.length >= 1 && alphanumRegex.test(value))
          formErrors.adress = "";

        break;
      case "city":
        formErrors.city =
          value.length < 1 ? "Minimum 1 character required" : "";
        break;
      case "state":
        if (value.length < 2) formErrors.state = "2 character required";
        if (value.length >= 1 && alphaRegex.test(value) != true)
          formErrors.state = "Should contain only characters";
        if (value.length === 2 && alphaRegex.test(value)) formErrors.state = "";
        break;
      case "zipCode":
        formErrors.zipCode =
          value.length === 5 && numericRegex.test(value)
            ? ""
            : "zip-code should contain 5 digits";
        break;
    }
    this.setState({ formErrors, [name]: value });
  };

  cancelClickHandler = () => {
    let clearErrors = { ...this.state.formErrors };
    for (let key in clearErrors) {
      clearErrors[key] = "";
    }
    this.setState({
      name: "",
      adress: "",
      adress2: "",
      city: "",
      state: "",
      zipCode: "",
      formErrors: clearErrors
    });
  };

  render() {
    const { formErrors } = this.state;
    return (
      <div>
        <div className="wrapper">
          <div className="form-wrapper">
            <h1>Some random form</h1>
            {formErrors.blankFields.length > 0 && (
              <span className="topErrorMessage">{formErrors.blankFields}</span>
            )}
            <form onSubmit={this.handleSubmit} noValidate>
              <div className="name">
                <label htmlFor="name">
                  Name <span className="star">*</span>
                </label>
                <input
                  type="text"
                  className=""
                  placeholder="your name"
                  name="name"
                  maxLength="100"
                  value={this.state.name}
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.name.length > 0 && (
                  <span className="errorMessage">{formErrors.name}</span>
                )}
              </div>
              <div className="adress">
                <label htmlFor="adress">
                  Adress 1 <span className="star">*</span>
                </label>
                <input
                  type="text"
                  className=""
                  placeholder="your adress"
                  noValidate
                  value={this.state.adress}
                  name="adress"
                  maxLength="100"
                  onChange={this.handleChange}
                />
                {formErrors.adress.length > 0 && (
                  <span className="errorMessage">{formErrors.adress}</span>
                )}
              </div>
              <div className="adress2">
                <label htmlFor="adress2">Adress 2</label>
                <input
                  type="text"
                  className=""
                  placeholder="your second adress"
                  noValidate
                  value={this.state.adress2}
                  name="adress2"
                  maxLength="100"
                  onChange={this.handleChange}
                />
              </div>
              <div className="city">
                <label htmlFor="city">
                  City <span className="star">*</span>
                </label>
                <input
                  type="text"
                  className=""
                  placeholder="City"
                  noValidate
                  value={this.state.city}
                  name="city"
                  maxLength="50"
                  onChange={this.handleChange}
                />
                {formErrors.city.length > 0 && (
                  <span className="errorMessage">{formErrors.city}</span>
                )}
              </div>
              <div className="state">
                <label htmlFor="state">
                  State <span className="star">*</span>
                </label>
                <input
                  type="text"
                  className=""
                  placeholder="State"
                  noValidate
                  value={this.state.state}
                  name="state"
                  maxLength="2"
                  onChange={this.handleChange}
                />
                {formErrors.state.length > 0 && (
                  <span className="errorMessage">{formErrors.state}</span>
                )}
              </div>
              <div className="zip-code">
                <label htmlFor="zip-code">
                  Zip-code <span className="star">*</span>
                </label>
                <input
                  type="text"
                  className="zip-code"
                  placeholder="zip-code"
                  noValidate
                  value={this.state.zipCode}
                  name="zipCode"
                  maxLength="5"
                  onChange={this.handleChange}
                />
                {formErrors.zipCode.length > 0 && (
                  <span className="errorMessage">{formErrors.zipCode}</span>
                )}
              </div>
              <div className="buttons-area">
                <button type="submit">Ok</button>
                <button
                  type="reset"
                  className="btn-cancel"
                  onClick={this.cancelClickHandler}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
