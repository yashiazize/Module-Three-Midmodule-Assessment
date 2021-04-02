import React from "react";
import "./Checkout.css";
import formatPrice from "./helpers/formatPrice";

export default class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      creditCard: "",
      zipCode: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.validateInput()) {
      const { total } = this.props;
      alert(
        `Yay! Purchase complete! You will be charged ${formatPrice(total)}.`
      );
    } else {
      const { creditCard, zipCode } = this.state;
      let msg = "Input is not valid.";
      if (creditCard.length !== 16) {
        msg += "\nCredit card number is not valid.";
      }

      if (zipCode.length !== 5) {
        msg += "\nZip code is not valid.";
      }

      alert(msg);
    }
  };

  handleTextChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  validateInput = () => {
    const { firstName, lastName, email, creditCard, zipCode } = this.state;
    return (
      firstName &&
      lastName &&
      email &&
      creditCard &&
      creditCard.length === 16 &&
      zipCode &&
      zipCode.length === 5
    );
  };

  render() {
    return (
      <div className="Checkout">
        <h1>Checkout</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            onChange={this.handleTextChange}
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            onChange={this.handleTextChange}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={this.handleTextChange}
          />

          <label htmlFor="creditCard">Credit Card</label>
          <input
            type="text"
            id="creditCard"
            name="creditCard"
            onChange={this.handleTextChange}
          />

          <label htmlFor="zipCode">Zip Code</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            onChange={this.handleTextChange}
          />

          <button type="submit">Buy Now</button>
        </form>
      </div>
    );
  }
}
