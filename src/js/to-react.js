import React from "react"

import {combineReducers, createStore, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {render} from "react-dom"
import {Provider} from "react-redux"

import {ThemeProvider} from "@material-ui/core/styles"

import {commonReducer, setUserProps} from "./user-props"
import {newsReducer, News, NewsPopup, load, showPopupIfNeeded} from "./News"

import {mainTheme} from "./themes"
import "../css/common.css"

const rootReducer = combineReducers({
	common: commonReducer,
	news: newsReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

document.addEventListener(
	"react-user-props",
	e => {
		switch (e.action) {
			case "set":
				store.dispatch(setUserProps(e.userProps))
				break
		}
	}
)

document.addEventListener(
	"react-news",
	e => {
		switch (e.action) {
			case "render":
				render(
					<Provider store={store}>
						<ThemeProvider theme={mainTheme}>
							<div className="root">
								<News />
							</div>
						</ThemeProvider>
					</Provider>,
					document.getElementById("news")
				)
				render(
					<Provider store={store}>
						<ThemeProvider theme={mainTheme}>
							<div className="root">
								<NewsPopup />
							</div>
						</ThemeProvider>
					</Provider>,
					document.getElementById("news-popup")
				)
				break
			case "update":
				store.dispatch(load())
				break
			case "show-popup-if-needed":
				store.dispatch(showPopupIfNeeded())
				break
		}
	}
)
