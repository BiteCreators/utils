import { Socket, io } from 'socket.io-client'

let socket: Socket

/**
 * @returns socket io instance
 */
export const getSocket = (wsUrl: string): Socket => {
	if (!socket) {
		const queryParams = {
			query: {
				accessToken: document.cookie.split('accessToken=')[1],
			},
		}

		socket = io(wsUrl || '', queryParams)
	}

	if (socket.disconnected) {
		socket.connect()
	}

	return socket
}
