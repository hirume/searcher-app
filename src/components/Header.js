import React from "react";
import { withRouter } from "react-router-dom";
import Button from "./Button";
import "./Header.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }

  handleSubmit(event) {
    this.props.onSearch(this.state.input.trim());
    this.props.history.push("/");
    event.preventDefault();
  }

  render() {
    return (
      <div className="header">
        <div className="left-part">{this.props.children}</div>
        <div className="right-part">
          <form onSubmit={this.handleSubmit}>
            <input
              className="search-box"
              onChange={this.handleChange}
              value={this.state.input}
              placeholder="Search for a movie..."
            />
          </form>
          <Button text="Search" onClick={this.handleSubmit} />
        </div>
      </div>
    );
  }
}
export default withRouter(Header);
