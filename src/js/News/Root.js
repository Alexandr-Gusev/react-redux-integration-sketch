import React from "react"

import {useEffect} from "react"
import {connect} from "react-redux"

import {load} from "./ducks"
import {Details} from "./Details"
import {List} from "./List"

import "../../css/news.css"

export const Root = connect(
	state => {
		return {
			showDetails: state.news.showDetails
		}
	},
	dispatch => {
		return {
			onGetMoreClick: (firstNewsId) => dispatch(load(firstNewsId))
		}
	}
)(({showDetails, onGetMoreClick}) => {
	useEffect(() => onGetMoreClick(), [])
	return showDetails ? <Details /> : <List />
})
