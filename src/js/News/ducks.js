import {sendReq} from "../utils/reqs"

export const PAGE_SIZE = 10

const SHOW_DETAILS = "News/SHOW_DETAILS"
const HIDE_DETAILS = "News/HIDE_DETAILS"
const LOADED = "News/LOADED"

export function showDetails(id) {
	return {type: SHOW_DETAILS, id}
}

export function hideDetails() {
	return {type: HIDE_DETAILS}
}

export function loaded(news) {
	return {type: LOADED, news}
}

function getImgSrc(cms_url, item) {
	return item.Image.url.indexOf("/") === 0 ? cms_url + item.Image.url : item.Image.url
}

export function load(firstNewsId) {
	return (dispatch, getState) => {
		const {common: {userProps: {cms_url}}} = getState()
		const {reqKey, promise} = sendReq(
			cms_url + "/news.json", // "/news?_limit=" + PAGE_SIZE + "&_sort=id:desc" + (firstNewsId === undefined ? "" : "&id_lt=" + firstNewsId),
			{
				method: "POST"
			}
		)
		promise.then(
			response => response.json(),
			error => ({error})
		)
		.then(
			json => {
				if (!Array.isArray(json)) {
					console.error("Unexpected response: " + json.toString())
				} else {
					dispatch(loaded(json.map(item => ({
						id: item.id,
						time: item.created_at,
						title: item.Title,
						shortText: item.ShortText,
						longText: item.LongText,
						imgSrc: getImgSrc(cms_url, item)
					}))))
				}
			},
			error => {
				console.error("Unexpected response: " + error.toString())
			}
		)
	}
}

const defaultState = {
	showDetails: false,
	selectedItemId: undefined,
	news: []
}

export function newsReducer(state = defaultState, action) {
	switch (action.type) {
		case SHOW_DETAILS:
			return {
				...state,
				showDetails: true,
				selectedItemId: action.id
			}
		case HIDE_DETAILS:
			return {
				...state,
				showDetails: false
			}
		case LOADED:
			return {
				...state,
				news: [...state.news, ...action.news]
			}
		default:
			return state
	}
}
