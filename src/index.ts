import express, {Express, Request, Response} from 'express'
import dotenv from 'dotenv'

// Import routes
import publicRouter from './routes/public.route'
import blogRouter from './routes/blog.route'
import notFoundRouter from './routes/404.route'

// Configure env variables
dotenv.config()

const port = process.env.PORT
const enable_blog = process.env.ENABLE_BLOG == 'true'
const blog_route = process.env.BLOG_ROUTE || '/blog'

const app: Express = express()

app.use('/', publicRouter)
if(enable_blog) { app.use(blog_route, blogRouter) }

app.get('*', notFoundRouter)

const listen = () => {
    app.listen(port, () => {
        console.log(`🟢 [server]: cobalt is running at http://localhost:${port}`);
    });
}

const cobalt = { 
    app: app,
    listen
}
export default cobalt




