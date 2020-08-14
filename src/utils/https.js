import axios from "axios";
import  { message} from "antd";

const service = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 50000
});

service.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error("response in error:" + error);
        let response = error.response
        const errMessage = response ? `状态码：${response.status}；错误码：${response.data.code}；错误内容：${response.data.message}` : ''
        message.error(errMessage)
        return error.response;
    }
);
