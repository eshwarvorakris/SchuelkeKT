import axiosInstance from "../lib/axiosInstance";

const categoryModel=class {

    constructor(){
        this.baseUrl="/courseView";
    }

    async list(query=[])
    {
        return (await axiosInstance.get(`${this.baseUrl}?${new URLSearchParams(query)}`)).data;
    }

    async getAnyCourseChapterViewed(data=[])
    {
        return (await axiosInstance.post(`${this.baseUrl}/get_any_course_chapter_viewed`, data));
    }

    async getCourseViewData(data=[])
    {
        return (await axiosInstance.post(`${this.baseUrl}/get_course_view_data`, data));
    }

    async create(data=[])
    {
        return await axiosInstance.post(this.baseUrl,data);
    }
    async update(id,data=[])
    {
        return await axiosInstance.put(`${this.baseUrl}/${id}`,data);
    }
    async getChapterView(data=[])
    {
        return (await axiosInstance.post(`${this.baseUrl}/get_chapter_view`, data));
    }

    async getModuleView(data=[])
    {
        return (await axiosInstance.post(`${this.baseUrl}/get_module_view`, data));
    }

    async getEachCourseStat(data=[])
    {
        return (await axiosInstance.post(`${this.baseUrl}/get_course_stat`, data));
    }

    async getRecentLearning(data=[])
    {
        return (await axiosInstance.post(`${this.baseUrl}/get_recent_learn`, data));
    }
    async delete(id)
    {
        return await axiosInstance.delete(`${this.baseUrl}/${id}`);
    }

}

export default new categoryModel();