import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TodoForm } from './components/TodoForm'
import { TodoList } from './components/TodoList'

const queryClient = new QueryClient()

export const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ToDo App</h1>
      <TodoForm />
      <TodoList />
    </div>
  </QueryClientProvider>
)
