import { createFactory } from 'hono/factory'
import { renderer } from './renderer'

export const factory = createFactory({
  initApp: (app) => {
    app.use(renderer)
  },
})
