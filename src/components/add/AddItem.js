import React from "react";
import './AddItem.css'
import {Button, Form, message} from "antd";
import  axios from "axios";
import {urls} from "../../utils/urls";

class AddItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            price: '',
            unit: '',
            imageUrl: ''
        };
        this.submitInfo = async () => {
            const data = {
                name: this.state.name,
                price: this.state.price,
                unit: this.state.unit,
                imageUrl: this.state.imageUrl
            }
            const response = await axios.post(urls.postItem(), data);
            if (response.status === 200) {
                message.success("添加商品成功");
                this.setState({
                    name: '',
                    price: '',
                    unit: '',
                    imageUrl: ''
                });
            } else {
                message.error("添加失败，请重试");
            }
        }

        this.handleNameChange = (event) => {this.setState({name: event.target.value})}
        this.handlePriceChange = (event) => {this.setState({price: event.target.value})}
        this.handleUnitChange = (event) => {this.setState({unit: event.target.value})}
        this.handleImageUrlChange = (event) => {this.setState({imageUrl: event.target.value})}
    }

    render() {
        return (
            <div className='add-item-container'>
                <h1>添加商品</h1>
                <Form onFinish={this.submitInfo}>
                    <Form.Item label='商品名'
                               name='name'
                               rules={[{required: true, message: '请输入名称'}]}>
                        <input value={this.state.name} onChange={this.handleNameChange} />
                    </Form.Item>
                    <Form.Item label='价格'
                               name='price'
                               rules={[{required: true, message: '价格'}]}>
                        <input value={this.state.price} onChange={this.handlePriceChange} />
                    </Form.Item>
                    <Form.Item label='单位'
                               name='unit'
                               rules={[{required: true, message: '单位'}]}>
                        <input  value={this.state.unit} onChange={this.handleUnitChange}/>
                    </Form.Item>
                    <Form.Item label='图片URL'
                               name='imageUrl'
                               rules={[{required: true, message: '请输入图片url'}]}>
                        <input  value={this.state.imageUrl} onChange={this.handleImageUrlChange}/>
                    </Form.Item>
                    <Button type="primary" htmlType="submit">提交</Button>
                </Form>
            </div>
        );
    }
}

AddItem.propTypes = {};

export default AddItem;
