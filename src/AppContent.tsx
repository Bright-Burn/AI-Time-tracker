import React, { useEffect } from 'react';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { Layout } from '@consta/uikit/Layout';
import { TaskForm } from './components/TaskForm/TaskForm';
import { TaskList } from './components/TaskList/TaskList';
import { fetchTasks } from './store/features/tasks/tasksService';
import { useAppDispatch } from './store/hooks';

export const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <Theme preset={presetGpnDefault}>
      <Layout direction="column" style={{ minHeight: '100vh' }}>
        <Layout style={{ padding: '24px' }}>
          <Layout direction="column" flex={1}>
            <TaskForm />
            <TaskList />
          </Layout>
        </Layout>
      </Layout>
    </Theme>
  );
};