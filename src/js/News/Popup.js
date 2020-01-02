import React from "react"

import {connect} from "react-redux"

import {IconButton} from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import {Button} from "@material-ui/core"

import {hidePopup, showNews} from "./ducks"

export const Popup = connect(
	state => ({
		item: state.news.popupItem
	}),
	dispatch => ({
		onCloseClick: () => dispatch(hidePopup()),
		onMoreDetailsClick: () => dispatch(showNews())
	})
)(
	({item, onCloseClick, onMoreDetailsClick}) => (
		item !== undefined &&
		(
			<div className="News-popup-wrapper">
				<div className="News-popup-header">
					<div className="News-popup-title">{qsTr("New article on the News page")}</div>
					<div className="News-popup-close">
						<IconButton size="small" onClick={() => onCloseClick()}>
							<CloseIcon fontSize="small" />
						</IconButton>
					</div>
				</div>
				<div className="News-popup-body">
					<div className="News-popup-img-prefix">
						<div className="News-popup-item-title">{item.Title}</div>
						<div className="News-popup-more-details">
							<Button variant="contained" color="secondary" onClick={() => onMoreDetailsClick()}>{qsTr("More details")}</Button>
						</div>
					</div>
					<div>
						<img className="News-popup-img" src="/img2/News-popup.svg" />
					</div>
				</div>
			</div>
		)
	)
)
