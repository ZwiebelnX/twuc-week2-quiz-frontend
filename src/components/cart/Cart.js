import React from "react";
import {Button, message, Spin, Table} from "antd";
import './Cart.css'
import axios from "axios";
import {urls} from "../../utils/urls";

class Cart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cartData: [],
            isLoading: false
        }

        this.fetchData = async () => {
            this.setState({isLoading: true})
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
            this.setState({isLoading: false})
        }


        this.deleteItem = async (itemId) => {
            this.setState({isLoading: true})
            try {
                const response = await axios.delete(urls.deleteCartItem(),{data: {id: itemId}});
                if (response.status === 200) {
                    message.success('删除成功')
                    this.fetchData().then()
                } else {
                    message.error('订单删除失败，请稍后再试')
                }
            } catch (e){
                message.error('订单删除失败，请稍后再试')
                console.log(e)
            }
            this.setState({isLoading: false})

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
                    <Button type='danger' onClick={() => this.deleteItem(record.itemId)}>删除</Button>
                )
            }
        }

        ]
        return (
            <div className='cart-container'>
                <h1>商品列表</h1>
                <Spin spinning={this.state.isLoading}>
                    <Table
                        columns={columns}
                        locale={{emptyText: '暂无订单，返回商城页面继续购买'}}
                        dataSource={this.state.cartData}
                        rowKey={(record, index) => `item_${index}`}
                    >

                    </Table>
                </Spin>
            </div>
        );
    }
}

Cart.propTypes = {};

export default Cart;
