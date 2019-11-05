import React from 'react'
import { Row, Col, Avatar, Form, Input, Radio, Select, Button, Divider } from "antd";
import moment from 'moment';
import "antd/dist/antd.css";
import styles from './styles';
import { _validnumber } from '../../../helpers/index';
import { url } from '../../../../API/url'
import { token } from '../../../../API/token'
import "./styles.css";

const { TextArea } = Input;
const { Option } = Select;

export default class EditBook extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            book: {
                name: "",
                title: "",
                image: "",
                price: "",
                status: "",
                quantity: "",
                comment: "",
                bookList: []
            },
            categories: []
        };
    }

    handleChangeName = (event) => { this.setState({ book: { ...this.state.book, name: event.target.value } }) }
    handleChangeTitle = (event) => { this.setState({ book: { ...this.state.book, title: event.target.value } }) }
    handleChangeImage = (event) => { this.setState({ book: { ...this.state.book, image: event.target.value } }) }
    handleChangePrice = (event) => { this.setState({ book: { ...this.state.book, price: event.target.value } }) }
    handleChangeQuantity = (event) => { this.setState({ book: { ...this.state.book, quantity: event.target.value } }) }
    handleChangeBookList = (value) => { this.setState({ book: { ...this.state.book, bookList: value } }) }
    handleChangeStatus = (event) => { this.setState({ book: { ...this.state.book, status: event.target.value } }) }
    handleChangeComment = (event) => { this.setState({ book: { ...this.state.book, comment: event.target.value } }) }

    componentDidMount() {
        this.fetchSelectedBook()
        this.fetchCategories()
    }


    //mapping categories to input select
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


    //mapping current data to input
    fetchSelectedBook = () => {
        const selectedBook = this.props.history.location.state.props.selectedBook
        console.log('selectedBook', selectedBook)
        this.setState({
            book: {
                name: selectedBook.name,
                title: selectedBook.title,
                image: selectedBook.image,
                price: selectedBook.price,
                status: selectedBook.status,
                quantity: selectedBook.quantity,
                comment: selectedBook.comment,
                bookList: selectedBook.bookList[0]._id
            }
        })
    }

    handleCancel = () => {
        this.props.history.push('/books')
    }

    handleSubmit = () => {
        const { book } = this.state
        const selectedBook = this.props.history.location.state.props.selectedBook
        if (book.name !== '') {
            fetch(url + 'books/' + selectedBook._id, {
                method: 'put',
                body: JSON.stringify(book),
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                }
            })
                .then(response => {
                    response.json()
                    if (response.status == 200) {
                        alert('Sửa thành công')
                        this.props.history.push('/books')
                    }
                })
        }
        else {
            alert('Vui lòng nhập đầy đủ thông tin')
        }
    }

    render() {
        const { categories, book: { name, title, image, price, status, quantity, comment, bookList } } = this.state
        const categoryList = categories.map((data, index) => {
            return <Option key={index} value={data._id}>{data.name}</Option>
        })
        return (
            <div>
                <h2>Sửa </h2>
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
                                    style={{ width: '30vw' }}
                                    showSearch
                                    placeholder="Chọn danh mục sách"
                                    optionFilterProp="children"
                                    value={bookList}
                                    onChange={this.handleChangeBookList}
                                >
                                    {categoryList}
                                </Select>
                            </Form.Item>
                            <Form.Item style={styles.info} label="Ghi chú">
                                <TextArea className="input" onChange={this.handleChangeComment} value={comment} rows={4} />
                            </Form.Item>
                            <Form.Item style={styles.info} label="Trạng thái">
                                <Radio.Group onChange={this.handleChangeStatus} value={status}>
                                    <Radio value="active">Active</Radio>
                                    <Radio value="deactive">Deactive</Radio>
                                </Radio.Group>
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
