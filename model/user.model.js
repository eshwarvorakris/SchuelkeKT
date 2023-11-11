import axiosInstance from "../lib/axiosInstance";
const User = class {
    constructor() {
        this.baseUrl = "/user";
    }

    async getNextUserId(query = []) {
        return (await axiosInstance.get(`${this.baseUrl}/userNextId?${new URLSearchParams(query)}`)).data;
    }

    async traineeList(query = []) {
        return (await axiosInstance.get(`${this.baseUrl}/getTrainee?${new URLSearchParams(query)}`)).data;
    }

    async traineeToAssignList(query = []) {
        return (await axiosInstance.get(`${this.baseUrl}/get_trainee_to_assign?${new URLSearchParams(query)}`)).data;
    }

    async trainerList(query = []) {
        return (await axiosInstance.get(`${this.baseUrl}/getTrainer?${new URLSearchParams(query)}`)).data;
    }

    async addUser(data = []) {
        
        //// console.log(data);
        axiosInstance.defaults.headers.common['Authorization'] = "Bearer " + sessionStorage.getItem("access_token");
        return (await axiosInstance.post(`${this.baseUrl}/addUser`, data));
    }

    async updateProfile(data = []) {
        axiosInstance.defaults.headers.common['Authorization'] = "Bearer " + sessionStorage.getItem("access_token");
        return (await axiosInstance.put(this.baseUrl, data));
    }
    async detail(id)
    {
        return (await axiosInstance.get(`${this.baseUrl}/${id}`)).data;
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
export default new User();