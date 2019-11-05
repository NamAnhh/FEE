

import React from "react";
import { Row, Col, Form, Input, Button, Divider,Select } from "antd";
import styles from './styles';
import "antd/dist/antd.css";
import { _validnumber } from '../../../helpers/index';
import { url } from '../../../../API/url'
import { token } from '../../../../API/token'
import "./styles.css";

const { Option } = Select;

export default class Editbooks extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            book: {
                name: "",
                title: "",
                image: "",
                price: "",
                quantity: "",
                bookList: []
            },
            categories: [],
        };
    }

    handleChangeName = (event) => { this.setState({ book: { ...this.state.book, name: event.target.value } }) }
    handleChangeTitle = (event) => { this.setState({ book: { ...this.state.book, title: event.target.value } }) }
    handleChangeImage = (event) => { this.setState({ book: { ...this.state.book, image: event.target.value } }) }
    handleChangePrice = (event) => { this.setState({ book: { ...this.state.book, price: event.target.value } }) }
    handleChangeQuantity = (event) => { this.setState({ book: { ...this.state.book, quantity: event.target.value } }) }
    handleChangeBookList = (value) => { this.setState({ book: {...this.state.book, bookList: value } }) }

    handleCancel = () => {
        this.props.history.push('/books')
    }

    handleSubmit = () => {
        const { book: { name, price, quantity } } = this.state

        if (name !== '' && price !== '' && _validnumber(price) && quantity !== '' && _validnumber(quantity)) {
            return fetch(url + "/books/", {
                method: 'post',
                body: JSON.stringify(this.state.book),
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                }
            })
                .then(response => {
                    response.json()
                    console.log('response', response)
                    if (response.status === 200) {
                        alert('Thêm mới thành công')
                        this.props.history.push('/books')
                    }
                })
        }
        else {
            alert('Bạn phải điền đầy đủ thông tin')
        }
    }

    fetchCategories = () => {
        fetch(url + 'categories', {
            method: 'get',
            headers: {
                "Authorization": token,
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => (
                this.setState({
                    categories: data.data,
                }),
                console.log('get category API ', this.state.categories)
            ))
    }

    componentDidMount(){
        this.fetchCategories();
    }

    render() {
        const {categories, book: { name, title, image, price, quantity,bookList } } = this.state
        const categoryList = categories.map((data, index) => {
            return <Option key={index} value={data._id}>{data.name}</Option>
        })
        return (
            <div>
                <h2>Thêm Mới</h2>
                <Divider></Divider>
                <Row>
                    <Col span={6}>

                    </Col>
                    <Col span={12}>
                        <Form labelCol={{ span: 6 }}>
                            <Form.Item style={styles.info} label="Tên sách">
                                <Input className="input" onChange={this.handleChangeName} value={name} />
                            </Form.Item>
                            {name === '' && <span style={{ marginLeft: '12vw', color: 'red' }}>Name is required</span>}
                            <Form.Item style={styles.info} label="Tiêu đề">
                                <Input className="input" onChange={this.handleChangeTitle} value={title} />
                            </Form.Item>
                            <Form.Item style={styles.info} label="Ảnh">
                                <Input className="input" onChange={this.handleChangeImage} value={image} />
                            </Form.Item>
                            <Form.Item style={styles.info} label="Giá bán">
                                <Input className="input" onChange={this.handleChangePrice} value={price} />
                            </Form.Item>
                            {price === '' && <span style={{ marginLeft: '12vw', color: 'red' }}>Price is required</span>}
                            {price !== '' && !_validnumber(price) && <span style={{ marginLeft: '12vw', color: 'red' }}>Price is number</span>}
                            <Form.Item style={styles.info} label="Số lượng">
                                <Input className="input" onChange={this.handleChangeQuantity} value={quantity} />
                            </Form.Item>
                            {quantity === '' && <span style={{ marginLeft: '12vw', color: 'red' }}>Quantity is required</span>}
                            {quantity !== '' && !_validnumber(quantity) && <span style={{ marginLeft: '12vw', color: 'red' }}>Quantity is number</span>}
                            <Form.Item style={styles.info} label="Danh mục">
                                <Select
                                    style={{width:'30vw'}}
                                    showSearch
                                    placeholder="Chọn danh mục sách"
                                    optionFilterProp="children"
                                    value={bookList}
                                    onChange={this.handleChangeBookList}
                                >
                                    {categoryList}
                                </Select>
                            </Form.Item>
                        </Form>
                        <Col span={21} style={styles.colButton}>
                            <Button onClick={this.handleSubmit} type="primary">Save</Button>
                            <Button onClick={this.handleCancel} style={styles.btnCancel} type="danger">Cancel</Button>
                        </Col>
                    </Col>
                </Row>
            </div >
        )
    }
}
