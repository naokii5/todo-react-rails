import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Box, Heading } from '@chakra-ui/react'
import { TodoForm } from './components/TodoForm'
import { TodoList } from './components/TodoList'

const queryClient = new QueryClient()

export const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <Box maxW="md" mx="auto" p={4}>
      <Heading as="h1" size="xl" mb={4}>
        ToDo App
      </Heading>
      <TodoForm />
      <TodoList />
    </Box>
  </QueryClientProvider>
)
