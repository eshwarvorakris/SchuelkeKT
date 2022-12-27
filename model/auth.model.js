import axiosInstance from "../lib/axiosInstance";
const Auth=class {
    async profile()
    {
        if (typeof window !== 'undefined')
        {
            axiosInstance.defaults.headers.common['token'] = localStorage.getItem("access_token");
                return (await axiosInstance.get("/dashboard")).data;
        }                 
    }
    async login(data=[])
    {
        return await axiosInstance.post("/users/login",data);
    }
}
export default new Auth();