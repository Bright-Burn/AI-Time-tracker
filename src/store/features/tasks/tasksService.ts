import { AppDispatch } from '../../store';
import { addTask, startTask, completeTask, deleteTask, setLoading, setError } from './tasksSlice';
import { Task, Priority } from './types';

export const createTask = (
  title: string,
  estimatedTime: number,
  description?: string,
  category?: string,
  priority: Priority = 'medium'
) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    // Здесь могла бы быть реальная API-интеграция
    dispatch(addTask({ title, description, category, priority, estimatedTime }));
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : 'Unknown error'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const beginTask = (taskId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    // API-интеграция
    dispatch(startTask(taskId));
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : 'Unknown error'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const finishTask = (taskId: string, actualTime: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    // API-интеграция
    dispatch(completeTask({ id: taskId, actualTime }));
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : 'Unknown error'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const removeTask = (taskId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    // API-интеграция
    dispatch(deleteTask(taskId));
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : 'Unknown error'));
  } finally {
    dispatch(setLoading(false));
  }
};