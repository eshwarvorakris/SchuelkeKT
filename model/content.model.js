import axiosInstance from "../lib/axiosInstance";

const contentModel=class {

    constructor(){
        this.baseUrl="/content";
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

    async deleteCarousel(file,column,id)
    {
        let formData = new FormData();
        formData.append('file',file);
        formData.append('column',column);
        formData.append('id',id);
        return await axiosInstance.post(`${this.baseUrl}/delete-carousel`,formData);
    }

}

export default new contentModel();