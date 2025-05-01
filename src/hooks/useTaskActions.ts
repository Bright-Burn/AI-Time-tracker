// src/hooks/useTaskActions.ts
import { useAppDispatch } from '../store/hooks';
import { 
  createTask as createTaskAction,
  beginTask as beginTaskAction,
  finishTask as finishTaskAction,
  removeTask as removeTaskAction,
  cancelTaskAction
} from '../store/features/tasks/tasksService';

export const useTaskActions = () => {
  const dispatch = useAppDispatch();

  const createTask = (
    title: string,
    estimatedTime: number,
    description?: string,
    category?: string,
    priority?: 'low' | 'medium' | 'high'
  ) => {
    dispatch(createTaskAction(title, estimatedTime, description, category, priority));
  };

  const beginTask = (taskId: string) => {
    dispatch(beginTaskAction(taskId));
  };

  const finishTask = (taskId: string, actualTime: number) => {
    dispatch(finishTaskAction(taskId, actualTime));
  };

  const removeTask = (taskId: string) => {
    dispatch(removeTaskAction(taskId));
  };
  const cancelTask = (taskId: string) => {
    dispatch(cancelTaskAction(taskId));
  };
  return { createTask, beginTask, finishTask, removeTask, cancelTask  };
};