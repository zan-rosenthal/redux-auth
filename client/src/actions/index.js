import axios from 'axios';
import { browserHistory } from 'react-router';
import { SIGNIN, SIGNOUT, AUTH_ERROR, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3000';

export function signinUser({ email, password }){
  return function(dispatch){
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        //if request is good
          //-update state to indicate user as authenticated
          dispatch({type: SIGNIN});
          //-save JWT
          localstorage.set('token', response.data.token)
          //-redirect to new route
          browserHistory.push('/feature');

      })
      .catch(()=>{
        dispatch(authError('Incorrect Signin Info'));
      });

  }
}

export function signupUser({ email, password }){
  console.log(email, password);
  return function(dispatch){
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({type : SIGNIN});
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
      })
      .catch(response => dispatch(authError(response.data.error)))
  }
}

export function authError(error){
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser(){
  localStorage.removeItem('token');

  return {type: SIGNOUT}
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      });
  }
}
