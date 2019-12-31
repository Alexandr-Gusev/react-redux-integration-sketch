import React from "react"

import {useEffect} from "react"
import {connect} from "react-redux"

import {Button} from "@material-ui/core"

import {PAGE_SIZE, load} from "./ducks"
import {ListItem} from "./ListItem"

export const List = connect(
	state => {
		return {
			selectedItemId: state.news.selectedItemId,
			news: state.news.news
		}
	},
	dispatch => {
		return {
			onGetMoreClick: (firstNewsId) => dispatch(load(firstNewsId))
		}
	}
)(({selectedItemId, news, onStartup, onGetMoreClick}) => {
	useEffect(() => {
		const e = document.getElementById("news_list_item_" + selectedItemId)
		if (e) {
			e.scrollIntoView();
		}
	}, [])
	const firstNewsId = news.length === 0 ? undefined : news[news.length - 1].id
	return (
		<div>
			<h1>{qsTr("News")}</h1>
			{news.map(item => <ListItem key={item.id} {...item} />)}
			{
				news.length % PAGE_SIZE === 0 &&
				<div className="news-list-get-more">
					<Button variant="contained" color="primary" onClick={() => onGetMoreClick(firstNewsId)}>{qsTr("Get more")}</Button>
				</div>
			}
		</div>
	)
})
