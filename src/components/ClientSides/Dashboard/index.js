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

export default class DashBoard extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            books: []
        };
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = () => {
        fetch(url + 'books', {
            method: 'get',
            headers: {
                "Authorization": token,
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => (
                data.data.forEach(x => {
                    x.categoryId = x.bookList[0]._id
                }),
                this.setState({
                    books: data.data,
                }),
                console.log('getBook API ', this.state.books)
            ))
    }

    _gotoCart = (id) =>{
        alert(`Book id: ${id}`)
    }

    render() {
        const { books } = this.state
        const listItems = books.map((x) =>
            <Col style={styles.col} span={6} key={x._id}>
                <Card
                    hoverable
                    onClick={() => this._gotoCart(x._id)}
                    style={{ width: 248, height: 356 }}
                    cover={<img alt="example" height="200px" width="200px" src={x.image} />}
                >
                    <Meta title={x.name} description={x.price.concat(",000 đ")} />
                    <Button style={{ margin: '25px 0 0 5px',  }} type="primary" >Add to cart</Button>
                </Card>
            </Col>
        );
        return (
            <div style={{backgroundColor:"#EDEEF2"}}>
                <div>
                    <Header />
                </div>
                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <Row>
                        {listItems}
                    </Row>
                </div>
            </div>
        )
    }
}