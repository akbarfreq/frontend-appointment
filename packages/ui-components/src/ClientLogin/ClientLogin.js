import React, {PureComponent} from 'react'
import {Button, Col, Container, Form, Image, Row} from 'react-bootstrap'
import logo from './images/400x400.png'
import logoCogent from './images/logo-small-0063FF.png'
import {CHybridInput, CHybridPassword} from '@frontend-appointment/ui-elements'

class ClientLogin extends PureComponent {
    state = {
        user: {username: '', password: '', hospitalCode: ''},
        errorMsg: {username: '', password: '', passwordValid: true, usernameValid: true},
        formStatus: true,
        submitErrorMsg: ''
    };

    setTheState = (name, value) => {
        let other = true;
        let user = {...this.state.user};
        let errorMsg = {...this.state.errorMsg};
        if (Object.keys(user).includes(name)) {
            user[name] = value;
            errorMsg[name] = '';
            if (name === 'password') {
                errorMsg['passwordValid'] = true;
            } else if (name === 'username') {
                errorMsg['usernameValid'] = true;
            }
            if (name === 'hospitalCode') {
                user.hospitalCode = (user.hospitalCode).toUpperCase();
            }
            other = false
        }
        !other
            ? this.setState(prevState => ({
                user,
                errorMsg
            }))
            : this.setState(prevState => ({
                [name]: value
            }))
    };

    onChangeHandler = e => {
        const {name, value} = e.target;
        this.setTheState(name, value)
    };

    checkFormSubmitIsValid = () => {
        let errorMsg = {username: '', password: '', passwordValid: true, usernameValid: true};
        let formStatus = true;
        Object.keys(this.state['user']).map((s, i) => {
            if (!Object.values(this.state['user'])[i]) {
                errorMsg[s] = ` ${s.toUpperCase()} should not be empty`;
                errorMsg[s.concat('Valid')] = false;
                formStatus = false
            } else {
                const patt = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
                const value = Object.values(this.state['user'])[i];
                if (s === 'password' && value.length <= 4) {
                    errorMsg[
                        s
                        ] = `${s.toUpperCase()} length should be equal or greater than 6`;
                    errorMsg[s.concat('Valid')] = false;
                    formStatus = false
                } else if (
                    s === 'username' &&
                    value.includes('@') &&
                    !value.match(patt)
                ) {
                    errorMsg[s] = `Not a valid ${s.toUpperCase()}/EMAIL `;
                    errorMsg[s.concat('Valid')] = false;
                    formStatus = false
                }
            }
            return ''
        });
        //this.setFormStatus(formStatus)
        this.setTheState('errorMsg', errorMsg);
        return formStatus
    };

    setErrorMessage = submitErrorMsg => {
        submitErrorMsg && this.setState({submitErrorMsg})
    };

    onSubmitFormHandler = async e => {
        e.preventDefault();
        this.setState({submitErrorMsg: ''});
        let isFormValid = this.checkFormSubmitIsValid();
        let submitErrorMsg = '';
        if (isFormValid) {
            submitErrorMsg = await this.props.onSubmitHandler(this.state.user)
            if (submitErrorMsg)
                this.setErrorMessage(submitErrorMsg);
        }
    };

    render() {
        const {user, errorMsg} = this.state;
        return (
            <>
                <div className="header-login">
                    <div className="inner-header flex">
                        <Container className="container-login">
                            <Row>
                                <Col md={{span: 6, offset: 3}} className="login-right">
                                    <div className="login-wrapper">
                                        <div className="login-header">
                                            <Image src={logo} className="logo-image"/>
                                            {/* <h2 style={{color: '#444444', textAlign: 'center'}}>
                        cogentEMR
                      </h2> */}
                                        </div>

                                        <Form className="login-form">

                                            <CHybridInput
                                                id="hospitalCode"
                                                name="hospitalCode"
                                                placeholder="Hospital Code"
                                                value={user.hospitalCode}
                                                onChange={this.onChangeHandler}
                                            />

                                            <CHybridInput
                                                id="username"
                                                name="username"
                                                placeholder="Username"
                                                value={user.username}
                                                onChange={this.onChangeHandler}
                                                isInvalid={!errorMsg.usernameValid}
                                                errorMsg={errorMsg.username}
                                            />

                                            <CHybridPassword
                                                id="password"
                                                placeholder="Password"
                                                name="password"
                                                value={user.password}
                                                isInvalid={!errorMsg.passwordValid}
                                                errorMsg={errorMsg.password}
                                                onChange={this.onChangeHandler}
                                                avoidDefaultValidation={true}
                                            />

                                            {/*<CHybridInput*/}
                                            {/*    id="password"*/}
                                            {/*    placeholder="Password"*/}
                                            {/*    type="password"*/}
                                            {/*    name="password"*/}
                                            {/*    onChange={this.onChangeHandler}*/}
                                            {/*/>*/}
                                            <p className="error">{this.state.submitErrorMsg}</p>
                                            <a href="#/forgotPassword">Forgot Password!</a>
                                            <br></br>

                                            <Button
                                                variant="primary"
                                                type="submit"
                                                onClick={this.onSubmitFormHandler}
                                            >
                                                Login
                                            </Button>
                                        </Form>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>

                    <div>
                        <svg
                            className="waves"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 24 150 28"
                            preserveAspectRatio="none"
                            shapeRendering="auto"
                        >
                            <defs>
                                <path
                                    id="gentle-wave"
                                    d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                                />
                            </defs>
                            <g className="parallax">
                                <use
                                    xlinkHref="#gentle-wave"
                                    x="48"
                                    y="0"
                                    fill="rgba(255,255,255,0.7"
                                />
                                <use
                                    xlinkHref="#gentle-wave"
                                    x="48"
                                    y="3"
                                    fill="rgba(255,255,255,0.5)"
                                />
                                <use
                                    xlinkHref="#gentle-wave"
                                    x="48"
                                    y="5"
                                    fill="rgba(255,255,255,0.3)"
                                />
                                <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff"/>
                            </g>
                        </svg>
                    </div>
                </div>

                <div className="content-login flex">
                    <img src={logoCogent} className="company-logo"/>
                    <p>Powered by Cogent Health (P) Ltd</p>
                </div>
            </>
        )
    }
}

export default ClientLogin
