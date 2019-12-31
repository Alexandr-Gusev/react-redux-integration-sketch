import React from "react"

import {connect} from "react-redux"

import {showDetails} from "./ducks"

export const ListItem = connect(
	null,
	dispatch => ({
		onItemClick: id => dispatch(showDetails(id))
	})
)(
	({id, created_at_local, Title, ShortText, Image_url, onItemClick}) => (
		<div id={"news_list_item_" + id} className="news-list-item" onClick={() => onItemClick(id)}>
			<img className="news-list-item-img" src={Image_url} />
			<div className="news-list-item-body">
				<div className="news-list-item-title">{Title}</div>
				<div className="news-list-item-time">{created_at_local}</div>
				<div className="news-list-item-short-text">{ShortText}</div>
			</div>
		</div>
	)
)
