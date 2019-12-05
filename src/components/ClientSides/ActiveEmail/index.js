import React from 'react'
import { Row, Col, Avatar, Form, Input, Radio, Select, Button, Divider, Card } from "antd";
import "antd/dist/antd.css";
import { _validnumber } from '../../helpers/index';
import { url } from '../../../API/url'
import { token } from '../../../API/token'
import Header from '../Header/index'
import styles from './styles'

const { TextArea } = Input;
const { Option } = Select;
const { Meta } = Card;

export default class ActiveEmail extends React.Component {

    constructor(props) {
        super(props)

        this.state = {

        };
    }

    componentDidMount() {
        console.log("active email", this.props.match.params.id)
    }

    handleActiveEmail = () => {
        let activeEmailObj = {
            "confirmEmail": this.props.match.params.id
        }

            fetch(url + "users/activeEmail", {
                method: 'put',
                body: JSON.stringify(activeEmailObj),
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                }
            })
                .then(response => {
                    response.json()
                    console.log('response', response)
                    if (response.status === 200) {
                        alert('Kích hoạt thành công')
                        this.props.history.push('/login')
                    }
                    else if (response.status === 400) {
                        alert('Kích hoạt thất bại')
                    }
                })
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleActiveEmail} type="link">Bấm vào đây để kick hoạt email</Button>
            </div>
        )
    }
}