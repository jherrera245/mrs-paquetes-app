import axios from 'axios';

const API_URL_BASE = process.env.EXPO_PUBLIC_API_URL;

const fetchData = async (endpoint, data = {}, headers = {}) => {
    try {
        const response = await axios.get(`${API_URL_BASE}/${endpoint}`, {
            params: data,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        });

        console.log('GET Response:', response.data);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            console.error(`Error fetching ${API_URL_BASE}/${endpoint} data:`, error.response.data);
            throw error.response.data;
        } else {
            console.error(`Error fetching ${API_URL_BASE}/${endpoint} data:`, error);
            throw error;
        }
    }
};

const postData = async (endpoint, data, headers = {}) => {
    try {
        const response = await axios.post(`${API_URL_BASE}/${endpoint}`, data, {
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        });

        console.log('POST Response:', response.data);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            console.error(`Error posting ${API_URL_BASE}/${endpoint} data:`, error.response.data);
            throw error.response.data;
        } else {
            console.error(`Error posting ${API_URL_BASE}/${endpoint} data:`, error);
            throw error;
        }
    }
};

const putData = async (endpoint, data, headers = {}) => {
    try {
        const response = await axios.put(`${API_URL_BASE}/${endpoint}`, data, {
            headers: {
                ...headers,
                'Content-Type': 'application/json',
            },
        });

        console.log('PUT Response:', response.data);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            console.error(`Error updating ${API_URL_BASE}/${endpoint} data:`, error.response.data);
            throw error.response.data;
        } else {
            console.error(`Error updating ${API_URL_BASE}/${endpoint} data:`, error);
            throw error;
        }
    }
};

const patchData = async (endpoint, id, data, headers = {}) => {
    try {
        const response = await axios.patch(`${API_URL_BASE}/${endpoint}/${id}`, data, {
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        });

        console.log('PATCH Response:', response.data);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            console.error(`Error patching ${API_URL_BASE}/${endpoint} data:`, error.response.data);
            throw error.response.data;
        } else {
            console.error(`Error patching ${API_URL_BASE}/${endpoint} data:`, error);
            throw error;
        }
    }
};

const deleteData = async (endpoint, headers = {}) => {
    try {
        const response = await axios.delete(`${API_URL_BASE}/${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        });

        console.log('DELETE Response:', response.data);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            console.error(`Error deleting ${API_URL_BASE}/${endpoint} data:`, error.response.data);
            throw error.response.data;
        } else {
            console.error(`Error deleting ${API_URL_BASE}/${endpoint} data:`, error);
            throw error;
        }
    }
};

export { fetchData, postData, putData, patchData, deleteData };