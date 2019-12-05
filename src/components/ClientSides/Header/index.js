import React from 'react'
import { Row, Col, Form, Input, Radio, Select, Button, Divider, Menu, Dropdown, Icon, Modal, List, Avatar } from "antd";
import "antd/dist/antd.css";
import { _validnumber } from '../../helpers/index';
import "./styles.css";
import { withRouter } from "react-router-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];

const menu = (
    <Menu>
        <Menu.Item>
            <span className="nav-span">
                <Icon style={{ color: '#0984E3' }} type="user" />
                <Link style={{ color: 'rgba(0,0,0,0.65)' }} to="/login">Profile</Link>
            </span>
        </Menu.Item>
        <Menu.Item>
            <span className="nav-span">
                <Icon style={{ color: 'red' }} type="close" />
                <Link style={{ color: 'rgba(0,0,0,0.65)' }} to="/login">Logout</Link>
            </span>
        </Menu.Item>
    </Menu>
);

class Header extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            user: {},
            visible: false
        };
    }

    showModal = () => {
        if ((localStorage.getItem("loginGoogle")) || (localStorage.getItem("login"))) {
            this.setState({
                visible: true,
            });
        }
        else {
            this.props.history.push("/login");
        }
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    componentDidMount() {
        if (localStorage.getItem("loginGoogle")) {
            console.log('loginGoogle', JSON.parse(localStorage.getItem("loginGoogle")))
            this.setState({
                user: JSON.parse(localStorage.getItem("loginGoogle"))
            })
        }
        if (localStorage.getItem("login")) {
            console.log('login', JSON.parse(localStorage.getItem("login")))
            this.setState({
                user: JSON.parse(localStorage.getItem("login"))
            })
        }
    }

    handleInc = () => {
        alert('tăng')
    }

    handleDec = () => {
        alert('giảm')
    }

    render() {
        const { user } = this.state
        return (
            <div className="container">
                <div className="main-container">
                    <Row>
                        <Col span={2}>

                        </Col>
                        <Col span={14}>
                            <div className="container-left">
                                <img width="40px" src="data:image/png;base64,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" />
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className="container-right">
                                {(localStorage.getItem("loginGoogle") || localStorage.getItem("login")) && <Dropdown overlay={menu} placement="bottomRight">
                                    <img className="img" src={user.imageUrl} />
                                </Dropdown>}
                                {localStorage.getItem("loginGoogle") && <p style={{ color: 'white', marginTop: '10px' }}>{user.name} </p>}
                                {localStorage.getItem("login") && <p style={{ color: 'white', marginTop: '10px' }}>Chào bạn </p>}
                                {!localStorage.getItem("loginGoogle") && !localStorage.getItem("login") && <Link style={{ color: 'white' }} to="/login">Đăng nhập</Link>}
                                <Button onClick={this.showModal} style={{ marginLeft: '5px' }} shape="circle" icon="shopping-cart" />
                            </div>
                        </Col>
                    </Row>
                </div>
                <Modal
                    title="Giỏ hàng của bạn"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    {/* ListGioHang */}
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPRmetB7XjxiLc6afBwXEHAzGr1GtgWkoV_Zvgo6kg1RhApBqIEg&s" />}
                                    title={<a href="https://ant.design">{item.title}</a>}
                                    description="Ant Design, a design"
                                />
                                <div style={{ display: 'flex', flexDirection: 'row',alignItems:'center' }}>
                                    <Icon onClick={this.handleDec} type="minus" style={{color:"#FF4D4F",cursor:'pointer'}} />&nbsp;
                                    <span><b>1</b></span>&nbsp;
                                    <Icon onClick={this.handleInc} style={{color:"#1890FF",cursor:'pointer'}} type="plus" />                                 
                                </div>
                            </List.Item>
                        )}
                    />
                    {/* end ListGioHang */}
                </Modal>
            </div>
        )
    }
}

export default withRouter(Header)