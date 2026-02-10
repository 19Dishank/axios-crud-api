import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
})
// display
export const getData = () => {
    return api.get("/posts")
}
// delete
export const deleteData = (id) => {
    return api.delete(`/posts/${id}`)
}

//Add
export const updateData = (data) => {
    return api.post(`/posts`, data)
}

// Update 
export const editData = (id, data) => {
    return api.put(`/posts/${id}`, data);
}
