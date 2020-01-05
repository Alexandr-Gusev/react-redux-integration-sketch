import "@babel/polyfill"
import fetch from "cross-fetch"

let requestCount = 0
const requests = {}

export const abortReq = (reqKey, message) => {
	const request = requests[reqKey]
	if (request) {
		request.reject(message)
		request.controller.abort()
		delete requests[reqKey]
	}
}

export const sendReq = (url, options, timeout = 5000) => {
	const request = {
		controller: new AbortController()
	}
	const promise = new Promise((resolve, reject) => {
		request.reject = reject
		fetch(url, {...options, signal: request.controller.signal}).then(resolve, reject)
	})
	const reqKey = "_" + requestCount
	requestCount++
	requests[reqKey] = request
	setTimeout(
		() => {
			abortReq(reqKey, "timeout")
		},
		timeout
	)
	return {reqKey, promise}
}
