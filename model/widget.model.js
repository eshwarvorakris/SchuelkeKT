import axiosInstance from "../lib/axiosInstance";

const widgetModel=class {

    constructor(){
        this.baseUrl="/widget";
    }

    async traineeCount()
    {
        return (await axiosInstance.get(`${this.baseUrl}/trainee/total`)).data;
    }

    async trainerCount()
    {
        return (await axiosInstance.get(`${this.baseUrl}/trainer/total`)).data;
    }

    async courseCount()
    {
        return (await axiosInstance.get(`${this.baseUrl}/course/total`)).data;
    }

    async approvedCourseCount()
    {
        return (await axiosInstance.get(`${this.baseUrl}/course/totalApproved`)).data;
    }

    async courseWeek()
    {
        return (await axiosInstance.get(`${this.baseUrl}/course/weekDuration`)).data;
    }
    async courseHour() {
        return (await axiosInstance.get(`${this.baseUrl}/course/courseHour`)).data;
    }
    async moduleCount()
    {
        return (await axiosInstance.get(`${this.baseUrl}/module/total`)).data;
    }

    async traineeKpis()
    {
        return (await axiosInstance.get(`${this.baseUrl}/trainee_kpis`)).data;
    }

    async trainerKpis()
    {
        return (await axiosInstance.get(`${this.baseUrl}/trainer_kpis`)).data;
    }

    async traineeStatusKpis(data=[])
    {
        return (await axiosInstance.post(`${this.baseUrl}/trainee_status_kpis`, data)).data;
    }

    async adminGraph1(data=[])
    {
        return (await axiosInstance.post(`${this.baseUrl}/admin_graph1`, data)).data;
    }

    async adminGraph2(data=[])
    {
        return (await axiosInstance.post(`${this.baseUrl}/admin_graph2`, data)).data;
    }

    async trainerGraph1(data=[])
    {
        return (await axiosInstance.post(`${this.baseUrl}/trainer_graph1`, data)).data;
    }

}

export default new widgetModel();