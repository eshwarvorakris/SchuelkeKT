import axiosInstance from "../lib/axiosInstance";
const Auth = class {
    // async profile() {
    //     if (typeof window !== 'undefined') {
    //         axiosInstance.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("access_token");
    //         await axiosInstance.get("/auth/profile").then((res) => {
    //             return res.data?.data
    //         }).catch((error) => {
    //             console.error("Unable To Get Profile : ", error);
    //             return null;
    //         });
    //     }
    // }

    async profile()
    {
        axiosInstance.defaults.headers.common['Authorization'] = "Bearer "+sessionStorage.getItem("access_token");
        return (await axiosInstance.get("/auth/profile")).data?.data||null;
    }

    async login(data = []) {
        return await axiosInstance.post("/auth/login", data);
    }
}
export default new Auth();