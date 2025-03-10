import { PayloadAction } from '@reduxjs/toolkit'
import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	fetchBaseQuery,
} from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'

type AppExtra = {
	req?: {
		cookies?: Record<string, string>
	}
}

const isAppExtra = (extra: unknown): extra is AppExtra => {
	return typeof extra === 'object' && extra !== null
}

const mutex = new Mutex()
const baseQuery = fetchBaseQuery({
	baseUrl: 'https://inctagram.work/api/',
	credentials: 'include',
	prepareHeaders: (headers, { extra }) => {
		let accessToken: string | undefined

		if (typeof window === 'undefined' && isAppExtra(extra) && extra?.req) {
			accessToken = extra.req.cookies?.accessToken
		} else if (typeof document !== 'undefined') {
			accessToken = document.cookie.split('accessToken=')[1]
		}

		if (accessToken) {
			headers.set('Authorization', `Bearer ${accessToken}`)
		}

		return headers
	},
})

export const baseQueryWithReauth =
	(
		action: PayloadAction
	): BaseQueryFn<FetchArgs | string, unknown, FetchBaseQueryError> =>
	async (args, api, extraOptions) => {
		await mutex.waitForUnlock()
		let result = await baseQuery(args, api, extraOptions)

		if (result.error && result.error.status === 401) {
			if (!mutex.isLocked()) {
				const release = await mutex.acquire()

				try {
					const refreshResult = (await baseQuery(
						{ method: 'POST', url: '/v1/auth/update-tokens' },
						api,
						extraOptions
					)) as any

					if (refreshResult.data) {
						const token = refreshResult.data.accessToken

						document.cookie = `accessToken=${token};max-age=2678400;secure;path=/;samesite=lax`
						result = await baseQuery(args, api, extraOptions)
					} else {
						api.dispatch(action)
						document.cookie =
							'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
					}
				} finally {
					release()
				}
			} else {
				await mutex.waitForUnlock()
				result = await baseQuery(args, api, extraOptions)
			}
		}

		return result
	}
