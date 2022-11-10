import { NextFunction, Request, Response } from 'express'
import multer from 'multer'
import { responseError } from '../utils/response';

interface MulterRequest extends Request {
    files: any;
}

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
	upload(req,res, (err)=>{
		const files = (req as MulterRequest).files
		const filesAllowed = ['image/png','image/jpg','image/jpeg']
		
		const isAllowed =  files.every((file: any) => {
			return filesAllowed.includes( file.mimetype )
		})

		if (files.length == 0) {
			return responseError({ res, data: [{ 'files': 'You must upload at least 1 file.' }] })
		}

		if (!isAllowed) {
			return responseError({ res, data: [{ 'files': 'Only .png, .jpg and .jpeg are format allowed!' }] })
		}

		if (err instanceof multer.MulterError) {
			switch (err.code) {
				case 'LIMIT_FILE_SIZE':
					return responseError({ res, data: [{ 'files': "File too large." }] })
				case 'LIMIT_UNEXPECTED_FILE':
					return responseError({ res, data: [{ 'files': "Max 25 files." }] })
				default:
					return responseError({ res, data: [{ 'files': "Error while upload file." }] })
			}
		}

		return next()
	})
}
