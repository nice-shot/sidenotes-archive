import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Stage, Layer, Image } from 'react-konva'

import '../style/viewer.css'

class ImageViewer extends Component {
	static propTypes = {
		imagePath: PropTypes.string.isRequired,
	}

	state = {
		image: null,
		stageWidth: 500,
		stageHeight: 500,
	}

	constructor(props) {
		super(props)
		this.container = null
	}

	handleResize = () => {
		const stageWidth = this.container.offsetWidth
		const stageHeight = this.container.offsetHeight
		this.setState({ stageWidth, stageHeight })
	}

	handleWheel = e => {
		e.evt.preventDefault()

		let scaleBy = 1.3
		// Zoom out if scroll was down
		if (e.evt.deltaY < 0) {
			scaleBy = 1 / scaleBy
		}

		const stage = e.target.getStage()
		const oldScale = stage.scaleX()
		let pointerPos = stage.getPointerPosition()

		const mousePointTo = {
			x: pointerPos.x / oldScale - stage.x() / oldScale,
			y: pointerPos.y / oldScale - stage.y() / oldScale
		}

		const newScale = oldScale * scaleBy
		stage.scale({x: newScale, y: newScale})
		pointerPos = stage.getPointerPosition()

		const newPos = {
			x: -(mousePointTo.x - pointerPos.x / newScale) * newScale,
			y: -(mousePointTo.y - pointerPos.y / newScale) * newScale
		}

		stage.position(newPos)
		stage.batchDraw()
	}

	componentDidMount() {
		this.handleResize()
		const image = new window.Image()
		image.src = this.props.imagePath
		image.onload = () => {
			this.setState({ image })
		}

		window.addEventListener('resize', this.handleResize)
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize)
	}

	render() {
		return (
			<div
				className="view-container"
				ref={node => { this.container = node }}
			>
				<Stage
					width={this.state.stageWidth}
					height={this.state.stageHeight}
					draggable
					onWheel={this.handleWheel}
				>
					<Layer>
						<Image
							image={this.state.image}
						/>
					</Layer>
				</Stage>
			</div>
		)
	}
}

export default ImageViewer