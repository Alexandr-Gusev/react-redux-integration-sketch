import React from "react"

export const ErrorAll = () => (
	<div className="error-all-body">
		<img className="error-all-img" src="/img2/error-all.svg" />
		<div className="error-all-text">
			{qsTr("Sorry, page is temporarily unavailable.")}<br />
			{qsTr("Please try again later.")}
		</div>
	</div>
)
