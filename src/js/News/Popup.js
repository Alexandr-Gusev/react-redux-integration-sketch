import React from "react"

import {connect} from "react-redux"

import {IconButton, Button} from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"

import {hidePopup, showNews} from "./ducks"
import {qsTr} from "../utils/qsTr"

export const Popup = connect(
	state => ({
		lastUnreadItem: state.news.lastUnreadItem
	}),
	dispatch => ({
		onCloseClick: () => dispatch(hidePopup()),
		onMoreDetailsClick: () => dispatch(showNews())
	})
)(
	({lastUnreadItem, onCloseClick, onMoreDetailsClick}) => (
		lastUnreadItem !== undefined
		&& (
			<div className="News-Popup">
				<div className="News-Popup-header">
					<div className="News-Popup-caption">{qsTr("New article on the News page")}</div>
					<div className="News-Popup-close">
						<IconButton size="small" onClick={() => onCloseClick()}>
							<CloseIcon fontSize="small" />
						</IconButton>
					</div>
				</div>
				<div className="News-Popup-body">
					<div className="News-Popup-img-prefix">
						<div className="News-Popup-title">{lastUnreadItem.Title}</div>
						<div className="News-Popup-more-details">
							<Button variant="contained" color="secondary" onClick={() => onMoreDetailsClick()}>{qsTr("More details")}</Button>
						</div>
					</div>
					<div>
						<img className="News-Popup-img" src="/img2/News-Popup.svg" />
					</div>
				</div>
			</div>
		)
	)
)
