

import React from "react";
import { Row, Col, Avatar, Form, Input, Radio, Select, Button, Divider } from "antd";
import "antd/dist/antd.css";
import { token } from '../../../API/token'
import { url } from '../../../API/url'
import styles from './styles';
import "./styles.css";

import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import { FacebookProvider, LoginButton } from 'react-facebook';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false
        }
    }

    componentDidMount() {
        localStorage.removeItem("loginGoogle");
    }

    //show modal
    _bookId = ''
    showModal = (bookId) => {
        this._bookId = bookId
        this.setState({
            visible: true,
        });
    };

    //modal btn cancel
    handlemodalCancel = e => {
        this.setState({
            visible: false,
        });
    };

    //login google
    responseGoogle = (response) => {
        console.log(response);
        if (!response.error) {
            let params = {
                "user": {
                    "email": response.profileObj.email,
                }
            }

            return fetch(url + "users/loginSocial", {
                method: 'post',
                body: JSON.stringify(params),
                headers: {
                    // "Authorization": token,
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(alert("Đăng nhập thành công"))
                .then(localStorage.setItem("loginGoogle", JSON.stringify(response.profileObj)))
                .then(this.props.history.push("/"))
        }
    }

    //send email
    handleSendMail = () => {
        this.props.history.push("/")
    }

    //go to register
    handleRegister = () => {
        this.props.history.push("/register")
    }

    responseFacebook(response) {
        console.log(response)
        let params = {
            "user": {
                "email": response.profile.email,
                "username": response.tokenDetail.userID,
                "image": response.profile.picture.data.url,
            }
        }

        return fetch(url + "users/loginSocial", {
            method: 'post',
            body: JSON.stringify(params),
            headers: {
                // "Authorization": token,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(localStorage.setItem("loginFB", JSON.stringify(response.profile)))
            .then(alert("Đăng nhập thành công"))
            .then(this.props.history.push("/"))
    }

    render() {
        const { searchText, books } = this.state
        return (
            <div>
                <h2>Login</h2>
                <Divider></Divider>
                <Row>
                    <Col span={6}>

                    </Col>
                    <Col span={12}>
                        <Form labelCol={{ span: 6 }}>
                            <Form.Item style={styles.info} label="Email">
                                <Input className="input" onChange={this.handleChangeName} value="a" />
                            </Form.Item>
                            {/* {name === '' && <span style={{ marginLeft: '12vw', color: 'red' }}>Name is required</span>}*/}
                            <Form.Item style={styles.info} label="Password">
                                <Input className="input" onChange={this.handleChangeName} value="a" />
                            </Form.Item>
                            {/* {name === '' && <span style={{ marginLeft: '12vw', color: 'red' }}>Name is required</span>}*/}
                        </Form>
                        <Col span={21} style={styles.colButton}>
                            <Button onClick={this.handleSubmit} type="primary">Đăng nhập</Button>
                            <Button onClick={this.handleSubmit} style={styles.btnCancel} type="primary">Đăng nhập google</Button>
                            <Button onClick={this.handleRegister} style={styles.btnCancel} type="danger">Đăng ký</Button>
                            <Button onClick={this.handleSendMail} style={styles.btnCancel} type="danger">Go To DashBoard</Button>
                            <GoogleLogin
                                clientId="450425733304-43cjhtfko4ag8m7sa4cna7h1n1d1ob8t.apps.googleusercontent.com"
                                render={renderProps => (
                                    <Button style={styles.btnCancel} type="primary" onClick={renderProps.onClick} disabled={renderProps.disabled}>Login google</Button>
                                )}
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                            <GoogleLogout
                                clientId="450425733304-43cjhtfko4ag8m7sa4cna7h1n1d1ob8t.apps.googleusercontent.com"
                                render={renderProps => (
                                    <Button style={styles.btnCancel} type="primary" onClick={renderProps.onClick} disabled={renderProps.disabled}>Logout google</Button>
                                )}
                                onLogoutSuccess={this.logout}
                            >
                            </GoogleLogout>
                            <FacebookProvider appId="589858161579560">
                                <LoginButton
                                    scope="email"
                                    onCompleted={this.responseFacebook}
                                    onError={this.handleError}
                                >
                                    <span>Login Facebook</span>
                                </LoginButton>
                            </FacebookProvider>
                            {/* 589858161579560 */}
                        </Col>
                    </Col>
                </Row>
            </div >

        )
    }
}
