import React from "react"

import {useState} from "react"
import {connect} from "react-redux"

import TreeView from "@material-ui/lab/TreeView"
import TreeItem from "@material-ui/lab/TreeItem"

export const Details = connect(
)(
	() => {
		const [expanded, setExpanded] = useState([])
		const handleChange = (event, nodes) => {
			setExpanded(nodes)
		}
		let nodeId = 1
		let tree = []
		for (let i = 0; i < 1000; i++) {
			let treeItem = {nodeId: nodeId++, label: "tree item " + (i + 1), items: []}
			for (let j = 0; j < 256; j++) {
				treeItem.items.push({nodeId: nodeId++, label: "tree item " + (i + 1) + " " + (j + 1), items: []})
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
					<TreeItem nodeId={root.nodeId} label={root.label}>
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
