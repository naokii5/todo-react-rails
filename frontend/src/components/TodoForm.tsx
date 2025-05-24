import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Box, Input, Button, Stack } from '@chakra-ui/react'
import { createTodo } from '../api'

export const TodoForm: React.FC = () => {
  const [title, setTitle] = useState('')
  const [detail, setDetail] = useState('')
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] })
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title) return
    mutation.mutate({ title, detail, completed: false })
    setTitle('')
    setDetail('')
  }

  return (
    <Box as="form" onSubmit={handleSubmit} mb={6}>
      <Stack direction={{ base: 'column', md: 'row' }} gap={3}>
        <Input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
          required
          flex={1}
        />
        <Input
          type="text"
          value={detail}
          onChange={e => setDetail(e.target.value)}
          placeholder="Detail"
          flex={1}
        />
        <Button
          type="submit"
          colorScheme="blue"
          loading={mutation.isPending}
        >
          {mutation.isPending ? 'Adding...' : 'Add'}
        </Button>
      </Stack>
    </Box>
  )
}
