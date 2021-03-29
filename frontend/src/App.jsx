import React from "react"
import axios from "axios"
import "./App.css"
import { Row, Button, Col } from "reactstrap"

class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      Button: [],
      ActiveButton: {
        count: 0,
        id: " ",
      }
    
    }
    this.HandleClick = this.HandleClick.bind(this)
  }

  componentDidMount() {
    this.RefreshValue()
    this.renderList()
  }

  renderList() {
    return this.state.Button.map((item) => (
      <>
        <Row key={item.id} id="list">
          <Col>
            <Button
              onClick={() => {
                this.HandleClick(item)
              }}
              className="text-info"
            >
              {" "}
              Increment{" "}
            </Button>
          </Col>
          <Col>
            <Button
              onClick={() => {
                this.HandleReset(item)
              }}
              className="text-info"
            >
              Reset{" "}
            </Button>
          </Col>
        </Row>
        <Row>
          <br />
        </Row>
        <Row>
          <h1 className="text-danger">Item Count = {item.count}</h1>
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
  }

  HandleReset(item) {
    this.setState(
      {
        count: 0,
        ActiveButton: item,
      },
      () => {
        let tempObject = this.state.ActiveButton
        tempObject.count = 0
        this.setState(
          (state) => ({ ActiveButton: tempObject }),
          () => {
            axios.put(
              `http://localhost:8000/api/buttoncounts/${this.state.ActiveButton.id}/`,
              tempObject
            )
          }
        )
      }
    )
    window.location.reload()
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
    window.location.reload()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">{this.renderList()}</header>
      </div>
    )
  }
}
export default App
