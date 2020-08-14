import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css"
import "./Item.css"
import {Button} from "antd";


class Item extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    render() {
        return (
            <div className='item-container'>
                <div className='image-container'>
                    <img src={this.props.itemData.imageUrl} alt={this.props.itemData.name + '照片'}/>
                </div>
                <h3>{this.props.itemData.name}</h3>
                <p>单价：{this.props.itemData.price}元/{this.props.itemData.unit}  <Button disabled={true}>添加至购物车</Button></p>
            </div>
        );
    }
}

Item.propTypes = {
    itemData: PropTypes.shape({
        name: PropTypes.string,
        price: PropTypes.number,
        unit: PropTypes.string,
        imageUrl: PropTypes.string
    })
};

export default Item;
