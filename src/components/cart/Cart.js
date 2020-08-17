import React from "react";
import {Button, message, Table} from "antd";
import './Cart.css'
import axios from "axios";
import {urls} from "../../utils/urls";

class Cart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cartData: []
        }

        this.fetchData = async () => {
            try {
                const response = await axios.get(urls.getCartList());
                if (response.status === 200) {
                    this.setState({cartData: response.data.data});
                } else {
                    message.error('获取订单信息错误，请重试')
                }
            } catch (e){
                message.error('与服务器通讯错误')
                console.log(e)
            }
        }
    }

    componentDidMount() {
        this.fetchData().then()
    }

    render() {
        const columns = [{
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            width: 100
        },{
            title: '价格',
            dataIndex: 'price',
            key: 'price',
            width: 80
        },{
            title: '单位',
            dataIndex: 'unit',
            key: 'unit',
            width: 40
        },{
            title: '数量',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 40
        },{
            title: '操作',
            key: 'action',
            width: 80,
            render: (text, record) => {
                return (
                    <Button type='danger'>删除</Button>
                )
            }
        }

        ]
        return (
            <div className='cart-container'>
                <h1>商品列表</h1>
                <Table
                    columns={columns}
                    dataSource={this.state.cartData}
                >

                </Table>
            </div>
        );
    }
}

Cart.propTypes = {};

export default Cart;
