import axiosInstance from "../lib/axiosInstance";

const baseModel=class {

    async countrylist(query=[])
    {
        return (await axiosInstance.get(`https://restcountries.com/v3.1/all`)).data;
    }
}

export default new baseModel();