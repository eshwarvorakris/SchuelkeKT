import axiosInstance from "../lib/axiosInstance";

const assignCourseModel=class {

    constructor(){
        this.baseUrl="/assign_course";
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
    async update(id,data=[])
    {
        return await axiosInstance.put(`${this.baseUrl}/${id}`,data);
    }
    
    async delete(id)
    {
        return await axiosInstance.delete(`${this.baseUrl}/${id}`);
    }
    async deleteAll(data=[])
    {
        return await axiosInstance.post(`${this.baseUrl}/multipleUnassign`,data);
    }
}

export default new assignCourseModel();