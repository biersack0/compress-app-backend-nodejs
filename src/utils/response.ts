import { Response } from 'express'

interface parameters {
    res:        Response;
    status?: string;
    message?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?:      any;
}

export const responseSuccess = ({ res, message = 'success',status = '200', data = {} }: parameters) => {
	return res.status(Number(status)).json({
		data,
		message,
		status
	})
}

export const responseError = ({ res, message = 'error',status = '400', data = {} }: parameters) => {
	if (data) {
		return res.status(Number(status)).json({
			errors: data,
			message,
			status
		}) 
	}
    
	return res.status(Number(status)).json({
		message,
		status
	})
}