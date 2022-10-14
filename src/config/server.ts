import express, { Application } from 'express'
import cors from 'cors'
import 'dotenv/config'
import routes from '../routes'

class Server {
	port: string | number
	app: Application

	constructor() {
		this.app = express()
		this.port = process.env.PORT || 3000

		this.middlewares()
		this.routes()
	}

	middlewares() {
		this.app.use(cors())
		this.app.use(express.json())
	}
	
	routes(){
		this.app.get('/',(_req, res) => {res.json({"message": "test", "status": "200"})})
		this.app.use('/api', routes)
	}

	listen(){
		this.app.listen(this.port, ()=>{
			console.log(`Server running on port ${this.port}`)
		})
	}
}

export { Server }