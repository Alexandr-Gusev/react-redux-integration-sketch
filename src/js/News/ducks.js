import {sendReq} from "../utils/reqs"

export const PAGE_SIZE = 10

const SHOW_WAIT_ALL = "News/SHOW_WAIT_ALL"
const SHOW_ERROR_ALL = "News/SHOW_ERROR_ALL"
const SHOW_WAIT_SLICE = "News/SHOW_WAIT_SLICE"
const SHOW_ERROR_SLICE = "News/SHOW_ERROR_SLICE"
const HIDE_ERROR_SLICE = "News/HIDE_ERROR_SLICE"
const SHOW_DETAILS = "News/SHOW_DETAILS"
const HIDE_DETAILS = "News/HIDE_DETAILS"
const LOADED = "News/LOADED"

export const showWaitAll = () => ({type: SHOW_WAIT_ALL})
export const showErrorAll = () => ({type: SHOW_ERROR_ALL})
export const showWaitSlice = () => ({type: SHOW_WAIT_SLICE})
export const showErrorSlice = () => ({type: SHOW_ERROR_SLICE})
export const hideErrorSlice = () => ({type: HIDE_ERROR_SLICE})
export const showDetails = item => ({type: SHOW_DETAILS, item})
export const hideDetails = () => ({type: HIDE_DETAILS})
export const loaded = items => ({type: LOADED, items})

const getImgSrc = (cms_url, item) => item.Image.url.indexOf("/") === 0 ? cms_url + item.Image.url : item.Image.url

export const load = firstNewsId => (dispatch, getState) => {
	const {common: {userProps: {cms_url}}} = getState()
	const {reqKey, promise} = sendReq(
		cms_url + "/news?_limit=" + (PAGE_SIZE + 1) + "&_sort=id:desc" + (firstNewsId === undefined ? "" : "&id_lt=" + firstNewsId)
	)
	dispatch(firstNewsId ? showWaitSlice() : showWaitAll())
	promise
	.then(
		response => response.json()
	)
	.then(
		json => {
			if (!Array.isArray(json)) {
				throw "Unexpected response: " + JSON.stringify(json)
			}
			dispatch(
				loaded(
					json.map(
						item => ({
							...item,
							created_at_local: new Date(item.created_at).toLocaleDateString(),
							Image_url: getImgSrc(cms_url, item)
						})
					)
				)
			)
		}
	)
	.then(
		null,
		error => {
			dispatch(firstNewsId ? showErrorSlice() : showErrorAll())
			console.error("Unexpected response: ", error)
		}
	)
}

const defaultState = {
	showWaitAll: false,
	showErrorAll: false,
	showWaitSlice: false,
	showErrorSlice: false,
	showDetails: false,
	selectedItem: {},
	items: [],
	moreItemsAvailable: false
}

const appendItems = (items, slice) => {
	let res
	if (!items.length || (slice.length > 0 && slice[0].id > items[0].id)) {
		res = slice.slice(0, PAGE_SIZE)
	} else if (!slice.length || items[0].id === slice[0].id) {
		res = items.slice(0, PAGE_SIZE)
	} else {
		res = [...items, ...slice.slice(0, PAGE_SIZE)]
	}
	return res
}

export const newsReducer = (state = defaultState, action) => {
	switch (action.type) {
		case SHOW_WAIT_ALL:
			return {
				...state,
				showWaitAll: true,
				showErrorAll: false,
				showWaitSlice: false,
				showErrorSlice: false,
				showDetails: false,
				selectedItem: {}
			}
		case SHOW_ERROR_ALL:
			return {
				...state,
				showWaitAll: false,
				showErrorAll: true
			}
		case SHOW_WAIT_SLICE:
			return {
				...state,
				showWaitSlice: true,
				showErrorSlice: false
			}
		case SHOW_ERROR_SLICE:
			return {
				...state,
				showWaitSlice: false,
				showErrorSlice: true
			}
		case HIDE_ERROR_SLICE:
			return {
				...state,
				showErrorSlice: false
			}
		case SHOW_DETAILS:
			return {
				...state,
				showDetails: true,
				selectedItem: action.item
			}
		case HIDE_DETAILS:
			return {
				...state,
				showDetails: false
			}
		case LOADED:
			return {
				...state,
				showWaitAll: false,
				showWaitSlice: false,
				items: appendItems(state.items, action.items),
				moreItemsAvailable: action.items.length > PAGE_SIZE
			}
		default:
			return state
	}
}
