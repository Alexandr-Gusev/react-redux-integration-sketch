import React from "react"

import {useState} from "react"
import {connect} from "react-redux"

import {Button} from "@material-ui/core"

import {hideDetails} from "./ducks"

export const Details = connect(
	state => {
		return {
			...state.news.news.find(item => item.id === state.news.selectedItemId)
		}
	},
	dispatch => {
		return {
			onAllNewsClick: () => dispatch(hideDetails())
		}
	}
)(({time, title, shortText, longText, imgSrc, onAllNewsClick}) => (
	<div>
		<div className="news-details-title">{title}</div>
		<div className="news-details-all-news">
			<Button variant="contained" color="primary" onClick={() => onAllNewsClick()}>{qsTr("All news")}</Button>
		</div>
		<div className="news-details-preview">
			<div className="news-details-short-text">{shortText}</div>
			<img className="news-details-img" src={imgSrc} />
		</div>
		<div className="news-details-long-text">{longText}</div>
		<div className="news-details-time">{time}</div>
	</div>
))
