import { revalidate, useSWR } from 'sswr'
import http from '$lib/http'
import type { HttpError } from '$lib/http'
import { derived, writable, get } from 'svelte/store'

export interface AuthUser {
	name: string
	email: string
}

export interface AuthLogin {
	email: string
	password: string
}

export interface AuthRegister {
	name: string
	email: string
	password: string
	password_confirmation: string
}

export const authentication = () => {
	const {
		data: user,
		error,
		isLoading,
		isValid,
		clear,
		revalidate
	} = useSWR<AuthUser, Response>('http://auth.test/api/user', {
		fetcher: (key: string) => http.get(key).then((res) => res.data)
	})

	const isAuthenticated = derived(user, (user) => user !== undefined)
	const loginError = writable<HttpError>(undefined)
	const registerError = writable<HttpError>(undefined)

	const login = async (credentials: AuthLogin) => {
		if (get(isAuthenticated)) return
		await http.get('/sanctum/csrf-cookie')
		await http.post<AuthUser>('/login', credentials).catch((error: HttpError) => {
			loginError.set(error)
			return Promise.reject(error)
		})
		loginError.set(undefined)
		revalidate()
	}

	const register = async (credentials: AuthRegister) => {
		if (get(isAuthenticated)) return
		await http.post<AuthUser>('/register', credentials).catch((error: HttpError) => {
			registerError.set(error)
			return Promise.reject(error)
		})
		registerError.set(undefined)
		revalidate()
	}

	const logout = async () => {
		if (!get(isAuthenticated)) return
		await http.post('/logout')
		clear({ broadcast: true })
		revalidate()
	}

	return {
		user,
		isAuthenticated,
		isLoading,
		isValid,
		error,
		login,
		register,
		logout,
		loginError,
		registerError
	}
}
