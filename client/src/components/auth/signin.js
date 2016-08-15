import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component{
  handleFormSubmit({ email, password }){
    this.props.signinUser({ email, password });
  }

  renderAlert(){
    if(this.props.errorMessage){
      return(
        <div className="alert alert-danger">
          <strong>Ooops! {this.props.errorMessage}</strong>
        </div>
      )
    }
  }

  render(){
      const { handleSubmit, fields: {email, password}} = this.props;

     return (
     <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
      <fieldset className="form-group">
        <label >Email:</label>
        <input {...email} type="text" className="form-control"/>
      </fieldset>
      <fieldset className="form-group">
        <label >Password:</label>
        <input {...password} type="password" className="form-control"/>
      </fieldset>
      {this.renderAlert()}
      <button className="btn btn-primary">Sign in</button>
    </form>
  )
 }
}

function mapStateToProps (state){
  return { errorMessage: state.auth.error };
}

const formOptions = {
  form: 'signin',
  fields: ['email', 'password']
};

export default reduxForm(formOptions, mapStateToProps, actions)(Signin);
