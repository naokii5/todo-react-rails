import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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
    <form onSubmit={handleSubmit} className="mb-6 flex flex-col md:flex-row gap-3">
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
        required
        className="border border-gray-300 rounded-lg p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="text"
        value={detail}
        onChange={e => setDetail(e.target.value)}
        placeholder="Detail"
        className="border border-gray-300 rounded-lg p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        disabled={mutation.isPending}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded-lg disabled:opacity-50 transition-colors"
      >
        {mutation.isPending ? 'Adding...' : 'Add'}
      </button>
    </form>
  )
}
