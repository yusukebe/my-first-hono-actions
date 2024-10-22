import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(
  ({ children }) => {
    return (
      <html>
        <head>
          <link href='/static/mvp.css' rel='stylesheet' />
          <link href='/static/style.css' rel='stylesheet' />
        </head>
        <body>
          <header>
            <h1>
              <a href='/'>Nice Blog</a>
            </h1>
            <div>
              <a href='/create'>Create</a>
            </div>
          </header>
          <main>{children}</main>
        </body>
      </html>
    )
  },
  {
    stream: true,
  }
)
