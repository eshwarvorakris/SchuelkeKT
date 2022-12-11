import axiosInstance from "../lib/axiosInstance";

const Auth=class {

    async profile()
    {
        axiosInstance.defaults.headers.common['Authorization'] = "Bearer "+localStorage.getItem("access_token");
        return (await axiosInstance.get("/auth/profile")).data;
    }
    async login(data=[])
    {
        return await axiosInstance.post("/auth/login",data);
    }

}

export default new Auth();