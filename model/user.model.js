import axiosInstance from "../lib/axiosInstance";
const User = class {
    constructor() {
        this.baseUrl = "/user";
    }

    async getNextUserId(query = []) {
        return (await axiosInstance.get(`${this.baseUrl}/userNextId`)).data;
    }

    async traineeList(query = []) {
        return (await axiosInstance.get(`${this.baseUrl}/getTrainee?${new URLSearchParams(query)}`)).data;
    }

    async trainerList(query = []) {
        return (await axiosInstance.get(`${this.baseUrl}/getTrainer?${new URLSearchParams(query)}`)).data;
    }

    async addUser(data = []) {
        
        console.log(data);
        axiosInstance.defaults.headers.common['Authorization'] = "Bearer " + sessionStorage.getItem("access_token");
        return (await axiosInstance.post(`${this.baseUrl}/addUser`, data));
    }

    async updateProfile(data = []) {
        axiosInstance.defaults.headers.common['Authorization'] = "Bearer " + sessionStorage.getItem("access_token");
        return (await axiosInstance.put(this.baseUrl, data));
    }
}
export default new User();