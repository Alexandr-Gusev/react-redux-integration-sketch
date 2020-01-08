import React, {useState} from "react";

import {connect} from "react-redux";

import {List} from "react-virtualized";

export const Test = connect()(
	() => {
		const createTreeData = () => {
			const data = [];
			for (let i = 0; i < 20000; i++) {
				const item = {
					key: "_" + (i + 1),
					label: "Device item " + (i + 1),
					level: 0,
					items: []
				};
				for (let j = 0; j < 32; j++) {
					item.items.push({
						key: "_" + (i + 1) + "_" + (j + 1),
						label: "Channel item " + (i + 1) + " " + (j + 1),
						level: 1,
						items: []
					});
				}
				data.push(item);
			}
			return data;
		};
		const [treeData] = useState(createTreeData());

		const createPlainData = (nodes, expanded = new Set()) => {
			const data = [];
			for (let i = 0; i < nodes.length; i++) {
				data.push(nodes[i]);
				if (expanded.has(nodes[i].key)) {
					data.push(...createPlainData(nodes[i].items, expanded));
				}
			}
			return data;
		};
		const [plainData, setPlainData] = useState(createPlainData(treeData));

		const [expanded, setExpanded] = useState(new Set());

		const handleClick = key => {
			const keys = new Set(expanded);
			if (keys.has(key)) {
				keys.delete(key);
			} else {
				keys.add(key);
			}
			setExpanded(keys);
			setPlainData(createPlainData(treeData, keys));
		};

		const rowRenderer = ({style, index}) => (
			<div
				key={plainData[index].key}
				style={{
					...style,
					paddingLeft: plainData[index].level * 20
				}}
				onClick={
					() => {
						handleClick(plainData[index].key);
					}
				}
			>
				{plainData[index].label}
			</div>
		);

		return (
			<List
				width={300}
				height={300}
				rowCount={plainData.length}
				rowHeight={35}
				rowRenderer={rowRenderer}
			/>
		);
	}
);
