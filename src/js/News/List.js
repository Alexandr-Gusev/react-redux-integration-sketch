import React from "react"

import {useEffect} from "react"
import {connect} from "react-redux"

import {Button} from "@material-ui/core"

import {load, hideErrorSlice} from "./ducks"
import {WaitAll} from "./WaitAll"
import {ErrorAll} from "./ErrorAll"
import {ListItem} from "./ListItem"
import {WaitSlice} from "./WaitSlice"
import {ErrorSlice} from "./ErrorSlice"

export const List = connect(
	state => ({
		showWaitAll: state.news.showWaitAll,
		showErrorAll: state.news.showErrorAll,
		showWaitSlice: state.news.showWaitSlice,
		showErrorSlice: state.news.showErrorSlice,
		items: state.news.items,
		moreItemsAvailable: state.news.moreItemsAvailable
	}),
	dispatch => ({
		onGetMoreClick: firstNewsId => dispatch(load(firstNewsId)),
		hideErrorSlice: () => dispatch(hideErrorSlice())
	})
)(
	({
		showWaitAll,
		showErrorAll,
		showWaitSlice,
		showErrorSlice,
		items,
		moreItemsAvailable,
		onGetMoreClick,
		hideErrorSlice
	}) => {
		if (showErrorSlice) {
			useEffect(
				() => {
					setTimeout(
						() => {
							hideErrorSlice()
						},
						5000
					)
				}
			)
		}
		const firstNewsId = items.length === 0 ? undefined : items[items.length - 1].id
		return (
			<div>
				<div style={{display: showWaitAll ? "" : "none"}}>
					<WaitAll />
				</div>
				<div style={{display: showErrorAll ? "" : "none"}}>
					<ErrorAll />
				</div>
				<div className="news-wrapper" style={{display: !showWaitAll && !showErrorAll ? "" : "none"}}>
					<h1 className="news-header">{qsTr("News")}</h1>
					<div className="news-body">
						{items.map(item => <ListItem key={item.id} item={item} />)}
						{
							moreItemsAvailable &&
							(
								<div className="news-list-get-more">
									<div style={{display: showWaitSlice ? "" : "none"}}>
										<WaitSlice />
									</div>
									<div style={{display: showErrorSlice ? "" : "none"}}>
										<ErrorSlice />
									</div>
									<div style={{display: !showWaitSlice && !showErrorSlice ? "" : "none"}}>
										<Button variant="outlined" color="primary" onClick={() => onGetMoreClick(firstNewsId)}>{qsTr("Get more")}</Button>
									</div>
								</div>
							)
						}
					</div>
				</div>
			</div>
		)
	}
)
