import React from 'react';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { Card } from '@consta/uikit/Card';
import { Layout } from '@consta/uikit/Layout';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { TaskForm } from './components/TaskForm/TaskForm';
import { TaskList } from './components/TaskList/TaskList';
import { Text } from '@consta/uikit/Text';

function App() {
  return (
    <Provider store={store}>
      <Theme preset={presetGpnDefault}>
        <Layout direction="column" style={{ minHeight: '100vh' }}>
          {/* Заменяем Header на кастомную реализацию */}
          <Layout 
            style={{ 
              padding: '16px 24px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              background: 'var(--color-bg-default)',
              alignItems: 'center'
            }}
          >
            <Text 
              view="primary" 
              size="xl" 
              weight="bold"
              as="div"
            >
              TimeTracker
            </Text>
          </Layout>
          
          <Layout flex={1} style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
            <Layout direction="column" flex={1}>
              <Card verticalSpace="xl" horizontalSpace="xl" shadow={false}>
                <TaskForm />
              </Card>
              
              <Card verticalSpace="xl" horizontalSpace="xl" style={{ marginTop: '24px' }}>
                <TaskList />
              </Card>
            </Layout>
          </Layout>
        </Layout>
      </Theme>
    </Provider>
  );
}

export default App;