import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Credentials } from "../../../interface/Credentials";
import { User } from "../../../class/user";
import { Config } from "../../../configuration/config";
import { JwtResponse } from "../../../class/common/response-data";
import { commonAPI } from "../../../service/common-api.service";

/**
 * Example class
 *
 * @export
 * @class UserServiceApi
 * @extends {Api}
 *
 * @example
 * const axiosConfig = {
 *  baseUrl: "www.domain.com"
 * }
 * const api = new UserServiceApi(axiosConfig);
 *  */
export class UserServiceApi {
    config: Config;
    axiosConfig: AxiosRequestConfig;
    constructor(configs: AxiosRequestConfig) {
        // // this middleware is been called right before the http request is made.
        // this.interceptors.request.use((param: AxiosRequestConfig) => ({
        //     ...param
        // }));

        // // this middleware is been called right before the response is get it by the method that triggers the request
        // this.interceptors.response.use((param: AxiosResponse) => ({
        //     ...param
        // }));

        this.userLogin = this.userLogin.bind(this);
        this.userRegister = this.userRegister.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);
        this.getById = this.getById.bind(this);
        this.config = new Config();
        this.axiosConfig = configs;
    }

    public userLogin(credentials: Credentials): Promise<JwtResponse> {
        return commonAPI.post<string, Credentials, AxiosResponse<JwtResponse>>(this.config.apiServiceURL.login, credentials)
            .then((res)=>{
                //TODO: handle auth
                localStorage.setItem("CURRENT_USER", JSON.stringify(res));
                return commonAPI.success(res);
            });
    }

    public userRegister(user: User): Promise<JwtResponse> {
        return commonAPI.post<number, User, AxiosResponse<JwtResponse>>(this.config.apiServiceURL.register, user)
            .then((res)=>{
                //TODO: handle auth
                localStorage.setItem("CURRENT_USER", JSON.stringify(res));
                return commonAPI.success(res);
            })
            .catch((error: AxiosError<Error>) => {
                throw error;
            });
    }

    public updateUser(user: User): Promise<JwtResponse> {
        return commonAPI.put<number, User, AxiosResponse<JwtResponse>>(this.config.apiServiceURL.users, user)
            .then((res)=>{
                return commonAPI.success(res);
            })
            .catch((error: AxiosError<Error>) => {
                throw error;
            });
    }

    public async deleteRecords(objs: User[]) : Promise<any> {
        try{
            this.axiosConfig.data = objs;
            const res = await commonAPI.delete(`${this.config.apiServiceURL.activities}`, this.axiosConfig);
            return commonAPI.success(res);
        }
        catch(e) {
            throw e;
        }
    }

    public async getAllUsers(): Promise<User[]> {
        try {
            const res: AxiosResponse<User[]> = await commonAPI.get<User, AxiosResponse<User[]>>(this.config.apiServiceURL.users);
            return commonAPI.success(res);
        } catch (error) {
            throw error;
        }
    }

    public getById(id: number): Promise<User> {
        return commonAPI.get<User, AxiosResponse<User>>(`${this.config.apiServiceURL.users}/${id}`).then(commonAPI.success);
    }
}
