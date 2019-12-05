

import React from "react";
import { Row, Col, Avatar, Form, Input, Radio, Select, Button, Divider } from "antd";
import "antd/dist/antd.css";
import { token } from '../../../API/token'
import { url } from '../../../API/url'
import styles from './styles';
import "./styles.css";
import { _validemail } from '../../helpers/index'

import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            email: '',
            password: ''
        }
    }

    componentDidMount() {
        localStorage.removeItem("loginGoogle");
        localStorage.removeItem("login");
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

    handleChangeEmail = (event) => { this.setState({ ...this.state, email: event.target.value }) }
    handleChangePassword = (event) => { this.setState({ ...this.state, password: event.target.value }) }

    handleSubmit = () => {
        const { email, password } = this.state
        let loginObj = {
            "user":{
                "email":email,
                "password": password
            }
        }

        if (email !== '' && password !== '' && _validemail(email)) {
            return fetch(url + "users/login", {
                method: 'post',
                body: JSON.stringify(loginObj),
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                }
            })
                .then(response => {
                    response.json()
                    console.log('response', response)
                    if(response.status === 422){
                        alert('email or password invalid')
                    }
                    else if (response.status === 200) {
                        localStorage.setItem("login", JSON.stringify(loginObj.user.email))
                        alert('Đăng nhập thành công')
                        this.props.history.push('/')
                    }
                })
        }
        else {
            alert('Bạn phải điền đầy đủ thông tin')
        }
    }

    render() {
        const { email, password } = this.state
        return (
            <div>
                <h2 style={{ textAlign: "center", marginLeft: '5vw' }}>Login</h2>
                <Divider></Divider>
                <Row>
                    <Col span={6}>

                    </Col>
                    <Col span={12}>
                        <Form labelCol={{ span: 6 }}>
                            <Form.Item style={styles.info} label="Email">
                                <Input className="input" onChange={this.handleChangeEmail} value={email} />
                            </Form.Item>
                            {/* {email === '' && <span style={{ marginLeft: '12vw', color: 'red' }}>Email is required</span>} */}
                             {email !== '' && !_validemail(email) && <span style={{ marginLeft: '12vw', color: 'red' }}>Email is not format</span>}
                            <Form.Item style={styles.info} label="Password">
                                <Input className="input" type="password" onChange={this.handleChangePassword} value={password} />
                            </Form.Item>
                            {/* {password === '' && <span style={{ marginLeft: '12vw', color: 'red' }}>Password is required</span>} */}
                            <Form.Item style={styles.info} label=" ">
                                <Button style={styles.btnLogin} onClick={this.handleSubmit} type="primary">Đăng nhập</Button>
                            </Form.Item>
                        </Form>
                        <div>
                            <div style={styles.btnRegister}>
                                <Button onClick={this.handleRegister} type="link">Đăng ký ngay</Button>
                            </div>
                            <div>
                                <p style={{ textAlign: 'center', marginLeft: '6vw', marginTop: '30px' }}>Or sign up using</p>
                            </div>
                        </div>
                        <div style={styles.colButton}>
                            <GoogleLogin
                                clientId="450425733304-0etv6pg3mbiq2bvmje5ldcd1uros0u3h.apps.googleusercontent.com"
                                render={renderProps => (
                                    <Button style={styles.btnLoginGmail} shape="circle" icon="google" type="danger" onClick={renderProps.onClick} disabled={renderProps.disabled}></Button>
                                )}
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />

                            {/* 589858161579560 */}
                        </div>
                    </Col>

                    {/* <GoogleLogout
                        clientId="450425733304-0etv6pg3mbiq2bvmje5ldcd1uros0u3h.apps.googleusercontent.com"
                        render={renderProps => (
                            <Button style={styles.btnCancel} type="primary" onClick={renderProps.onClick} disabled={renderProps.disabled}>Logout google</Button>
                        )}
                        onLogoutSuccess={this.logout}
                    >
                    </GoogleLogout> */}
                </Row>
            </div >

        )
    }
}
