import logo200Image from 'assets/img/logo/logo_npr_trans.png';
import PropTypes from 'prop-types';
import React from 'react';
import {Button, Form, FormGroup, Input, Label, Alert} from 'reactstrap';

var Q = require('q');

class AuthForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            alertVisible: false,
            errorMsg: '',
            buttonText:"Login"
        }
        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss() {
        this.setState({
            alertVisible: false
        });
    }

    handleEmail = event => {

        this.setState({
            email: event.target.value,
            alertVisible: false,
        });

    }

    handlePassword = event => {
        this.setState({
            password: event.target.value,
            alertVisible: false,
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        let requestData = {
            email: this.state.email,
            password: this.state.password
        };

        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRegex.test(requestData.email) == false) {
            this.setState({
                alertVisible: true,
                errorMsg: 'Email format not correct'
            });
        }
        else {
            let passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
            if (/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{1,16}$/.test(requestData.password) == false) {
                this.setState({
                    alertVisible: true,
                    errorMsg: "doesn't contain at least a number"
                });
            }
            else if (/^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{1,16}$/.test(requestData.password) == false) {
                this.setState({
                    alertVisible: true,
                    errorMsg: "doesn't contain at least a special character"
                });
            }
            else if (passRegex.test(requestData.password) == false) {
                this.setState({
                    alertVisible: true,
                    errorMsg: 'Password should be of at least 8 character'
                });
            }
            else {
                this.setState({
                    buttonText:"loading......"
                })
                postData("http://localhost:8080/login", requestData)
                    .then((response) => {
                        if (response.headers.has("authorization")) {
                            localStorage.setItem("keyId", response.headers.get("authorization"));
                            this.props.onSubmitted();
                        }
                        else {
                            this.setState({
                                alertVisible: true,
                                errorMsg: 'Username or Password Incorrect',
                                buttonText:"Login"
                            });
                        }
                    })
                    .catch((err) => {
                        this.setState({
                            alertVisible: true,
                            errorMsg: 'Network Connection not available'
                        });
                    });
            }


        }

    };

    render() {
        const {
            showLogo,
            usernameLabel,
            usernameInputProps,
            passwordLabel,
            passwordInputProps,
            children,
            onLogoClick,
        } = this.props;

        return (
            <div>
                <Alert color="danger" isOpen={this.state.alertVisible} toggle={this.onDismiss}>
                    {this.state.errorMsg}
                </Alert>
                <Form onSubmit={this.handleSubmit}>
                    {showLogo && (
                        <div className="text-center pb-4">
                            <img
                                src={logo200Image}
                                className="rounded"
                                style={{width: 60, height: 50, cursor: 'pointer'}}
                                alt="logo"
                                onClick={onLogoClick}
                            />
                        </div>
                    )}
                    <FormGroup>
                        <Label for={usernameLabel}>{usernameLabel}</Label>
                        <Input {...usernameInputProps} value={this.state.email} onChange={this.handleEmail}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for={passwordLabel}>{passwordLabel}</Label>
                        <Input {...passwordInputProps} value={this.state.password} onChange={this.handlePassword}/>
                    </FormGroup>
                    <hr/>
                    <Button
                        size="lg"
                        className="bg-gradient-theme-left border-0"
                        block
                        onClick={this.handleSubmit}>
                        {this.state.buttonText}
                    </Button>
                    {children}
                </Form>
            </div>
        );
    }
}

AuthForm.propTypes = {
    showLogo: PropTypes.bool,
    usernameLabel: PropTypes.string,
    usernameInputProps: PropTypes.object,
    passwordLabel: PropTypes.string,
    passwordInputProps: PropTypes.object,
    onLogoClick: PropTypes.func,
};

AuthForm.defaultProps = {
    showLogo: true,
    usernameLabel: 'Email',
    usernameInputProps: {
        id: "TooltipExample",
        type: 'email',
        placeholder: 'your@email.com'
    },
    passwordLabel: 'Password',
    passwordInputProps: {
        type: 'password',
        placeholder: 'your password',
        invalid: false
    },
    onLogoClick: () => {
        this.props.onLogoClick();
    },
};

function postData(url, data) {
    var defer = Q.defer();
    fetch(url, {
        method: 'post',
        mode: "cors",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    }).then((response) => {
        defer.resolve(response);
    }).catch((err) => {
        defer.reject(err);
    });

    return defer.promise;
}

export default AuthForm;
