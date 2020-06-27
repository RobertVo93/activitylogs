
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { Config } from "../../../configuration/config";
import { Activity } from "../../../class/activity";
import { Comment } from "../../../class/common/comment";
import { commonAPI } from "../../../service/common-api.service";
import { apiConfig } from "../../../configuration/api.config";
export class ActivityService {
    configs: Config;
    axiosConfig: AxiosRequestConfig;
    constructor() {
        this.configs = new Config();
        this.axiosConfig = apiConfig;

        this.getAllData = this.getAllData.bind(this);
        this.getById = this.getById.bind(this);
    }

    /**
     * Get all data
     */
    public async getAllData(): Promise<Activity[]> {
        try {
            const res: AxiosResponse<Activity[]> = await commonAPI.get(this.configs.apiServiceURL.activities);
            return commonAPI.success(res);
        }
        catch (e) {
            throw e;
        }
    }

    /**
     * get data by id
     * @param id id
     */
    public async getById(id: any): Promise<Activity> {
        try {
            const res: AxiosResponse<Activity> = await commonAPI.get(`${this.configs.apiServiceURL.activities}/${id}`);
            return commonAPI.success(res);
        }
        catch (e) {
            throw e;
        }
    }

    public async createNew(obj: Activity): Promise<any> {
        try{
            const res = await commonAPI.post(`${this.configs.apiServiceURL.activities}`, obj);
            return commonAPI.success(res);
        }
        catch(e){
            throw e;
        }
    }

    public async update(obj: Activity): Promise<any> {
        try{
            const res = await commonAPI.put(`${this.configs.apiServiceURL.activities}`, obj);
            return commonAPI.success(res);
        }
        catch(e){
            throw e;
        }
    }

    public async updateComment(obj: Comment[]): Promise<any>{
        try{
            const res = await commonAPI.put(`${this.configs.apiServiceURL.activities}/comments`, obj);
            return commonAPI.success(res);
        }
        catch(e){
            throw e;
        }
    }

    public async deleteRecords(objs: Activity[]) : Promise<any> {
        try{
            this.axiosConfig.data = objs;
            const res = await commonAPI.delete(`${this.configs.apiServiceURL.activities}`, this.axiosConfig);
            return commonAPI.success(res);
        }
        catch(e) {
            throw e;
        }
    }
}