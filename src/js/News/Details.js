import React from "react"

import {useState} from "react"
import {connect} from "react-redux"

import {Button} from "@material-ui/core"

import {hideDetails} from "./ducks"

export const Details = connect(
	state => ({
		...state.news.items.find(item => item.id === state.news.selectedItemId)
	}),
	dispatch => ({
		onAllNewsClick: () => dispatch(hideDetails())
	})
)(
	({created_at_local, Title, ShortText, LongText, Image_url, onAllNewsClick}) => (
		<div>
			<div className="news-details-title">{Title}</div>
			<div className="news-details-all-news">
				<Button variant="outlined" color="primary" onClick={() => onAllNewsClick()}>{qsTr("All news")}</Button>
			</div>
			<div className="news-details-preview">
				<div className="news-details-short-text">{ShortText}</div>
				<img className="news-details-img" src={Image_url} />
			</div>
			<div className="news-details-long-text">{LongText}</div>
			<div className="news-details-time">{created_at_local}</div>
		</div>
	)
)
