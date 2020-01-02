import React from "react"

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
			<div className="News-details-header">
				<div className="News-details-title">{item.Title}</div>
				<div className="News-details-all-news">
					<Button variant="outlined" color="primary" onClick={() => onAllNewsClick()}>{qsTr("All news")}</Button>
				</div>
			</div>
			<div className="News-details-header-suffix">
				<div className="News-details-short-text">
					<div>
						<img className="News-details-quotes" src="/img2/quotes.svg" />
					</div>
					{item.ShortText}
				</div>
				<div>
					<img className="News-details-img" src={item.Image_url} />
				</div>
			</div>
			<div className="News-details-long-text">{item.LongText}</div>
			<div className="News-details-time">{qsTr("Date") + ": " + item.created_at_local}</div>
		</div>
	)
)
