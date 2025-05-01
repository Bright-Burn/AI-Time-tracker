// src/hooks/useTasks.ts
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchTasks } from '../store/features/tasks/tasksService';

export const useTasks = () => {
  const dispatch = useAppDispatch();
  const { tasks, loading, error } = useAppSelector(state => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return { 
    tasks, 
    loading, 
    error,
    refreshTasks: () => dispatch(fetchTasks())
  };
};