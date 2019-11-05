

import React from "react";
import { Row, Col, Form, Input, Button, Divider, DatePicker, Modal } from "antd";
import styles from './styles';
import "antd/dist/antd.css";
import { _validnumber, _validemail } from '../../helpers/index';
import { url } from '../../../API/url'
import "./styles.css";
import moment from 'moment';

export default class Register extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            user: {
                username: "",
                password: "",
                email: "",
                image: "",
                dob: "",
            },
            passwordreInput: "",
            visible: false
        };
    }

    handleChangeusername = (event) => { this.setState({ user: { ...this.state.user, username: event.target.value } }) }
    handleChangeemail = (event) => { this.setState({ user: { ...this.state.user, email: event.target.value } }) }
    handleChangeImage = (event) => { this.setState({ user: { ...this.state.user, image: event.target.value } }) }
    handleChangepassword = (event) => { this.setState({ user: { ...this.state.user, password: event.target.value } }) }
    handleChangedob = (value) => { this.setState({ user: { ...this.state.user, dob: value } }) }
    handleChangepasswordreInput = (event) => { this.setState({ passwordreInput: event.target.value }) }

    handleCancel = () => {
        this.props.history.push("/login")
    }

    handleSubmit = () => {
        const { user: { username, email, password, dob, image } } = this.state
        if (username !== '' && email !== '' && _validemail(email) && password !== '') {
            let userss = {
                "user": {
                    "username": username,
                    "email": email,
                    "password": password,
                    "image": image,
                    "roll": "user",
                    "dob": dob,
                    "active": "deactive"
                }
            }
            return fetch(url + "users", {
                method: 'post',
                body: JSON.stringify(userss),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => {
                    response.json()
                    console.log('response', response)
                    if (response.status === 400) {
                        alert("Email hoặc Username đã tồn tại")
                    }
                    if (response.status === 200) {
                        this.showModal()
                    }
                })
        }
        else {
            alert('Bạn phải điền đầy đủ thông tin')
        }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleModalCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    componentDidMount() {

    }

    render() {
        const { passwordreInput, user: { username, email, image, dob, password } } = this.state
        const dateFormat = 'DD-MM-YYYY';
        return (
            <div>
                <h2>Đăng ký</h2>
                <Divider></Divider>
                <Row>
                    <Col span={6}>

                    </Col>
                    <Col span={12}>
                        <Form labelCol={{ span: 6 }}>
                            <Form.Item style={styles.info} label="Username">
                                <Input className="input" onChange={this.handleChangeusername} value={username} />
                            </Form.Item>
                            {username === '' && <span style={{ marginLeft: '12vw', color: 'red' }}>Username is required</span>}
                            <Form.Item style={styles.info} label="Email">
                                <Input className="input" onChange={this.handleChangeemail} value={email} />
                            </Form.Item>
                            {email === '' && <span style={{ marginLeft: '12vw', color: 'red' }}>email is required</span>}
                            {email !== '' && !_validemail(email) && <span style={{ marginLeft: '12vw', color: 'red' }}>email is not format</span>}
                            {/* {email !== '' && !_validemail(email) && <span style={{ marginLeft: '12vw', color: 'red' }}>email is not format</span>} */}
                            <Form.Item style={styles.info} label="Avatar">
                                <Input className="input" onChange={this.handleChangeImage} value={image} />
                            </Form.Item>
                            <Form.Item style={styles.info} label="DoB">
                                <DatePicker className="input" onChange={this.handleChangedob} value={moment(dob, dateFormat)} format={dateFormat} />
                            </Form.Item>
                            <Form.Item style={styles.info} label="Password">
                                <Input type="password" className="input" onChange={this.handleChangepassword} value={password} />
                            </Form.Item>
                            {password === '' && <span style={{ marginLeft: '12vw', color: 'red' }}>password is required</span>}
                            <Form.Item style={styles.info} label="Nhập lại Password">
                                <Input type="password" className="input" onChange={this.handleChangepasswordreInput} value={passwordreInput} />
                            </Form.Item>
                            {passwordreInput === '' && <span style={{ marginLeft: '12vw', color: 'red' }}>password is required</span>}
                            {passwordreInput !== '' && password !== '' && (passwordreInput !== password) && <span style={{ marginLeft: '12vw', color: 'red' }}>password không khớp</span>}
                        </Form>
                        <Col span={21} style={styles.colButton}>
                            <Button onClick={this.handleSubmit} type="primary">Save</Button>
                            <Button onClick={this.handleCancel} style={styles.btnCancel} type="danger">Cancel</Button>
                        </Col>
                    </Col>
                </Row>
                <Modal
                    title="Đăng ký thành công"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleModalCancel}
                >
                    <h4>Vui lòng kiểm tra email để kick hoạt tài khoản</h4>
                </Modal>
            </div >
        )
    }
}
