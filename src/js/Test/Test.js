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
		const createData = () => {
			let nodeId = 1
			const data = []
			for (let i = 0; i < 10; i += 1) {
				const item = {nodeId: "_" + nodeId, label: "Device item " + (i + 1), items: []}
				nodeId += 1
				for (let j = 0; j < 10; j += 1) {
					item.items.push({nodeId: "_" + nodeId, label: "Channel item " + (i + 1) + " " + (j + 1), items: []})
					nodeId += 1
				}
				data.push(item)
			}
			return data
		}
		const [data] = useState(createData())
		const createNode = node => (
			<div>
				{node === undefined ? (
					<TreeView
						expanded={expanded}
						onNodeToggle={handleChange}
					>
						{data.map(item => createNode(item))}
					</TreeView>
				) : (
					<TreeItem nodeId={node.nodeId} key={node.nodeId} label={node.label}>
						{node.items.map(item => createNode(item))}
					</TreeItem>
				)}
			</div>
		)
		return (
			<div>
				{createNode()}
			</div>
		)
	}
)
