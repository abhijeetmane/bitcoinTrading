import axios from 'axios';

export const GET_BUY_ORDER = 'get_buy_order';

const URL = 'http://localhost:5001/listOrders?start=0&size=';

export function getBuyOrders(limit){
    const request = axios.get(`${URL}${limit}`);

    return (dispatch) => {
        request.then((data) => {
            dispatch({type:GET_BUY_ORDER, payload:data.data});
        });
    }
}


