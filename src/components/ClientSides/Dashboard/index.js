import React from 'react'
import { Row, Col, Avatar, Form, Input, Radio, Select, Button, Divider } from "antd";
import "antd/dist/antd.css";
import { _validnumber } from '../../helpers/index';
import { url } from '../../../API/url'
import { token } from '../../../API/token'
import "./styles.css";
import Header from '../Header/index'

const { TextArea } = Input;
const { Option } = Select;

export default class DashBoard extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            user:{}
        };
    }

    componentDidMount(){
        this.fetchData()
    }

    fetchData = () => {
        if (localStorage.getItem("loginGoogle")) {
            this.setState({user: JSON.parse(localStorage.getItem("loginGoogle"))})
        }
    }

    render() {
        const {user} = this.state
        return (
            <div>
                <div>
                    <Header />
                </div>
                <div style={{textAlign:'center'}}>
                    {<h2>Xin chào {user.familyName} {user.givenName}</h2>}
                </div>
            </div>
        )
    }
}