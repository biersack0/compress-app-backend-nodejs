import { Router } from 'express'
import { readdirSync } from 'fs'

const router = Router()
const PATH_ROUTES = __dirname

const removeExtension = (filename: string) =>{
	return filename.split('.').shift()
}

const loadRouter = (file: string) =>{
	const name = removeExtension(file)
	if (name !== 'index') {
		import(`./${file}`).then((routerModule) => {
			router.use(`/${name}`, routerModule.router)
		})
	}
}

readdirSync(PATH_ROUTES).filter((file) => loadRouter(file))

export default router