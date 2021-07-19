import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";

const apiURL = process.env.REACT_APP_API_URL;
interface Config extends RequestInit {
  data?: object;
  token?: string;
}
export const http = async (
  endpoint: string,
  { data, token, headers, ...customconfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customconfig,
  };
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window
    .fetch(`${apiURL}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};
export const useHttp = () => {
  const { user } = useAuth();
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};
// Parameters 根据所传函数的参数类型，来确定类型
// Partial 将类型变为可选的
// Omit 删除某一个类型
// type Person = {
//   name: string,
//   age: number
// }
// const xiaoming: Partial<Person> = {}
// const xiaohong: Omit<Person, 'age'> = { name: 'xiaohong' }
// const xiaohong2: Omit<Person, 'age' | 'name'> = {}
// Partial 的实现
// type Partial<T> = {
//   [P in keyof T]?: T[P]
// }
// type Pick<T, K extends keyof T> = {
//   [P in K]: T[P]
// }
