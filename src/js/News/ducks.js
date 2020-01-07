import {sendReq} from "../utils/reqs";

export const PAGE_SIZE = 10;

const SHOW_WAIT_ALL = "News/SHOW_WAIT_ALL";
const SHOW_ERROR_ALL = "News/SHOW_ERROR_ALL";
const SHOW_WAIT_SLICE = "News/SHOW_WAIT_SLICE";
const SHOW_ERROR_SLICE = "News/SHOW_ERROR_SLICE";
const HIDE_ERROR_SLICE = "News/HIDE_ERROR_SLICE";
const SHOW_DETAILS = "News/SHOW_DETAILS";
const HIDE_DETAILS = "News/HIDE_DETAILS";
const LOADED = "News/LOADED";
const SHOW_POPUP = "News/SHOW_POPUP";
const HIDE_POPUP = "News/HIDE_POPUP";

export const showWaitAll = () => ({type: SHOW_WAIT_ALL});
export const showErrorAll = () => ({type: SHOW_ERROR_ALL});
export const showWaitSlice = () => ({type: SHOW_WAIT_SLICE});
export const showErrorSlice = () => ({type: SHOW_ERROR_SLICE});
export const hideErrorSlice = () => ({type: HIDE_ERROR_SLICE});
export const showDetails = item => ({type: SHOW_DETAILS, item});
export const hideDetails = () => ({type: HIDE_DETAILS});
export const loaded = items => ({type: LOADED, items});

const getImgSrc = (cms_url, item) => (item.Image.url.indexOf("/") === 0 ? cms_url + item.Image.url : item.Image.url);

const prepareItem = (cms_url, item) => ({
	...item,
	created_at_local: new Date(item.created_at).toLocaleDateString(),
	Image_url: getImgSrc(cms_url, item)
});

export const load = firstNewsId => (dispatch, getState) => {
	const {common: {userProps: {cms_url}}} = getState();
	let url = cms_url + "/news?_limit=" + (PAGE_SIZE + 1) + "&_sort=id:desc";
	if (firstNewsId !== undefined) {
		url += "&id_lt=" + firstNewsId;
	}
	const {promise} = sendReq(url);
	dispatch(firstNewsId ? showWaitSlice() : showWaitAll());
	promise
		.then(
			response => response.json()
		)
		.then(
			json => {
				if (!Array.isArray(json)) {
					throw new Error("Unexpected response: " + JSON.stringify(json));
				}
				dispatch(
					loaded(
						json.map(
							item => prepareItem(cms_url, item)
						)
					)
				);
			}
		)
		.then(
			null,
			error => {
				dispatch(firstNewsId ? showErrorSlice() : showErrorAll());
				console.error("Unexpected response: ", error);
			}
		);
};

export const showPopup = item => ({type: SHOW_POPUP, item});
export const hidePopup = () => ({type: HIDE_POPUP});

export const showPopupIfNeeded = () => (dispatch, getState) => {
	const {common: {userProps: {cms_url, cloud_url, sid}}} = getState();

	const getLastUnreadNews = lastReadNewsId => {
		const {promise} = sendReq(cms_url + "/news?_limit=1&_sort=created_at:DESC&id_gt=" + lastReadNewsId);
		promise
			.then(
				response => response.json()
			)
			.then(
				json => {
					if (!Array.isArray(json)) {
						throw new Error("Unexpected response: " + JSON.stringify(json));
					}
					if (json.length) {
						dispatch(
							showPopup(
								prepareItem(cms_url, json[0])
							)
						);
					}
				}
			)
			.then(
				null,
				error => {
					console.error("Unexpected response: ", error);
				}
			);
	};

	const getUnreadNewsCount = lastReadNewsId => {
		const {promise} = sendReq(cms_url + "/news/count?id_gt=" + lastReadNewsId);
		promise
			.then(
				response => response.text()
			)
			.then(
				text => {
					const unreadNewsCount = parseInt(text, 10);

					const e = new Event("legacy-news");
					e.action = "set-unread-news-count";
					e.unreadNewsCount = unreadNewsCount;
					document.dispatchEvent(e);

					if (unreadNewsCount > 0) {
						getLastUnreadNews(lastReadNewsId);
					}
				}
			)
			.then(
				null,
				error => {
					console.error("Unexpected response: ", error);
				}
			);
	};

	const getLastReadNewsId = () => {
		const {promise} = sendReq(cloud_url + "/get-last-news-id?sid=" + sid);
		promise
			.then(
				response => response.json()
			)
			.then(
				json => {
					if (json.success) {
						getUnreadNewsCount(json.id);
					}
				}
			)
			.then(
				null,
				error => {
					console.error("Unexpected response: ", error);
				}
			);
	};

	getLastReadNewsId();
};

export const showNews = () => dispatch => {
	dispatch(hidePopup());
	const e = new Event("legacy-News");
	e.action = "show";
	document.dispatchEvent(e);
};

const defaultState = {
	showWaitAll: false,
	showErrorAll: false,
	showWaitSlice: false,
	showErrorSlice: false,
	showDetails: false,
	selectedItem: {},
	items: [],
	moreItemsAvailable: false,
	lastUnreadItem: undefined
};

const appendItems = (items, slice) => {
	let res;
	if (!items.length || (slice.length > 0 && slice[0].id > items[0].id)) {
		res = slice.slice(0, PAGE_SIZE);
	} else if (!slice.length || items[0].id === slice[0].id) {
		res = items.slice(0, PAGE_SIZE);
	} else {
		res = [...items, ...slice.slice(0, PAGE_SIZE)];
	}
	return res;
};

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
		};
	case SHOW_ERROR_ALL:
		return {
			...state,
			showWaitAll: false,
			showErrorAll: true
		};
	case SHOW_WAIT_SLICE:
		return {
			...state,
			showWaitSlice: true,
			showErrorSlice: false
		};
	case SHOW_ERROR_SLICE:
		return {
			...state,
			showWaitSlice: false,
			showErrorSlice: true
		};
	case HIDE_ERROR_SLICE:
		return {
			...state,
			showErrorSlice: false
		};
	case SHOW_DETAILS:
		return {
			...state,
			showDetails: true,
			selectedItem: action.item
		};
	case HIDE_DETAILS:
		return {
			...state,
			showDetails: false
		};
	case LOADED:
		return {
			...state,
			showWaitAll: false,
			showWaitSlice: false,
			items: appendItems(state.items, action.items),
			moreItemsAvailable: (!state.items.length && !action.items.length) || action.items.length > PAGE_SIZE,
			lastUnreadItem: undefined
		};
	case SHOW_POPUP:
		return {
			...state,
			lastUnreadItem: action.item
		};
	case HIDE_POPUP:
		return {
			...state,
			lastUnreadItem: undefined
		};
	default:
		return state;
	}
};
