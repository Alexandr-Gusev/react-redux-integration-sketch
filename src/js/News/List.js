import React from "react"

import {useEffect} from "react"
import {connect} from "react-redux"

import {Button} from "@material-ui/core"

import {PAGE_SIZE, load} from "./ducks"
import {ListItem} from "./ListItem"

export const List = connect(
	state => ({
		selectedItemId: state.news.selectedItemId,
		items: state.news.items
	}),
	dispatch => ({
		onGetMoreClick: (firstNewsId) => dispatch(load(firstNewsId))
	})
)(
	({selectedItemId, items, onStartup, onGetMoreClick}) => {
		useEffect(() => {
			const e = document.getElementById("news_list_item_" + selectedItemId)
			if (e) {
				e.scrollIntoView()
			}
		}, [])
		const firstNewsId = items.length === 0 ? undefined : items[items.length - 1].id
		return (
			<div>
				<h1>{qsTr("News")}</h1>
				<div className="news-list-scroll-area">
					{items.map(item => <ListItem key={item.id} {...item} />)}
					{
						items.length % PAGE_SIZE === 0 &&
						<div className="news-list-get-more">
							<Button variant="outlined" color="primary" onClick={() => onGetMoreClick(firstNewsId)}>{qsTr("Get more")}</Button>
						</div>
					}
				</div>
			</div>
		)
	}
)
