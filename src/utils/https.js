import axios from "axios";
import  {message} from "antd";

const httpClient = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 10000
});

httpClient.interceptors.response.use(
    (response) => {
        console.log(response)
        return response;
    },
    (error) => {
        console.error("response in error:" + error);
        let response = error.response
        const errMessage = response ? `状态码：${response.status}；错误码：${response.data.errorCode}；错误内容：${response.data.message}` : ''
        message.error(errMessage)
        return error.response;
    }
);

export const isSuccessRequest = (code) => {
    return code >= 200 && code < 300;
}

export default httpClient;
