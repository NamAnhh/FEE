

import React from "react";
import { Table, Button, Icon, Input, Modal } from 'antd';
import "antd/dist/antd.css";
import styles from './styles'
import { token } from '../../../API/token'
import { url } from '../../../API/url'

import ReactExport from "react-export-excel";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default class Book extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: '',
            books: [],
            visible: false
        }
    }

    columns = [
        {
            title: 'Tên sách',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Tên loại sách',
            dataIndex: 'bookList[0].name',
            key: 'bookList',
        },
        {
            title: 'Giá bán',
            dataIndex: 'price',
            key: 'price',
            render: (text, data) => (
                <div>
                    {data.price.concat(".000 đ")}
                </div>
            ),
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            width: '10%'
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            width: '8%',
            render: (text, data) => (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {data.status == "active" ? <button style={styles.btnActive}>Active</button> : <button style={styles.btnDeactive}>Deactive</button>}
                </div>

            ),
        },
        {
            title: 'Tính năng',
            dataIndex: 'function',
            width: '8%',
            render: (text, data) => (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <a onClick={() => this.gotoEditBook(data)}><Icon type="edit" /></a>|
                    <a onClick={() => this.showModal(data._id)}><Icon style={{ color: '#FA541C' }} type="delete" /> </a>
                </div>
            )
        }
    ];

    componentDidMount() {
        this.fetchData();
    }

    gotoAddBook = () => {
        this.props.history.push('/addBooks')
    }

    handleChangeSearch = e => {
        this.setState({
            searchText: e.target.value
        });
    }

    handleSubmitSearch = () => {
        let params = {
            "searchText": this.state.searchText
        }

        return fetch(url + "/books/search", {
            method: 'post',
            body: JSON.stringify(params),
            headers: {
                "Authorization": token,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => (
                this.setState({
                    books: data.data,
                }),
                console.log('getBookSearch API ', this.state.books)
            ))
    }


    gotoEditBook = (selectedBook) => {
        console.log('selectedBook', selectedBook)

        this.props.history.push({
            pathname: '/editBooks',
            state: {
                props: { selectedBook: selectedBook}
            }
        });
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
                this.setState({
                    books: data.data,
                }),
                console.log('getBook API ', this.state.books)
            ))
    }

    _bookId = ''
    showModal = (bookId) => {
        this._bookId = bookId
        this.setState({
            visible: true,
        });
    };

    handleDelete = (bookId) => {
        let params = {
            "_id": this._bookId
        }
        return fetch(url + "books/" + this._bookId, {
            method: 'delete',
            body: JSON.stringify(params),
            headers: {
                "Authorization": token,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(this.setState({
                visible: false
            }))
            .then(this.fetchData())
    };

    handlemodalCancel = e => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const { searchText, books } = this.state
        return (
            <div>
                <div>
                    <h1 style={{ textAlign: 'center' }}>BOOK LIST</h1>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <div>
                        <Button style={{ marginRight: '10px' }} onClick={this.gotoAddBook} type="primary">Thêm Mới</Button>
                        <ExcelFile filename="excelBook" element={<Button type="primary">Xuất file excel</Button>}> 
                            <ExcelSheet data={books} name="Book" >
                                <ExcelColumn label="Id" value="_id"/>
                                <ExcelColumn label="Tên sách" value="name" />
                                <ExcelColumn label="Tiêu đề" value="title" />
                                <ExcelColumn label="Tên loại sách" value="bookList[0].name" />
                                <ExcelColumn label="Giá bán" value="price" />
                                <ExcelColumn label="Số lượng" value="quantity" />
                                <ExcelColumn label="Trạng thái" value="status" />
                            </ExcelSheet>
                        </ExcelFile>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Input placeholder="Tìm kiếm" value={searchText} onChange={this.handleChangeSearch} />
                        <Button onClick={this.handleSubmitSearch} style={{ marginLeft: '5px' }} type="primary" shape="circle" icon="search" />
                    </div>
                </div>
                <div>
                    <Table bordered columns={this.columns} dataSource={books} />
                </div>

                <Modal
                    title="Bạn có chắc chắn muốn xóa không?"
                    visible={this.state.visible}
                    onOk={this.handleDelete}
                    onCancel={this.handlemodalCancel}
                >
                </Modal>
            </div>
        )
    }
}
