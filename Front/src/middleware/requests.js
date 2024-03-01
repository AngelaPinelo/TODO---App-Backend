import axios from 'axios'

const baseURL = 'http://localhost:4000'

export const getAll = async () => {
    try {
        return await axios.get(`${baseURL}/getAll`)
    } catch (error) {
        return []
    }
}

export const postOne = async (form) => {
    try {
        var data = JSON.stringify(form);

        var config = {
            method: 'post',
            url: `${baseURL}/postOne`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(config);
    } catch (error) {
        return []
    }
}

export const deleteOne = async (form) => {
    try {
        var data = JSON.stringify(form);

        var config = {
            method: 'delete',
            url: `${baseURL}/deleteOne`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(config);
    } catch (error) {
        return []
    }
}