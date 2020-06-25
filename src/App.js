import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      error: false
    }
  }

  incrementCounter = () => {
    if (this.state.error) {
      this.setState({
        error: false
      });
    }
    this.setState({
      counter: this.state.counter + 1
    });
  }

  decrementCounter = () => {
    if (this.state.counter === 0) {
      this.setState({ error: true });
    } else {
      this.setState({ ...this.state, counter: this.state.counter - 1 })
    }
  };

  render() {
    const errorDisplay = this.state.error ? '' : 'hidden';

    return (
      <div data-test="component-root">
        <h1
          data-test="counter-display">
          Counter value is {this.state.counter}
        </h1>
        <h1
          data-test="error-display"
          className={`error ${errorDisplay}`}>
          Cannot decrement counter further
        </h1>
        <button
          data-test="increment-button"
          onClick={this.incrementCounter}>
          Increment counter
        </button>
        <button
          data-test="decrement-button"
          onClick={this.decrementCounter}>
          Decrement counter</button>
      </div>
    );
  }
}

export default App;
