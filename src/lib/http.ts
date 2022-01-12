import axios from 'axios'
import type { AxiosError } from 'axios'

export interface BackendError {
	message: string
	errors?: {
		[key: string]: string[]
	}
}

export type HttpError = AxiosError<BackendError>

export default axios.create({
	baseURL: 'http://auth.test',
	withCredentials: true,
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		'X-Requested-With': 'XMLHttpRequest'
	}
})
