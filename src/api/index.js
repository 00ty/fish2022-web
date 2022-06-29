import axios from "axios";
import store from "@/store";

const http = axios.create({
  baseURL: "/api/",
  timeout: 3000,
  headers: { "X-Token": store.state.token },
});

const require = {
  get(url) {
    return new Promise((resolve, reject) => {
      http({
        url,
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch(function (error) {
          // 处理错误情况
          console.log(error);
          resolve(-1);
        });
    });
  },
  post(url, data) {
    return new Promise((resolve, reject) => {
      http({
        url,
        data,
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch(function (error) {
          // 处理错误情况
          console.log(error);
          resolve(-1);
        });
    });
  },
};

export default require;
