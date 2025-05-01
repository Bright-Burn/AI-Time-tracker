// src/AppContent.tsx
import React from 'react';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { Layout } from '@consta/uikit/Layout';
import { TaskForm } from './components/TaskForm/TaskForm';
import { TaskList } from './components/TaskList/TaskList';
import {useTasks} from './hooks/useTasks'


export const AppContent: React.FC = () => {
  const ta = useTasks()
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