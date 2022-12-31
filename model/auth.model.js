import axiosInstance from "../lib/axiosInstance";

const authModel=class {

    async profile()
    {
        axiosInstance.defaults.headers.common['Authorization'] = "Bearer "+localStorage.getItem("access_token");
        return (await axiosInstance.get("/auth/profile")).data?.data||null;
    }
    async login(data=[])
    {
        console.log(data);
        return await axiosInstance.post("/auth/login",data);
    }

}

export default new authModel();