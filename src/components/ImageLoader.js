import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-konva'

class ImageLoader extends Component {
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
			const stage = this.imageNode.getStage()
			const { width, height } = this.imageNode.size()

			let scale
			if (width > height) {
				scale = stage.width() / width
			} else {
				scale = stage.height() / height
			}

			console.log(`Scaling by ${scale}`)
			this.imageNode.scale({x: scale, y: scale})
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