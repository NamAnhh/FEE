

import React from "react";
import { Row, Col, Avatar, Form, Input, Radio, Select, Button, Divider } from "antd";
import "antd/dist/antd.css";
import { token } from '../../../API/token'
import { url } from '../../../API/url'
import styles from './styles';
import "./styles.css";

import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';

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
                .then(localStorage.setItem("loginGoogle",JSON.stringify(response.profileObj)))
                .then(this.props.history.push("/"))
        }
    }

    //send email
    handleSendMail = () => {
        let params = {
            "user": {
                "username": "namanh511",
                "email": "namanhng2605@gmail.com",
                "password": "1"
            }

        }

        return fetch(url + "users", {
            method: 'post',
            body: JSON.stringify(params),
            headers: {
                "Authorization": token,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => console.log("res", res))
    }

    //go to register
    handleRegister = () => {
        this.props.history.push("/register")
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
                            <Button onClick={this.handleSendMail} style={styles.btnCancel} type="danger">Send Mail</Button>
                            <GoogleLogin
                                clientId="450425733304-63045qg18t40ol71eb6insc1bodh38ih.apps.googleusercontent.com"
                                render={renderProps => (
                                    <Button style={styles.btnCancel} type="primary" onClick={renderProps.onClick} disabled={renderProps.disabled}>Login google</Button>
                                )}
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                            <GoogleLogout
                                clientId="450425733304-63045qg18t40ol71eb6insc1bodh38ih.apps.googleusercontent.com"
                                render={renderProps => (
                                    <Button style={styles.btnCancel} type="primary" onClick={renderProps.onClick} disabled={renderProps.disabled}>Logout google</Button>
                                )}
                                onLogoutSuccess={this.logout}
                            >
                            </GoogleLogout>
                        </Col>
                    </Col>
                </Row>
            </div >

        )
    }
}
