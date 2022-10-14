import { NextFunction, Request, Response } from 'express'
import multer from 'multer'
import { responseError } from '../utils/response';

const storage = multer.diskStorage({
	destination: (_req, _file, cb)=>{
		cb(null, './src/temp')
	},
	filename: (_req, file,cb)=>{
		const { originalname } = file
		cb(null, `${Date.now()}-|-${originalname}`)
	}
})

const upload = multer({ 
	storage,
	limits: { fileSize: 1 * 1024 * 1024 * 7 }, //7MB
	fileFilter: (_req, file, cb) => {
        if (['image/png','image/jpg','image/jpeg'].includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(null, false);
            const err = new Error('Only .png, .jpg and .jpeg format allowed!')
            err.name = 'ExtensionError'
            return cb(err);
        }
    }
}).array('files', 25) //max 25 files

export const validateFile = (req:Request, res: Response, next:NextFunction) => {
	upload(req, res, (err)=>{
		if (err) {
			switch (err.name) {
				case "MulterError":
					if (err.code === "LIMIT_FILE_SIZE") {
						responseError({ res, data: [{ 'files': "File too large" }] })
						break
					} else {
						responseError({ res, data: [{ 'files': "You can upload only 1 files" }] })
						break
					}
				case "ExtensionError":
					responseError({ res, data: [{ 'files': err.message }] })
					break
				default:
					responseError({ res, data: [{ 'files': "Error" }] })
					break;
			}
		} else if (req.files == undefined || req.files.length == 0) {
			responseError({ res, data: [{ 'files': 'The files are required' }] })
		} else{
			next()
		}
	})
}
