import React from 'react'
import Image from 'next/image'
import './login.css'
import LoginJson from './login-settings.json'

const Login = () => {
    return (
        <div className="container-fluid login-variant-4" style={{
            backgroundImage: `url(${LoginJson["Login Side Image"].value})`
        }}>
            <div className="logo-section">
                {/* <Image  src="" alt="Login Logo"> */}
                <Image src={`/${LoginJson["Company Logo"].value}`} alt='logo' width={150} height={50} />
            </div>

            <div className="container login-main-section">
                <div className="login-container">
                    <h6 className="text-muted">Welcome to <span className='brand-name'>{LoginJson["Company Name"].value}</span></h6>
                    <h2 className="login-head">Sign in</h2>
                    <form className="login-form">
                        <div className="mb-3 text-start mail-section">
                            <label htmlFor="email" className="form-label ">Enter your username or email address</label>
                            <input type="email" className="form-control" id="email" placeholder="Username or email address" />
                        </div>
                        <div className="mb-2 text-start pass-section">
                            <label htmlFor="password" className="form-label">Enter your password</label>
                            <input type="password" className="form-control" id="password" placeholder="Password" />
                        </div>
                        <div className="d-flex justify-content-end mb-3 login-check-section">

                            <a href="#" className="text-decoration-none text-primary login-forgot">Forgot Password?</a>
                        </div>
                        <button type="submit" className="btn login-btn py-2">Sign in</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
