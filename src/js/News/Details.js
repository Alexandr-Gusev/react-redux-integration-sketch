import React from "react"

import {useState} from "react"
import {connect} from "react-redux"

import {Button} from "@material-ui/core"

import {hideDetails} from "./ducks"

export const Details = connect(
	state => ({
		item: state.news.selectedItem
	}),
	dispatch => ({
		onAllNewsClick: () => dispatch(hideDetails())
	})
)(
	({item, onAllNewsClick}) => (
		<div>
			<div className="news-details-header">
				<div className="news-details-title">{item.Title}</div>
				<div className="news-details-all-news">
					<Button variant="outlined" color="primary" onClick={() => onAllNewsClick()}>{qsTr("All news")}</Button>
				</div>
			</div>
			<div className="news-details-body-prefix">
				<div className="news-details-short-text">
					<div>
						<img className="news-details-quotes" src="/img2/quotes.svg" />
					</div>
					{item.ShortText}
				</div>
				<div>
					<img className="news-details-img" src={item.Image_url} />
				</div>
			</div>
			<div className="news-details-long-text">{item.LongText}</div>
			<div className="news-details-time">{qsTr("Date") + ": " + item.created_at_local}</div>
		</div>
	)
)
