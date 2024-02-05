// store.js
import { createStore } from 'redux';
import robotReducer from './robotReducer';

const store = createStore(robotReducer);

export default store;
