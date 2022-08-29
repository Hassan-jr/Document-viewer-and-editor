import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import RootReducer from './Reducers/RootReducer';



const Store = createStore(RootReducer, applyMiddleware(thunk));
//const store = createStore(rootReducer, compose(applyMiddleware(...middleware)))

export default  Store;
