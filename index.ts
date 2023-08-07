import express, {Express, Request, Response} from 'express'
import dotenv from 'dotenv'

// Import routes
import homeRouter from './src/routes/public.route'
import blogRouter from './src/routes/blog.route'
import notFoundRouter from './src/routes/404.route'

// Configure env variables
dotenv.config()

const app: Express = express()
const port = process.env.PORT
const enable_blog = process.env.ENABLE_BLOG == 'true'

app.use('/', homeRouter)
if(enable_blog) { app.use('/blog', blogRouter) }

app.get('*', notFoundRouter)

app.listen(port, () => {
    console.log(`🟢 [server]: cobalt is running at http://localhost:${port}`);
});