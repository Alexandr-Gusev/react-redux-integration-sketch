import React from "react"

import {connect} from "react-redux"

import {showDetails} from "./ducks"

export const ListItem = connect(
	null,
	dispatch => ({
		onItemClick: id => dispatch(showDetails(id))
	})
)(
	({item, onItemClick}) => (
		<div id={"news_list_item_" + item.id} className="news-list-item" onClick={() => onItemClick(item)}>
			<div>
				<img className="news-list-item-img" src={item.Image_url} />
			</div>
			<div className="news-list-item-body">
				<div className="news-list-item-title">{item.Title}</div>
				<div className="news-list-item-time">{item.created_at_local}</div>
				<div className="news-list-item-short-text">{item.ShortText}</div>
			</div>
		</div>
	)
)
