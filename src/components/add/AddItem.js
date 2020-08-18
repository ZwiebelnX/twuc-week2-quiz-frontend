import React from "react";
import './AddItem.css'
import {Button, Form, Input, message, Spin, InputNumber} from "antd";
import 'antd/dist/antd.css'
import {urls} from "../../utils/urls";
import httpClient, {isSuccessRequest} from "../../utils/https";

class AddItem extends React.Component {
    constructor(props) {
        super(props);

        this.formRef = React.createRef()

        this.state = {
            isLoading: false,
        };
        this.submitInfo = async (value) => {
            this.setState({isLoading: true})
            try {
                const response = await httpClient.post(urls.postItem(), value);
                if (isSuccessRequest(response.status)) {
                    message.success("添加商品成功");
                    this.formRef.current.resetFields()
                }
            } catch (e) {
                console.log(e)
            }
            this.setState({isLoading: false})
        }
    }

    render() {
        const formItemLayout = {labelCol: {span: 4}, wrapperCol: {span: 18}}
        return (
            <div className='add-item-container'>
                <Spin spinning={this.state.isLoading}>
                    <h1>添加商品</h1>
                    <Form {...formItemLayout}
                          size='large'
                          onFinish={this.submitInfo}
                          ref={this.formRef}
                          name='form'>
                        <Form.Item label='商品名'
                                   name='name'
                                   rules={[{required: true, message: '请输入名称'}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label='价格'
                                   name='price'
                                   rules={[{required: true, message: '请输入价格'}
                                   , {type: 'number', min: 1, message: '请输入大于0的数字'}]}>
                            <InputNumber min='1' size='large'/>
                        </Form.Item>
                        <Form.Item label='单位'
                                   name='unit'
                                   rules={[{required: true, message: '请输入单位'}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label='图片URL'
                                   name='imageUrl'
                                   rules={[{validator: (_, value) =>
                                           value && value.match(/^(https?:\/\/)/) ?
                                               Promise.resolve() : Promise.reject('请输入正确的url')}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">提交</Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </div>
        );
    }
}

AddItem.propTypes = {};

export default AddItem;
