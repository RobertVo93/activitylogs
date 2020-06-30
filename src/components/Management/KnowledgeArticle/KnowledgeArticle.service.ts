
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { Config } from "../../../configuration/config";
import { KnowledgeArticle } from "../../../class/knowledgeArticle";
import { commonAPI } from "../../../service/common-api.service";
import { apiConfig } from "../../../configuration/api.config";
export class KnowledgeArticleService {
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
    public async getAllData(): Promise<KnowledgeArticle[]> {
        try {
            const res: AxiosResponse<KnowledgeArticle[]> = await commonAPI.get(this.configs.apiServiceURL.knowledgeArticles);
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
    public async getById(id: any): Promise<KnowledgeArticle> {
        try {
            const res: AxiosResponse<KnowledgeArticle> = await commonAPI.get(`${this.configs.apiServiceURL.knowledgeArticles}/${id}`);
            return commonAPI.success(res);
        }
        catch (e) {
            throw e;
        }
    }

    public async createNew(obj: KnowledgeArticle): Promise<any> {
        try{
            const res = await commonAPI.post(`${this.configs.apiServiceURL.knowledgeArticles}`, obj);
            return commonAPI.success(res);
        }
        catch(e){
            throw e;
        }
    }

    public async update(obj: KnowledgeArticle): Promise<any> {
        try{
            const res = await commonAPI.put(`${this.configs.apiServiceURL.knowledgeArticles}`, obj);
            return commonAPI.success(res);
        }
        catch(e){
            throw e;
        }
    }

    public async deleteRecords(objs: KnowledgeArticle[]) : Promise<any> {
        try{
            this.axiosConfig.data = objs;
            const res = await commonAPI.delete(`${this.configs.apiServiceURL.knowledgeArticles}`, this.axiosConfig);
            return commonAPI.success(res);
        }
        catch(e) {
            throw e;
        }
    }
}