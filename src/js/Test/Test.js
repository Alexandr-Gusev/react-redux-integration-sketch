import React, {useState} from "react"

import {connect} from "react-redux"

import TreeView from "@material-ui/lab/TreeView"
import TreeItem from "@material-ui/lab/TreeItem"

export const Test = connect()(
	() => {
		const [expanded, setExpanded] = useState([])
		const handleChange = (event, nodes) => {
			setExpanded(nodes)
		}
		let nodeId = 1
		const tree = []
		for (let i = 0; i < 10; i++) {
			const treeItem = {nodeId: "_" + nodeId, label: "Device item " + (i + 1), items: []}
			nodeId++
			for (let j = 0; j < 10; j++) {
				treeItem.items.push({nodeId: "_" + nodeId, label: "Channel item " + (i + 1) + " " + (j + 1), items: []})
				nodeId++
			}
			tree.push(treeItem)
		}
		const gen = (root) => {
			if (!root) {
				return (
					<TreeView
						expanded={expanded}
						onNodeToggle={handleChange}
					>
						{tree.map(item => gen(item))}
					</TreeView>
				)
			} else {
				return (
					<TreeItem nodeId={root.nodeId} key={root.nodeId} label={root.label}>
						{root.items.map(item => gen(item))}
					</TreeItem>
				)
			}
		}
		return (
			<div>
				{gen()}
			</div>
		)
	}
)
