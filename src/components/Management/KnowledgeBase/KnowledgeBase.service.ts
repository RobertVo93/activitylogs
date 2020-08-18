
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { Config } from "../../../configuration/config";
import { KnowledgeBase } from "../../../class/knowledgeBase";
import { Comment } from "../../../share-components/CommentLog";
import { commonAPI } from "../../../service/common-api.service";
import { apiConfig } from "../../../configuration/api.config";
export class KnowledgeBaseService {
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
    public async getAllData(): Promise<KnowledgeBase[]> {
        try {
            const res: AxiosResponse<KnowledgeBase[]> = await commonAPI.get(this.configs.apiServiceURL.knowledgeBases);
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
    public async getById(id: any): Promise<KnowledgeBase> {
        try {
            const res: AxiosResponse<KnowledgeBase> = await commonAPI.get(`${this.configs.apiServiceURL.knowledgeBases}/${id}`);
            return commonAPI.success(res);
        }
        catch (e) {
            throw e;
        }
    }

    public async createNew(obj: KnowledgeBase): Promise<any> {
        try{
            const res = await commonAPI.post(`${this.configs.apiServiceURL.knowledgeBases}`, obj);
            return commonAPI.success(res);
        }
        catch(e){
            throw e;
        }
    }

    public async update(obj: KnowledgeBase): Promise<any> {
        try{
            const res = await commonAPI.put(`${this.configs.apiServiceURL.knowledgeBases}`, obj);
            return commonAPI.success(res);
        }
        catch(e){
            throw e;
        }
    }

    public async updateComment(obj: Comment[]): Promise<any>{
        try{
            const res = await commonAPI.put(`${this.configs.apiServiceURL.knowledgeBases}/comments`, obj);
            return commonAPI.success(res);
        }
        catch(e){
            throw e;
        }
    }

    public async deleteRecords(objs: KnowledgeBase[]) : Promise<any> {
        try{
            this.axiosConfig.data = objs;
            const res = await commonAPI.delete(`${this.configs.apiServiceURL.knowledgeBases}`, this.axiosConfig);
            return commonAPI.success(res);
        }
        catch(e) {
            throw e;
        }
    }
}