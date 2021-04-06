import React from "react";
import { connect } from "react-redux";
import { Container } from "reactstrap";
class Output extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: null,
      ranStart: 0,
    };
  }
  render() {
    return (
      <Container>
        {this.state.count ? (
          <h1> {this.state.count} </h1>
        ) : (
          <h1> Not Given </h1>
        )}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Output);
