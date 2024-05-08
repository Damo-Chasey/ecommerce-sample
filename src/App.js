import logo from './logo.svg';
import './App.css';
import React from "react";

const API = "https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: [],
      product: false,
      size: null,
      selection: null,
      cartDropDown: false,
    }
  }

  componentDidMount(){
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({product: data}))
      .catch(error => console.error(error))
  }

  render(){
    
    return (
      <div className="App">
        <div className="header-spacer"></div>
        {this.renderHeader()}
        <div className="app-body">
          {this.state.product ? this.renderListing() : null}
        </div>
      </div>
    );
  }

  renderHeader(){
    return(
      <div className="App-header">
        <div onClick={() => this.openCartDropDown()} >
          My Cart (4)
        </div>
        {this.state.cartDropDown ? this.renderCart(): null}
        
      </div>
    )
  }

  renderCart(){
    let cartItems = [];
    this.state.cart.forEach((e) => cartItems.push(this.renderCartListing(e)))
    return(
      <div className="dropDownWrapper">
        {cartItems}
      </div>
    )
  }

  renderCartListing(listing){
    return(
      <div className="cart">
        <table>
          <tr>
            <td><img className="cart-image" src={listing.imageURL}></img></td>
            <td className="cart-center-margin"></td>
            <td className="cart-description-wrapper">
              <div className="cart-description">
                <p>{listing.title}</p>
                <p>{listing.price}</p>
                <p>Size: {listing.selection.label}</p>
              </div>
            </td>
          </tr>
        </table>
      </div>
    )
  }

  renderListing(){
    return(
        <div className="product">
          <table>
            <tr>
              <td><img className="product-image" src={this.state.product.imageURL}></img></td>
              <td className="product-center-margin"></td>
              <td className="product-description-wrapper">
                <div className="product-description">
                  <h4>{this.state.product.title}</h4>
                  <h5>{this.state.product.price}</h5>
                  <p>{this.state.product.description}</p>
                  <p>{this.requiredStar()}</p>
                  <p>Size: {this.checkSelected() ? this.state.selection.label : null}</p>{this.sizeSelector()}               {/*Decided to hide the sizing required star once a selection is made */}
                  <button onClick={() => this.addToCart(this.state.selection)}>ADD TO CART</button>
                </div>
              </td>
            </tr>
          </table>
        </div>
    )
  }

  addToCart(item){                    //Todo: fix selection assignment
    let list = this.state.cart;
    let newItem = this.state.product
    newItem.selection = item
    list.push(newItem);
    console.log(this.state.cart)
    this.setState({cart: list});
  }

  openCartDropDown(){
    let newValue = !this.state.cartDropDown;
    console.log(newValue)
    this.setState({cartDropDown: newValue});
  }

  sizeSelector(){
    let sizes = [];
    this.state.product.sizeOptions.forEach((e) => sizes.push(this.renderSizeOption(e)))
    return (
      <div>
        {sizes}
      </div>
    )
  }

  renderSizeOption(size){         
    let style = "";
    if(this.checkSelected()){
      if(this.state.selection.label === size.label){
        style = "pressed-button";
      }
    }
    

    return(
      <button className={style} onClick={()=>this.makeSelection(size)} >{size.label}</button>
    )
  }

  makeSelection(size){
    this.setState({selection: size})
  }

  checkSelected(){
    if(this.state.selection !== null){
      return true;
    }
    return false;
  }

  requiredStar(){
    if(this.checkSelected() === false){
      return(<p className="required-star">*</p>)
    }
  }
}

export default App;
