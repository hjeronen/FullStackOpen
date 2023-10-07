import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { 
  useNotificationDispatch,
  showNotification,
  hideNotification 
} from './NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData({ queryKey: ['anecdotes'] })
      queryClient.setQueryData({ queryKey: ['anecdotes'] }, anecdotes.concat(newAnecdote))
    }
  })

  const dispatch = useNotificationDispatch()

  const onCreate = (event) => {
    event.preventDefault()
    const newAnecdote = {
      content: event.target.anecdote.value,
      votes: 0
    }
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(newAnecdote)
    dispatch(showNotification(`added ${newAnecdote.content}`))
    setTimeout(() => {
      dispatch(hideNotification())
    }, '5000')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
