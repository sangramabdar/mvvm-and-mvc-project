import * as React from "react";

import ReactDOM from "react-dom";

import App from "./components/app/App.view";
import "./index.module.css";

export default class Counter extends React.Component<{}, { count: number }> {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount(): void {
    console.log("mounted");
  }

  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<{ count: number }>,
    snapshot?: any
  ): void {
    // console.log(prevProps);
    // console.log(prevState);
    // console.log(snapshot);
    console.log(this);
    console.log("update");
  }

  componentWillUnmount(): void {
    console.log("will unmount");
  }

  onIncrementHandler = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    console.log("recompose");
    return (
      <div>
        <span>{this.state.count}</span>
        <button onClick={this.onIncrementHandler}>increment</button>
      </div>
    );
  }
}

ReactDOM.render(<Counter />, document.getElementById("root"));
