import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TasksState, Priority, Status } from './types';

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Partial<Task> & {
      title: string;
      priority: Priority;
      estimatedTime: number;
    }>) => {
      const newTask: Task = {
        id: Date.now().toString(),
        status: 'pending',
        createdAt: new Date(),
        actualTime: 0,
        completedAt: undefined,
        description: '',
        category: '',
        ...action.payload, // Переданные значения перезапишут значения по умолчанию
      };
      state.tasks.push(newTask);
    },
    startTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.status = 'in-progress';
      }
    },
    cancelTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.status = 'pending';
      }
    },
    completeTask: (state, action: PayloadAction<{ id: string; actualTime: number }>) => {
      const task = state.tasks.find(t => t.id === action.payload.id);
      if (task) {
        task.status = 'completed';
        task.actualTime = action.payload.actualTime;
        task.completedAt = new Date();
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    }
  },
});

export const { addTask, startTask, completeTask, deleteTask, setLoading, setError, setTasks, cancelTask   } = tasksSlice.actions;
export default tasksSlice.reducer;