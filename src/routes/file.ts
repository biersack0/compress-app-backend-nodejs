import { Router } from 'express'
import { validateFields, validateFile } from '../middleware';
import { compress } from '../controllers/file';
import { query } from 'express-validator';

const router = Router()

router.post('/',[
	query('quality').toInt().isInt({min: 0, max: 100}).withMessage("You must provide a quality parameter between 0 and 100."),
	query('format-filename').isBoolean().default(false).withMessage("You must provide a parameter true or false."),
	query('ajust-image').isBoolean().default(false),
	validateFields,
	validateFile
], compress)

export { router }