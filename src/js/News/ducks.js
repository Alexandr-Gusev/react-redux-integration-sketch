import {sendReq} from "../utils/reqs"

export const PAGE_SIZE = 10

const SHOW_DETAILS = "News/SHOW_DETAILS"
const HIDE_DETAILS = "News/HIDE_DETAILS"
const LOADED = "News/LOADED"

export const showDetails = (id) => ({type: SHOW_DETAILS, id})
export const hideDetails = () => ({type: HIDE_DETAILS})
export const loaded = (items) => ({type: LOADED, items})

const getImgSrc = (cms_url, item) => item.Image.url.indexOf("/") === 0 ? cms_url + item.Image.url : item.Image.url

export const load = (firstNewsId) => (dispatch, getState) => {
	const {common: {userProps: {cms_url}}} = getState()
	const {reqKey, promise} = sendReq(
		cms_url + "/news?_limit=" + PAGE_SIZE + "&_sort=id:desc" + (firstNewsId === undefined ? "" : "&id_lt=" + firstNewsId)
	)
	promise.then(
		response => response.json(),
		error => ({error})
	)
	.then(
		json => {
			if (!Array.isArray(json)) {
				throw JSON.stringify(json)
			}
			dispatch(
				loaded(
					json.map(item => ({
						...item,
						created_at_local: new Date(item.created_at).toLocaleDateString(),
						Image_url: getImgSrc(cms_url, item)
					}))
				)
			)
		},
		error => {
			console.error("Unexpected response: " + JSON.stringify(error))
		}
	)
}

const defaultState = {
	showDetails: false,
	selectedItemId: undefined,
	items: []
}

export const newsReducer = (state = defaultState, action) => {
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
				items: [...state.items, ...action.items]
			}
		default:
			return state
	}
}
