import React from 'react';

import axios from 'axios';

import Trial from './components/trial.jsx';
import Header from './components/header.jsx';
import Inventory from './components/inventory.jsx';
import Radiobuttons from './components/radiobuttons.jsx';
import Footer from './components/footer.jsx';



class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      inventory: [],
      currentOption: 0,
      currentName: 'Placeholder name',
      regularPrice: 999,
      currentDiscount: 999,
      titleAndAuthor: {},
      reviews: {}
    }
    this.getInventory = this.getInventory.bind(this);
    this.getTitleAndAuthor = this.getTitleAndAuthor.bind(this);
    this.getReviews = this.getReviews.bind(this);
    this.handleFormatClick = this.handleFormatClick.bind(this);
  }

  handleFormatClick(value) {
    this.setState({
      currentOption: value
    })
  }

  getInventory(isbn) {
    axios({
      method: 'get',
      url: `/product/${isbn}/formats`
    })
    .then((data) => {
      //console.log('this is inventory data ', data);
      this.setState({
        inventory: data.data.formats,
        currentName: data.data.formats[0].name,
        regularPrice: data.data.formats[0].price,
        currentDiscount: data.data.formats[0].discount
      })
    })
    .catch((err) => {
      console.log('there was an error during the axios inventory get request: err ', err)
    })
  }

  getTitleAndAuthor(isbn) {
    axios({
      method: 'get',
      url: `/product/${isbn}`
    })
    .then((data) => {
      //console.log('this is product data ', data);
      this.setState({
        titleAndAuthor: data.data
      })
    })
    .catch((err) => {
      console.log('there was an error during the axios title get request: err ', err)
    })
  }

  getReviews(isbn) {
    axios({
      method: 'get',
      url: `/reviewssummary/${isbn}`
    })
    .then((data) => {
      //console.log('this is reviews data ', data);
      this.setState({
        reviews: data.data
      })
    })
    .catch((err) => {
      console.log('there was an error during the axios reviews get request: err ', err)
    })
  }

  componentDidMount() {
    var isbn = '16';
    this.getInventory(isbn);
    this.getTitleAndAuthor(isbn);
    this.getReviews(isbn);
  }


  render() {
    return (
      <div>
        <div><Header titleAndAuthor = {this.state.titleAndAuthor} reviews = {this.state.reviews}/></div>
        <div><Inventory inventory={this.state.inventory} currentOption={this.state.currentOption} currentName={this.state.currentName} regularPrice={this.state.regularPrice} currentDiscount={this.state.currentDiscount} handleFormatClick={this.handleFormatClick}/></div>
        <div><Radiobuttons/></div>
        <div><Footer currentOption={this.state.currentOption}/></div>
      </div>
    );
  }
}

export default App;