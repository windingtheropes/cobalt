import {Router, Request, Response} from 'express'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
const router: Router = Router()

dotenv.config()
const public_blacklist = process.env.PUBLIC_BLACKLIST?.toLowerCase().split(',')
const public_remove_ext: boolean = process.env.PUBLIC_REMOVE_EXT == 'true'
const public_dir = (() => {
    let p = process.env.PUBLIC_DIR || ''
    if(!fs.existsSync(p)) {
        console.log(`🔴 [public router]: the specified public directory ${p} does not exist`);
        console.log(`🔴 [server]: exiting with code 1`);
        process.exit()
    }
    return path.resolve(p)
})() 

const readDir = (dir: any) => {
    dir = path.resolve(dir)

    const contents = fs.readdirSync(dir)

    for(const file_name of contents) {
        const full_path = path.resolve(path.join(dir, file_name))
        const route_path: String = (() => {
            let r = full_path.replace(public_dir, '').replaceAll('\\', '/').toLowerCase() 
            if(r.endsWith('index.html')) {
                r = r.slice(0, -'index.html'.length)
            }
            if(r.endsWith('.html') && public_remove_ext) { 
                r = r.slice(0, -'.html'.length)
            }
            return r
        })()
        
        if(public_blacklist?.find(s => s == route_path)) {
            console.log(`🟡 [public router]: not routing ${route_path} (${full_path}), as it matches the public blacklist`);
            continue 
        }
        
        const content_lstat = fs.lstatSync(full_path)

        if(content_lstat.isDirectory()) {
            readDir(full_path)
            continue
        }

        router.get(`${route_path}`, (req: Request, res: Response) => {
            return res.sendFile(full_path)
        })
        console.log(`🔵 [public router]: added route ${route_path}`);
    }
} 
readDir(public_dir)

export default router;