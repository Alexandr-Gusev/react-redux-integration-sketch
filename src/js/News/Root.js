import React from "react"

import {useEffect} from "react"
import {connect} from "react-redux"

import {load} from "./ducks"
import {Details} from "./Details"
import {List} from "./List"

import "../../css/news.css"

export const Root = connect(
	state => ({
		showDetails: state.news.showDetails
	}),
	dispatch => ({
		onGetMoreClick: (firstNewsId) => dispatch(load(firstNewsId))
	})
)(
	({showDetails, onGetMoreClick}) => {
		useEffect(() => onGetMoreClick(), [])
		return (
			<div>
				<div style={{display: showDetails ? "" : "none"}}>
					<Details />
				</div>
				<div style={{display: !showDetails ? "" : "none"}}>
					<List />
				</div>
			</div>
		)
	}
)
