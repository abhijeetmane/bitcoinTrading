import { GET_BUY_ORDER } from '../actions';

export default function(state= [],action){

	switch(action.type){
		case GET_BUY_ORDER:{
			return [...action.payload]
		}
		default:
			return state;
	}
}