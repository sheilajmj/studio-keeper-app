import React, { Component } from 'react'
import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-service'

export default class SignInForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  }

  state = { error: null }

  handleSubmitJwtAuth = ev => {
    ev.preventDefault()
       this.setState({ error: null })
       const { user_name, password } = ev.target

    AuthApiService.postLogin(
      user_name.value,
      password.value,
    )
      .then(res => {
        user_name.value = ''
        password.value = ''
        TokenService.saveAuthToken(res.authToken)
        this.props.onLoginSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
     }

  render() {
    const { error } = this.state
    return (
      <form
        className='LoginForm'
        onSubmit={this.handleSubmitJwtAuth}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='user_name'>
          <label htmlFor='LoginForm__user_name'>
            User name
          </label>
          <input required name='user_name' id='signInForm_user_name' />
        </div>
        <div className='password'>
          <label htmlFor='LoginForm__password'>
            Password
          </label>
          <input required name='password'  type='password' id='signInForm__password' />

        </div>
        <button type='submit'>
          Login
        </button>
      </form>
    )
  }
}
