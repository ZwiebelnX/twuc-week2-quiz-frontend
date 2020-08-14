import {Menu} from "antd";
import React from "react";
import 'antd/dist/antd.css'
import './ShopHeader.css'
import {UnorderedListOutlined, ShoppingCartOutlined, PlusOutlined} from '@ant-design/icons';
import {NavLink} from "react-router-dom";

class ShopHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    render() {
        return (
            <div>
                <Menu mode='horizontal' theme='dark' className='menu'>
                    <Menu.Item key='list' icon={<UnorderedListOutlined />}><NavLink to='/list'>商品</NavLink></Menu.Item>
                    <Menu.Item key='cart' icon={<ShoppingCartOutlined />}><NavLink to='/cart'>订单</NavLink></Menu.Item>
                    <Menu.Item key='add' icon={<PlusOutlined />}><NavLink to='/add'>添加</NavLink></Menu.Item>
                </Menu>
                <span className='logo'>Chan's Shop</span>
            </div>
        );
    }
}

ShopHeader.propTypes = {};

export default ShopHeader;
