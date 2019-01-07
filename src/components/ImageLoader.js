import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-konva'

class ImageLoader extends Component {
	// TODO: Get image path from redux
	static propTypes = {
		imagePath: PropTypes.string,
	}

	constructor(props) {
		super(props)
		this.imageNode = null
		this.image = null
	}

	componentDidMount() {
		this.image = new window.Image()
		this.image.src = this.props.imagePath
		this.image.onload = () => {
			// Fit image to stage
			const stage = this.imageNode.getStage()
			const { width, height } = this.imageNode.size()
			const { width: sWidth, height: sHeight } = stage.size()

			let scale
			const position = { x: 0, y: 0 }
			if (width > height) {
				scale = sWidth / width
				// Center vertically
				position.y = (sHeight / 2) - (height * scale / 2)
			} else {
				// Center horizontally
				scale = sHeight / height
				position.x = (sWidth / 2) - (width * scale / 2)
			}

			this.imageNode.scale({x: scale, y: scale})
			this.imageNode.position(position)

			// Render image
			this.imageNode.getLayer().batchDraw()
		}
	}

	render() {
		return (
			<Image
				image={this.image}
				ref={node => { this.imageNode = node }}
			/>
		)
	}
}


export default ImageLoader