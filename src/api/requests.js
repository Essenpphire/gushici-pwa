import { axiosInstance } from "@/api/instance";

export const getPoetData = () => {
    axiosInstance.post('http://172.19.11.59:8000/api/books/', {
        classes: 'passage', dynasty: 'tang'
    });
}

export const getArticleData = () => {
    axiosInstance.post('/article');
}

// export const getFavorData = () => {
//     axiosInstance.get('/favor');
// }