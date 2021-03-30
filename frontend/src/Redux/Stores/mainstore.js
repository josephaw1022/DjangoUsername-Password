import axios from "axios";
import { createStore, combineReducers } from "redux";
import ButtonReducer from "../Reducers/ButtonReducer";


const getValue = async ()=> {  
  const url = "http://localhost:8000/api/buttoncounts/"
  const response = await fetch(url)
  const data = await response.json()
  return data 
}


const allReducers = combineReducers({
  ButtonValue: ButtonReducer
});

export const initalState = {
  ButtonValue: getValue()
};

export const store = createStore(allReducers, initalState);

console.log(store.getState())