// tasksService.ts
import { AppDispatch } from '../../store';
import { addTask, startTask, completeTask, deleteTask, setLoading, setError, setTasks, cancelTask } from './tasksSlice';
import { Task, Priority } from './types';

const API_BASE_URL = 'http://localhost:3001/api';

export const fetchTasks = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetch(`${API_BASE_URL}/tasks`);
    const data = await response.json();
    dispatch(setTasks(data));
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : 'Unknown error'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const createTask = (
  title: string,
  estimatedTime: number,
  description?: string,
  category?: string,
  priority: Priority = 'medium'
) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, estimatedTime, description, category, priority })
    });
    const data = await response.json();
    dispatch(addTask(data));
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : 'Unknown error'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const beginTask = (taskId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/start`, {
      method: 'PATCH'
    });
    const data = await response.json();
    dispatch(startTask(data.id));
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : 'Unknown error'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const cancelTaskAction = (taskId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/cancel`, {
      method: 'PATCH'
    });
    const data = await response.json();
    dispatch(cancelTask(data.id));
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : 'Unknown error'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const finishTask = (taskId: string, actualTime: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/finish`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ actualTime })
    });
    const data = await response.json();
    dispatch(completeTask({ id: data.id, actualTime: data.actualTime }));
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : 'Unknown error'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const removeTask = (taskId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: 'DELETE'
    });
    dispatch(deleteTask(taskId));
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : 'Unknown error'));
  } finally {
    dispatch(setLoading(false));
  }
};