import { count, desc, eq } from 'drizzle-orm'
import { createAction } from 'hono/action'
import { showRoutes } from 'hono/dev'
import { likes, posts } from '../db/schema'
import subApp from './create'
import { factory } from './factory'

const app = factory.createApp()
app.route('/', subApp)

const [action, Component] = createAction(app, async (data, c, props) => {
  if (data) {
    await c.var.db.insert(likes).values({
      postId: data.postId,
    })
  }
  const result = await c.var.db
    .select({ count: count() })
    .from(likes)
    .where(eq(likes.postId, props.postId))
  return (
    <>
      <input type='hidden' name='postId' value={props.postId} />
      <button>👍 {result[0].count}</button>
    </>
  )
})

app.get('/', async (c) => {
  const result = await c.var.db
    .select()
    .from(posts)
    .orderBy(desc(posts.createdAt))
  return c.render(
    <section>
      {result.map((post, index) => {
        const likeAction = action(index)
        return (
          <aside>
            <h2>{post.title}</h2>
            <div>{post.body}</div>
            <form action={likeAction}>
              <Component postId={post.id} action={likeAction} />
            </form>
          </aside>
        )
      })}
    </section>
  )
})

showRoutes(app)

export default app
