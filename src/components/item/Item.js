import React from "react";
import {PlusOutlined} from '@ant-design/icons'
import PropTypes from "prop-types";
import "antd/dist/antd.css"
import "./Item.css"
import {Button, message} from "antd";
import axios from "axios";
import {urls} from "../../utils/urls";


class Item extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        };

        this.addToChart = async () => {
            try {
                this.setState({isLoading: true});
                const response = await axios.post(urls.postCart(), {id: this.props.itemData.id});
                if (response.status === 200) {
                    message.success("添加订单成功")
                } else {
                    message.error("添加订单失败，请重试")
                }
            } catch (e){
                message.error("与服务器通讯失败")
            }
            this.setState({isLoading: false})
        }

    }

    render() {
        return (
            <div className='item-container'>
                <div className='image-container'>
                    <img src={this.props.itemData.imageUrl} alt={this.props.itemData.name + '照片'}/>
                </div>
                <h3>{this.props.itemData.name}</h3>
                <p>单价：{this.props.itemData.price}元/{this.props.itemData.unit}
                    &nbsp;&nbsp;
                    <Button shape='circle' icon={<PlusOutlined />} loading={this.state.isLoading} onClick={this.addToChart} />
                </p>
            </div>
        );
    }
}

Item.propTypes = {
    itemData: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        unit: PropTypes.string,
        imageUrl: PropTypes.string
    })
};

export default Item;
