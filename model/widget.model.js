import axiosInstance from "../lib/axiosInstance";

const widgetModel=class {

    constructor(){
        this.baseUrl="/widget";
    }

    async courseCount()
    {
        return (await axiosInstance.get(`${this.baseUrl}/course/total`)).data;
    }
    async moduleCount()
    {
        return (await axiosInstance.get(`${this.baseUrl}/module/total`)).data;
    }

}

export default new widgetModel();