import React, { Component } from "react";

export class spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <div className="spinner-border m-5 text-center" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  }
}

export default spinner;
