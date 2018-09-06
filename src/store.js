import { createStore } from "redux";
import rootReducer  from './reducers/index'
import { composeWithDevTools } from 'redux-devtools-extension';

let store = createStore(rootReducer,composeWithDevTools())

export default store