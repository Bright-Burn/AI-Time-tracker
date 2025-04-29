export type Priority = 'low' | 'medium' | 'high';
export type Status = 'pending' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description?: string;
  category?: string;
  priority: Priority;
  estimatedTime: number;
  actualTime?: number;
  status: Status;
  createdAt: Date;
  completedAt?: Date;
}

export interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}