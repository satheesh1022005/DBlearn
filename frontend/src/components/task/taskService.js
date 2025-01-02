import axios from "axios";
import { toast } from "react-toastify";

const APIURL = "http://localhost:3000/";

export const getAllTasks = async () => {
  try {
    const response = await axios.get(`${APIURL}task/getTasks`);
    console.log(response.data.tasks);
    return response.data.tasks;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const assignTask = async (data) => {
  console.log(data);
  try {
    const token = localStorage.getItem("token");
    console.log(token);
    const response = await axios.post(`${APIURL}api/assignTask`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    toast("Assigned Successfully", { type: "success", autoClose: 2000 });
    return true;
  } catch (err) {
    toast("Something went wrong", { type: "error", autoClose: 2000 });
    console.log(err);
    return false;
  }
};

export const addTask = async (data) => {
  console.log(data);
  try {
    const response = await axios.post(`${APIURL}task/create`, data);
    console.log(response.data);
    toast("Added Successfully", { type: "success", autoClose: 2000 });
    return true;
  } catch (err) {
    toast("Something went wrong", { type: "error", autoClose: 2000 });
    console.log(err);
    return false;
  }
};

export const viewTask = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log(token);
    const response = await axios.get(`${APIURL}api/getAll`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const setTaskStatus = async (id) => {
  console.log(id);
  try {
    const token = localStorage.getItem("token");
    console.log(token);
    const response = await axios.post(`${APIURL}api/setTaskCompleted`,{
      taskId:id
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    toast("Task Status Updated", { type: "success", autoClose: 2000 });
    return true;    
  } catch (err) {
    console.log(err);
    toast("Something went wrong", { type: "error", autoClose: 2000 });
  }
}