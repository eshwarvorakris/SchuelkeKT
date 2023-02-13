import axiosInstance from "../lib/axiosInstance";

const questionModel=class {

    constructor(){
        this.baseUrl="/assignment";
    }

    async list(query=[])
    {
        return (await axiosInstance.get(`${this.baseUrl}`)).data;
    }
    async traineeAttempts(query=[])
    {
        return (await axiosInstance.post(`${this.baseUrl}/traineeAttempts`,query)).data;
    }
    async traineelist(query=[])
    {
        return (await axiosInstance.get(`${this.baseUrl}/trainee?${new URLSearchParams(query)}`)).data;
    }
    async detail(id)
    {
        return (await axiosInstance.get(`${this.baseUrl}/${id}`)).data;
    }
    async create(data=[])
    {
        return await axiosInstance.post(this.baseUrl,data);
    }
    async getSubmitted(data=[])
    {
        return await axiosInstance.post(`${this.baseUrl}/getSubmitted`,data);
    }
    async countAttempt(data=[])
    {
        return await axiosInstance.post(`${this.baseUrl}/countAttempt`,data);
    }

    async submitAssignment(data=[])
    {
        //return await axiosInstance.post(this.baseUrl,data);
        console.log(data);
        return "done";
    }
    async update(id,data=[])
    {
        return await axiosInstance.put(`${this.baseUrl}/${id}`,data);
    }
    
    async delete(id)
    {
        return await axiosInstance.delete(`${this.baseUrl}/${id}`);
    }

}

export default new questionModel();