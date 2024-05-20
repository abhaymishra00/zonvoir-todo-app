import axios from "axios";
import {
  FETCH_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  ORDER_TASKS,
} from "./types";

const API_URL = "http://localhost:5010/api/tasks";

export const fetchTasks = () => async (dispatch) => {
  const response = await axios.get(API_URL);
  dispatch({ type: FETCH_TASKS, payload: response.data });
};

export const updateOrder = (list) => async (dispatch) => {
  const response = await axios.patch(`${API_URL}/update-order`, {
    taskOrder: list,
  });
  dispatch({ type: ORDER_TASKS, payload: response.data });
};

export const addTask = (task) => async (dispatch) => {
  const response = await axios.post(API_URL, task);
  dispatch({ type: ADD_TASK, payload: response.data });
};

export const updateTask = (id, updates) => async (dispatch) => {
  const response = await axios.put(`${API_URL}/${id}`, updates);
  dispatch({ type: UPDATE_TASK, payload: response.data });
};

export const deleteTask = (id) => async (dispatch) => {
  await axios.delete(`${API_URL}/${id}`);
  dispatch({ type: DELETE_TASK, payload: id });
};
