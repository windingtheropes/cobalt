import {Router, Request, Response} from 'express'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
const router: Router = Router()

dotenv.config()
const enable_blog = process.env.ENABLE_BLOG == 'true'
const blog_dir = (() => {
    let d = process.env.BLOG_DIR || ''
    if(!fs.existsSync(d) && enable_blog) {
        console.log(`🔴 [blog router]: the specified blog directory ${d} does not exist`);
        console.log(`🔴 [server]: exiting with code 1`);
        process.exit()
    }
    return path.resolve(d)
})()

if(enable_blog) {
    
}

export default router;