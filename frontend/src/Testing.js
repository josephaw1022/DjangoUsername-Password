import React from "react"
import store from "./Redux/Stores/store"

class Items extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
    }

    store.subscribe(() => {
      // When state will be updated(in our case, when items will be fetched),
      // we will update local component state and force component to rerender
      // with new data.

      this.setState({
        items: store.getState().items,
      })
    })
  }

  render() {
    return (
      <div>
        {this.state.items.map((item) => (
          <p> {item.title} </p>
        ))}
      </div>
    )
  }
}
export default Items
