import React, { Component } from 'react';
import logo from './forestiologo.png';
import './App.css';
import axios from 'axios';
import Search from './Search';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searchResults: [],
      cachedTrees: [],
    }
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.incrementScore = this.incrementScore.bind(this);
    this.decrementScore = this.decrementScore.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3030/trees')
      .then(res => {
        this.setState({ searchResults: res.data, cachedTrees: res.data })
      })
  }

  handleSearchChange(e) {

    this.setState({ searchText: e.target.value });
    const newSearchResults = this.state.cachedTrees.filter((ele) => {
      return ele.name.toLowerCase().includes(e.target.value.toLowerCase())
    })

    this.setState({ searchResults: newSearchResults })

  }

  handleSearchSubmit(e) {
    e.preventDefault();

    axios.get('http://localhost:3030/', { treeQuery: this.state.searchText })
      .then(res => {
        this.setState({ searchResults: res.data })
      });
  }

  incrementScore(e) {
    e.preventDefault();

    let newState = Object.assign({}, this.state);
    newState.searchResults[e.target.id].score++;
    this.setState(newState);

  }

  decrementScore(e) {
    e.preventDefault();

    let newState = Object.assign({}, this.state);
    newState.searchResults[e.target.id].score--;
    this.setState(newState);

  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Forest<span id="I">I</span><span>O</span></h2>
        </div>
        <Search
          handleSearchChange={this.handleSearchChange}
          searchResults={this.state.searchResults}
          incrementScore={this.incrementScore}
          decrementScore={this.decrementScore}
        />
      </div>
    );
  }
}

export default App;
