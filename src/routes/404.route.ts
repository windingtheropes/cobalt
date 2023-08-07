import {Router, Request, Response} from 'express'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
const router: Router = Router()

dotenv.config()
const enable_404 = process.env.ENABLE_404 == 'true'
const path_404 = (() => {
    let p = process.env.PATH_404 || ''
    if(!fs.existsSync(p) && enable_404) {
        console.log(`🔴 [404 router]: the specified 404 page ${p} does not exist`);
        console.log(`🔴 [server]: exiting with code 1`);
        process.exit()
    }
    return path.resolve(p)
})()

if(enable_404) {
    router.get('*', (req: Request, res: Response) => {
        return res.sendFile(path_404)
    })
}

export default router;