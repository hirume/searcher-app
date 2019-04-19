import React from "react";
import { withRouter, Link } from "react-router-dom";
import Button from "./Button";
import "./Header.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }

  render() {
    return (
      <div className="header">
        {this.props.children}
        <form>
          <input
            className="search-box"
            onChange={this.handleChange}
            value={this.state.input}
            placeholder="Search for a movie..."
          />
        </form>
        <Link
          to="/"
          onClick={() => this.props.onSearch(this.state.input.trim())}
        >
          <Button text="Search" />
        </Link>
      </div>
    );
  }
}
export default withRouter(Header);
