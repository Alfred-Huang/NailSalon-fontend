import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import reducer from './reducers/index'
import {composeWithDevTools} from 'redux-devtools-extension'
const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxThunk)));

export default store
