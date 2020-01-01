import React from "react"

import {combineReducers, createStore, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {render} from "react-dom"
import {Provider} from "react-redux"

import {ThemeProvider} from "@material-ui/core/styles"

import {commonReducer, setUserProps} from "./common"
import {newsReducer, News, load} from "./News"

import {mainTheme} from "./themes"
import "../css/common.css"

const rootReducer = combineReducers({
	common: commonReducer,
	news: newsReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

document.addEventListener(
	"user-props",
	e => {
		switch (e.action) {
			case "set":
				store.dispatch(setUserProps(e.userProps))
				break
		}
	}
)

document.addEventListener(
	"news",
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
				break
			case "update":
				store.dispatch(load())
				break
		}
	}
)
