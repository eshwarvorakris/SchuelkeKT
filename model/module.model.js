import axiosInstance from "../lib/axiosInstance";

const moduleModel=class {

    constructor(){
        this.baseUrl="/module";
    }

    async list(query=[])
    {
        return (await axiosInstance.get(`${this.baseUrl}?${new URLSearchParams(query)}`)).data;
    }
    async detail(id)
    {
        return (await axiosInstance.get(`${this.baseUrl}/${id}`)).data;
    }
    async create(data=[])
    {
        return await axiosInstance.post(this.baseUrl,data);
    }
    async createContent(data=[])
    {
        return await axiosInstance.post(`${this.baseUrl}/content`,data);
    }
    async update(id,data=[])
    {
        return await axiosInstance.put(`${this.baseUrl}/${id}`,data);
    }

    // async getModuleListByCourse(data=[]){
        
    //     return await axiosInstance.get(`${this.baseUrl}/getmodulesbycourse/`,data);

    // }

    async updateAll(data=[])
    {
        return await axiosInstance.post(`${this.baseUrl}/update_all`,data);
    }
    
    async delete(id)
    {
        return await axiosInstance.delete(`${this.baseUrl}/${id}`);
    }

}

export default new moduleModel();