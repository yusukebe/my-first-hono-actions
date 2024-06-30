import { createAction } from 'hono/action'
import { factory } from './factory'
import { z } from 'zod'
import { posts } from '../db/schema'

const app = factory.createApp()

const schema = z.object({
  title: z.string().min(1, {
    message: 'Title is required',
  }),
  body: z.string().min(1, {
    message: 'Body is required',
  }),
})

const [action, Component] = createAction(app, async (data, c) => {
  const result = schema.safeParse(data)

  if (result.success) {
    await c.var.db.insert(posts).values({
      title: result.data.title,
      body: result.data.body,
    })
    return c.redirect('/')
  }

  const error = result.error

  return (
    <>
      <label for='inputTitle'>Title</label>
      <input
        type='text'
        id='inputTitle'
        name='title'
        size={20}
        placeholder='Title'
        value={data && data.title}
      />
      {error && (
        <p class='error'>
          {error!.errors.find((e) => e.path.includes('title'))?.message}
        </p>
      )}
      <label for='textarea'>Body</label>
      <textarea cols={40} rows={8} id='textarea' name='body'>
        {data && data.body}
      </textarea>
      {error && (
        <p class='error'>
          {error!.errors.find((e) => e.path.includes('body'))?.message}
        </p>
      )}
      <button type='submit'>Submit</button>
    </>
  )
})

app.get('/create', (c) => {
  return c.render(
    <section>
      <form class='like-form' action={action}>
        <h2>Create a Post</h2>
        <Component />
      </form>
    </section>
  )
})

export default app
