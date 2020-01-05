import React from "react"

import {connect} from "react-redux"

import {Details} from "./Details"
import {List} from "./List"

import "../../css/News.css"

export const Root = connect(
	state => ({
		showDetails: state.news.showDetails
	})
)(
	({showDetails}) => {
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
