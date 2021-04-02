export const INCREMENT = "INCREMENT"

// The function, submitValue, is an 'action creator'
// The return value is an 'action'
export function ButtonAction(value) {
  
  return {
    type: INCREMENT,
    payload: {
      NewButton: value,
    },
  }
}
