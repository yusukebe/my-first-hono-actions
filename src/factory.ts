import { createFactory } from 'hono/factory'
import { renderer } from './renderer'
import { drizzle } from 'drizzle-orm/d1'

export type Env = {
  Bindings: {
    DB: D1Database
  }
  Variables: {
    db: ReturnType<typeof drizzle>
  }
}

export const factory = createFactory<Env>({
  initApp: (app) => {
    app.use(renderer)
    app.use(async (c, next) => {
      c.set('db', drizzle(c.env.DB))
      await next()
    })
  }
})
