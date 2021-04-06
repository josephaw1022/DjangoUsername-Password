import { createStore, combineReducers } from "redux";
import ButtonReducer from "../Reducers/ButtonReducer";

const allReducers = combineReducers({
  ButtonValue: ButtonReducer,
});

export const initalState = {
  ButtonValue: [],
};

export const store = createStore(allReducers);

