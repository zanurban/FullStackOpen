import axios from 'axios'
const getData = url => {
    const request = axios.get(url)
    return request.then(response=>{return response.data})
}
const createData = (url, object) =>{
    const request = axios.post(url, object)
    return request.then(response=>{return response.data})
}
const updateData = (url, id, object) => {
    const request = axios.put(`${url}/${id}`, object)
    return request.then(response => {return response.data})
}
const deleteData = (url, id) =>{
    return axios.delete(`${url}/${id}`)
}
export default {
    getData: getData, 
    updateData: updateData, 
    createData: createData,
    deleteData: deleteData
}