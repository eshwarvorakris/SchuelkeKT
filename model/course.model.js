import axiosInstance from "../lib/axiosInstance";

const courseModel=class {

    constructor(){
        this.baseUrl="/course";
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


    async modules(id, query=[])
    {
        return (await axiosInstance.get(`${this.baseUrl}/${id}/module?${new URLSearchParams(query)}`)).data;
    }

    async getCourseAnalytics(data=[], query=[])
    {
        return await axiosInstance.post(`${this.baseUrl}/course_analytics?${new URLSearchParams(query)}`,data);
    }

    async getTraineeAssignedCourses(data=[], query=[])
    {
        return await axiosInstance.post(`${this.baseUrl}/trainee_assigned_courses?${new URLSearchParams(query)}`,data);
    }

}

export default new courseModel();