
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { Config } from "../../../configuration/config";
import { Project } from "../../../class/project";
import { Comment } from "../../../class/common/comment";
import { commonAPI } from "../../../service/common-api.service";
import { apiConfig } from "../../../configuration/api.config";
export class ProjectService {
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
    public async getAllData(): Promise<Project[]> {
        try {
            const res: AxiosResponse<Project[]> = await commonAPI.get(this.configs.apiServiceURL.projects);
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
    public async getById(id: any): Promise<Project> {
        try {
            const res: AxiosResponse<Project> = await commonAPI.get(`${this.configs.apiServiceURL.projects}/${id}`);
            return commonAPI.success(res);
        }
        catch (e) {
            throw e;
        }
    }

    public async createNew(obj: Project): Promise<any> {
        try{
            const res = await commonAPI.post(`${this.configs.apiServiceURL.projects}`, obj);
            return commonAPI.success(res);
        }
        catch(e){
            throw e;
        }
    }

    public async update(obj: Project): Promise<any> {
        try{
            const res = await commonAPI.put(`${this.configs.apiServiceURL.projects}`, obj);
            return commonAPI.success(res);
        }
        catch(e){
            throw e;
        }
    }

    public async updateComment(obj: Comment[]): Promise<any>{
        try{
            const res = await commonAPI.put(`${this.configs.apiServiceURL.projects}/comments`, obj);
            return commonAPI.success(res);
        }
        catch(e){
            throw e;
        }
    }

    public async deleteRecords(objs: Project[]) : Promise<any> {
        try{
            this.axiosConfig.data = objs;
            const res = await commonAPI.delete(`${this.configs.apiServiceURL.projects}`, this.axiosConfig);
            return commonAPI.success(res);
        }
        catch(e) {
            throw e;
        }
    }
}