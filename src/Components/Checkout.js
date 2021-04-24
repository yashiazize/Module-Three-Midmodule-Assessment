import React from "react";

class Checkout extends React.Component {
    state = {firstName:"", lastName:"", email:"", creditCard:"", zipCode: ""  }

    handleChange = (e) => {
        const {name, value} = e.target 
        this.setState({[name]: value})
    }

    handleSubmit = (e) => {
        const {total} = this.props
        e.preventDefault()
        const {firstName, lastName, email, creditCard, zipCode} = this.state
        if (!firstName || !lastName || !email || !creditCard || !zipCode) {
            window.alert("Input is not valid")
        } else if (creditCard.length !== 16) {
            window.alert("Credit card number is not valid")
        } else if (zipCode.length !== 5) {
            window.alert("Zip code is not valid")
        } else {
            window.alert(`Yay! Purchase complete!, You will be charged ${total}`)
        }
    }


  render() {
    const {firstName, lastName, email, creditCard, zipCode} = this.state
    return (
      <section>
        <h2>Checkout</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input onChange={this.handleChange} id="firstName" name="firstName" value={firstName}/>
          <label htmlFor="lastName">Last Name</label>
          <input onChange={this.handleChange} id="lastName" name="lastName" value={lastName}/>
          <label htmlFor="email">Email</label>
          <input onChange={this.handleChange} id="email" name="email" value={email}/>
          <label htmlFor="creditCard">Credit Card</label>
          <input onChange={this.handleChange} id="creditCard" name="creditCard"value={creditCard}/>
          <label htmlFor="zipCode">Zip Code</label>
          <input onChange={this.handleChange} id="zipCode" name="zipCode"value={zipCode}/>
          <button>Buy Now</button>
        </form>
      </section>
    );
  }
}



export default Checkout;
