import axiosInstance from "../lib/axiosInstance";

const fileModel = class {
    async upload(data = []) {
        //console.log(data);
        return await axiosInstance.post("/upload", data);
    }
}

export default new fileModel();
