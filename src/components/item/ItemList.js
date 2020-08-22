import React from "react";
import Item from "./Item";
import axios from 'axios';
import {urls} from '../../utils/urls'
import {List, message, Spin} from "antd";
import './ItemList.css'

class ItemList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            totalPage: 1,
            itemListData: []
        };

        this.fetchData = async () => {
            this.setState({isLoading: true})
            try {
                const response = await axios.get(urls.getItem());
                if (response.status === 200) {
                    this.setState({itemListData: response.data.data});
                } else {
                    message.error('请求出错，请重试');
                }
            } catch (e){
                message.error('服务器通讯错误')
            }
            this.setState({isLoading: false});
        }

    }

    setLoading(status){
        this.setState({isLoading:status})
    }


    componentDidMount() {
        this.fetchData().then()
    }

    render() {
        return (
            <div className='item-list-container'>
                <Spin spinning={this.state.isLoading}>
                    <List grid={{column: 4}}
                          dataSource={this.state.itemListData}
                          locate={{emptyText: '暂无商品'}}
                          renderItem={item => (<Item itemData={item} setLoading={this.setLoading}/>)}
                    />
                </Spin>
            </div>
        );
    }
}

ItemList.propTypes = {};

export default ItemList;
