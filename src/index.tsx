import { createForm } from 'hono/action'
import { factory } from './factory'

const app = factory.createApp()

const [Component] = createForm(app, (data) => {
  const count = data ? Number(data.count) + 1 : 0
  return (
    <>
      <input type='hidden' value={count} name='count' />
      <button>👍 {count} </button>
    </>
  )
})

app.get('/', (c) => {
  return c.render(<Component />)
})

export default app
