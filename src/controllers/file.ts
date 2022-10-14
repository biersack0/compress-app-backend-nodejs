import { Request, Response } from 'express'
import admzip from 'adm-zip'
import fs from 'fs'
import * as pathExport from 'path'
import { compressImage, deleteFileFromPath, removeDateSymbolFromName } from '../utils/utils';

interface MulterRequest extends Request {
    files: any;
}

interface File {
	filename: string;
	path: string;
}

const compress = (req: Request, res: Response) => {
	const quality: number = req.query['quality'] as unknown as number
	const formatFilename: boolean = req.query['format-filename'] as unknown as boolean
	const ajustImage: boolean = req.query['ajust-image'] as unknown as boolean

	const files = (req as MulterRequest).files
	const zip = new admzip()
	const outputZipPath = `./src/temp/optimized/${Date.now()}-output.zip`

	files.forEach(async ({filename, path}: File, index:number) =>{
		let filenameConverted = filename.split('.').slice(0, -1) + '.webp'
		const localPath = `./src/temp/optimized/${filenameConverted}`

		await compressImage(path, filename, quality, ajustImage).then(() =>{
			if (formatFilename) {
				filenameConverted = filenameConverted.toLowerCase().replace(' ', '-')
			}
			
			zip.addLocalFile(localPath, undefined, removeDateSymbolFromName(filenameConverted))
		}).finally(() =>{
			deleteFileFromPath(path)
			deleteFileFromPath(localPath)
		})

		if ((files.length - 1) == index ){
			fs.writeFileSync(outputZipPath, zip.toBuffer())

			res.setHeader('Content-Type', 'form-data; charset=UTF-8')
			res.download(pathExport.join(__dirname, '../../', outputZipPath), (_err)=>{
				deleteFileFromPath(outputZipPath)
			})
			return
		}
	})
}

export { compress }