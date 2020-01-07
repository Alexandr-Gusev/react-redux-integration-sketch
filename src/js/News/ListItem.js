import React from "react";

import {connect} from "react-redux";

import {showDetails} from "./ducks";

export const ListItem = connect(
	null,
	dispatch => ({
		onItemClick: id => dispatch(showDetails(id))
	})
)(
	({item, onItemClick}) => (
		<div className="News-ListItem" onClick={() => onItemClick(item)}>
			<div>
				<img className="News-ListItem-img" src={item.Image_url} />
			</div>
			<div className="News-ListItem-body">
				<div className="News-ListItem-title">{item.Title}</div>
				<div className="News-ListItem-time">{item.created_at_local}</div>
				<div className="News-ListItem-short-text">{item.ShortText}</div>
			</div>
		</div>
	)
);
