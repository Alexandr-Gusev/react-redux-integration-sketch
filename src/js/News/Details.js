import React from "react";

import {connect} from "react-redux";

import {Button} from "@material-ui/core";

import {hideDetails} from "./ducks";
import {qsTr} from "../utils/qsTr";

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
			<div className="News-Details-header">
				<div className="News-Details-title">{item.Title}</div>
				<div className="News-Details-all-news">
					<Button variant="outlined" color="primary" onClick={() => onAllNewsClick()}>{qsTr("All news")}</Button>
				</div>
			</div>
			<div className="News-Details-header-suffix">
				<div className="News-Details-short-text">
					<div>
						<img className="News-Details-quotes" src="/static/img2/quotes.svg" />
					</div>
					{item.ShortText}
				</div>
				<div>
					<img className="News-Details-img" src={item.Image_url} />
				</div>
			</div>
			<div className="News-Details-long-text">{item.LongText}</div>
			<div className="News-Details-time">{qsTr("Date") + ": " + item.created_at_local}</div>
		</div>
	)
);
