import { combineReducers } from "redux"
import Main from "./Main"

const RootReducer = combineReducers({
  Main : Main,
})

export default RootReducer;