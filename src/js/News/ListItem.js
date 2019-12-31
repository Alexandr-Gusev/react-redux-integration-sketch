import React from "react"

import {connect} from "react-redux"

import {showDetails} from "./ducks"

export const ListItem = connect(
	null,
	dispatch => {
		return {
			onItemClick: id => dispatch(showDetails(id))
		}
	}
)(({id, time, title, shortText, imgSrc, onItemClick}) => (
	<div id={"news_list_item_" + id} className="news-list-item" onClick={() => onItemClick(id)}>
		<img className="news-list-item-img" src={imgSrc} />
		<div className="news-list-item-body">
			<div className="news-list-item-title">{title}</div>
			<div className="news-list-item-time">{time}</div>
			<div className="news-list-item-short-text">{shortText}</div>
		</div>
	</div>
))
