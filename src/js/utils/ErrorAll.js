import React from "react"

export const ErrorAll = () => (
	<div className="ErrorAll-body">
		<img className="ErrorAll-img" src="/img2/ErrorAll.svg" />
		<div className="ErrorAll-text">
			{qsTr("Sorry, page is temporarily unavailable.")}<br />
			{qsTr("Please try again later.")}
		</div>
	</div>
)
