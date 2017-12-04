import { combineReducers } from 'redux';
import buyOrders from './buyOrderReducer';

const tradereducers = combineReducers({
	buyOrders: buyOrders
});

export default tradereducers;