import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit(formProps){
    console.log('Submitted');
    this.props.signupUser(formProps);
  }

  renderAlert(){
    if (this.props.errorMessage){
      <div className="alert alert-danger">
        <strong>Oops! {this.props.errorMessage}</strong>
      </div>
    }
  }

  render(){
    const { handleSubmit, fields: {email, password, passwordConfirm, submit }} = this.props;
    return (
      <form onSubmit = {handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input type="email" className="form-control" {...email}/>
          {email.touched  && email.error && <div className="error">{email.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input type="password" className="form-control" {...password}/>
          {password.touched && password.error && <div className="error">{password.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm password:</label>
          <input type="password" className="form-control" {...passwordConfirm}/>
          {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary" {...submit}>Sign up</button>
      </form>
    );
  }
}

function validate(formProps){
  const errors = {};

  if (!formProps.email){
    errors.email = 'Please enter an email';
  }

  if (!formProps.password){
    errors.password = 'Please enter a password';
  }

  if (formProps.password !== formProps.passwordConfirm){
    errors.passwordConfirm = 'Passwords must match';
  }

  return errors;
}


const formOptions = {
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm', 'submit'],
  validate
}

function mapStateToProps (state){
  return { errorMessage: state.auth.error }
}

export default reduxForm(formOptions, mapStateToProps, actions)(Signup);
