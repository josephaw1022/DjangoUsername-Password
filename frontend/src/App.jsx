import React from "react"
import axios from "axios"
import "./App.css"
import { Row, Button, Col } from "reactstrap"
import { connect } from "react-redux"
import { ButtonAction } from "./Redux/Actions/ButtonAction"
import {store } from "./Redux/Stores/store"


class App extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      Button: [],
      ActiveButton: {
        count: 0,
        id: " ",
      },
    }
    this.HandleClick = this.HandleClick.bind(this)
  }


  componentDidMount() {
    this.updateCycle()
  }
  
  componentDidUpdate() {
    this.updateCycle()
    
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
    
          <Row style={{marginBottom:"100px"}}> 
            <Col>
              <h1 className="text-warning"> Button Counter </h1>
            </Col>
          </Row>

        
          <Row style={{ marginBottom: "100px" }}>
            <Col>
              <h1 className="text-primary"> React </h1>
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
              {this.renderList()}
            
        <div className="section">
      
        </div>
        </header>
      </div>
    )
  }

  updateCycle = () => {
    console.log(store.getState())
    console.log("store state ^ ")
    this.renderList()
    this.RefreshValue()
    this.props.ButtonProp(this.state.Button)
  }

   renderList() {
    return this.state.Button.map((item) => (
      <>
        <Row key={item.id} id="list">
          <Col>
            <Button
            color="primary"
              onClick={() => {
                this.HandleClick(item)
              }}
              className="text-dark"
              style={{width:"100%"}}
            >
              {" "}
              Increment{" "}
            </Button>
          </Col>
          <Col style={{width:"auto"}}>
            <Button

              color="primary"
              className="text-dark"
              onClick={() => {
                this.HandleReset(item)
              }}

              style={{width:"100%"}}
            
            >
              Reset{" "}
            </Button>
          </Col>
        </Row>
        <Row>
          <br />
        </Row>
        <Row>
          <h1 className="text-light">Item Count = {item.count}</h1>
        </Row>
      </>
    ))
  }

  async RefreshValue() {
    this.setState({ count: this.state.count + 1 })
    const url = "http://localhost:8000/api/buttoncounts/"
    const response = await fetch(url)
    const data = await response.json()
    if (data) {
      this.setState((state) => ({ Button: data }))
      this.renderList()
    }
    this.props.ButtonProp(this.state.Button)
  }

  HandleReset(item) {
    this.setState(
      {
        ActiveButton: item,
      },
      () => {
        let tempObject = this.state.ActiveButton
        tempObject.count = 0
        this.setState({ ActiveButton: tempObject }, () => {
          axios
            .put(
              `http://localhost:8000/api/buttoncounts/${this.state.ActiveButton.id}/`,
              tempObject
            )
            .then(this.RefreshValue())
            .then(this.renderList())
        })
      }
    )
    // window.location.reload()
    this.props.ButtonProp(this.state.Button)
  }

  HandleClick(item) {
    this.setState(
      {
        count: 0,
        ActiveButton: item,
      },
      () => {
        let tempObject = this.state.ActiveButton
        tempObject.count = tempObject.count + 1
        this.setState({ ActiveButton: tempObject }, () => {
          axios.put(
            `http://localhost:8000/api/buttoncounts/${this.state.ActiveButton.id}/`,
            tempObject
          )
        })
      }
    )

    this.RefreshValue()
  }


}





function mapStateToProps(props, state) {
  return {
    DefaultValue: props.DefaultValue + " " + state.NewButton,
  }
}

const mapActionsToProps = {
  ButtonProp: ButtonAction,
}

export default connect(mapStateToProps, mapActionsToProps)(App)
