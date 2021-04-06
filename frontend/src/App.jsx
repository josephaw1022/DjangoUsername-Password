import React from "react";
import axios from "axios";
import "./App.css";
import { Row, Button, Col, Container } from "reactstrap";
import { connect } from "react-redux";
import { ButtonAction } from "./Redux/Actions/ButtonAction";
import ScrollAnimation from "react-animate-on-scroll";
// import { Sticky } from 'react-sticky';
// import Stick from 'react-stick'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Button: [],
      ActiveButton: {
        count: 0,
        id: " ",
      },
      count: 0,
    };

    this.HandleClick = this.HandleClick.bind(this);
    this.HandleReset = this.HandleReset.bind(this);
  }

  componentDidMount() {
    this.updateCycle();
  }

  componentDidUpdate() {
    this.updateCycle();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
            <Row style={{ marginBottom: "100px", marginTop: "150px" }}>
              <Col>
                <h1 className="text-warning"> Button Counter</h1>
              </Col>
              <Col>
                <h1>Made by Joseph Whiteaker</h1>
              </Col>
            </Row>
          </ScrollAnimation>

          <ScrollAnimation animateIn="fadeIn" duration="2">
            <Container fluid>
              <Row>
                <Col>
                  <h1 className="text-primary">React</h1>
                </Col>

                <Col>
                  <h1 className="text-light"> + </h1>
                </Col>
                <Col>
                  <h1 className="text-danger"> Redux </h1>
                </Col>
                <Col>
                  <h1 className="text-light"> + </h1>
                </Col>
                <Col>
                  <h1 className="text-success"> Django </h1>
                </Col>
              </Row>

              <Row>
                <Col>{this.renderList()}</Col>
              </Row>
            </Container>
          </ScrollAnimation>
        </header>
      </div>
    );
  }

  updateCycle = () => {
    this.RefreshValue();
    this.props.ButtonAction(this.state.Button);
  
  };

  renderList() {
    return this.state.Button.map((item) => (
      <>
        <Row
          key={item.id}
          id="list"
          style={{ marginTop: "50px", marginBottom: "100px" }}
        >
          <Col style={{ verticalAlign: "middle" }}>
            <Row>
              <Button
                color="primary"
                onClick={() => {
                  this.HandleClick(item);
                }}
                className="text-dark"
                style={{ width: "100%", height: "auto", padding: "20px" }}
              >
                {" "}
                Increment{" "}
              </Button>
            </Row>
          </Col>
          <Col>
            <Button
              color="primary"
              className="text-dark"
              onClick={() => {
                this.HandleReset(item);
              }}
              style={{ width: "100%", height: "auto", padding: "20px" }}
            >
              Reset{" "}
            </Button>
          </Col>
          <Col>
            <h1>{item.count}</h1>
          </Col>
        </Row>
      </>
    ));
  }

  async RefreshValue() {
    const url = "http://localhost:8000/api/buttoncounts/";
    const response = await fetch(url);
    const data = await response.json();
    if (data) {
      this.setState((state) => ({ Button: data }));
    }
  }

  HandleReset(item) {
    this.setState(
      {
        ActiveButton: item,
      },
      () => {
        let tempObject = this.state.ActiveButton;
        tempObject.count = 0;
        this.setState({ ActiveButton: tempObject }, () => {
          axios.put(
            `http://localhost:8000/api/buttoncounts/${this.state.ActiveButton.id}/`,
            tempObject
          );
        });
      }
    );
    // window.location.reload()
    this.RefreshValue();
    // this.props.ButtonProp(this.state.Button)
  }

  HandleClick(item) {
    this.setState(
      {
        count: 0,
        ActiveButton: item,
      },
      () => {
        let tempObject = this.state.ActiveButton;
        tempObject.count = tempObject.count + 1;
        this.setState({ ActiveButton: tempObject }, () => {
          axios.put(
            `http://localhost:8000/api/buttoncounts/${this.state.ActiveButton.id}/`,
            tempObject
          );
        });
      }
    );

    this.RefreshValue();
  }
}

export default connect(null, { ButtonAction })(App);
