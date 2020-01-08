import React, {useState} from "react";

import {connect} from "react-redux";

import {List} from "react-virtualized";

export const Test = connect()(
	() => {
		const rowRenderer = ({style, index}) => (
			<div key={index} style={style}>
				react-virtualized List item {index}
			</div>
		);
		return (
			<List
				width={300}
				height={300}
				rowCount={10000000}
				rowHeight={35}
				rowRenderer={rowRenderer}
			/>
		);
	}
);
