import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "30c8fd75f61f11b0b6c71c5293020eef",
        language: "ko-KR",
    }
})

export default instance