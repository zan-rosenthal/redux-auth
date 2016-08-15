import { SIGNIN, SIGNOUT, AUTH_ERROR } from '../actions/types';

export default function(state = {}, action){
  switch(action.type){
    case SIGNIN:
      return { ...state, authenticated:true};
    case SIGNOUT:
      return {...state, authenticated:false};
    case AUTH_ERROR:
      return {...state, error: action.payload};
  }

  return state;
}
