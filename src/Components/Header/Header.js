import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../Nav/Nav'
import { Hyph } from '../Utils/Utils'
import TokenService from '../../services/token-service'

export default class Header extends Component {
    handleLogoutClick = () => {
        TokenService.clearAuthToken()
        window.location.href = '/home'
    }

    renderLogoutLink() {
        return (
            <div className='Header__logged-in'>
                <Nav />
                <Link
                    onClick={this.handleLogoutClick}
                    to='/'>
                    Logout
                </Link>
            </div>
        )
    }

    renderLoginLink() {
        return (
            <div className='Header__not-logged-in'>
                <Link
                    to='/register'>
                    Register
            </Link>
                <Hyph />
                <Link
                    to='/login'>
                    Log in
            </Link>
            </div>
        )
    }

    render() {
        return (
            <nav className='Header'>
                <h1>
                    <a href="/home" className="header">Studio Keeper</a>
                </h1>
                <div className='login-welcome'>
                    <a className="d-flex" href='/landing'>Welcome</a>
                    {TokenService.hasAuthToken()
                        ? this.renderLogoutLink()
                        : this.renderLoginLink()}
                </div>


            </nav>
        )
    }
}






