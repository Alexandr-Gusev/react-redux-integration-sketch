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
		<div className="News-list-item" onClick={() => onItemClick(item)}>
			<div>
				<img className="News-list-item-img" src={item.Image_url} />
			</div>
			<div className="News-list-item-body">
				<div className="News-list-item-title">{item.Title}</div>
				<div className="News-list-item-time">{item.created_at_local}</div>
				<div className="News-list-item-short-text">{item.ShortText}</div>
			</div>
		</div>
	)
)
