import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'

export default class Header extends Component {
    handleLogoutClick = () => {
        TokenService.clearAuthToken()
        window.location.href = '/home'
    }

    renderLogoutLink() {
        return (
            <>
                <div className='Header__logged-in bkg-color-lt'>
                    <a className='color-te pd-r-md' href='/landing'>Welcome</a>
                    <Link
                        onClick={this.handleLogoutClick}
                        to='/'>
                        Logout
                </Link>
                </div>
            </>
        )
    }

    renderLoginLink() {
        return (
            <div className='Header__not-logged-in'>
                <a className='color-te pd-r-md' href='/landing'>Welcome</a>
                <Link className="pd-r-md"
                    to='/register'>
                    Register
            </Link>
            <Link className="width-100"
                    to='/login'>
                    Log in
            </Link>
            </div>
        )
    }

    render() {
        return (
            <section className='Header gradient'>
                <h1 className='app-title'>
                    <a href="/home" className='header color-pk'>Studio Keeper</a>
                </h1>
                <div className='color-te tx-a-c login-wrap'>

                    {TokenService.hasAuthToken()
                        ? this.renderLogoutLink()
                        : this.renderLoginLink()}
                </div>

            </section>
        )
    }
}






