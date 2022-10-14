import { ValidationError, validationResult } from 'express-validator'
import { NextFunction, Request, Response } from 'express'
import { responseError } from '../utils/response';

export const validateFields = ( req:Request, res: Response, next:NextFunction ) => {
	const errorFormatter = ({ msg, param }: ValidationError) => {
		return {
			[param]:`${msg}`
		}
	}

	const errors = validationResult(req).formatWith(errorFormatter)
	
	if( !errors.isEmpty() ) return responseError({ res, data: errors.array() })
	next()
	return
}