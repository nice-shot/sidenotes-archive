import React from 'react'
import PropTypes from 'prop-types'

const ImageViewer = ({imagePath}) => {
	console.log('Opening image: ' + imagePath)

	return (
		<img src={imagePath} alt="selected scan" />
	)
}

ImageViewer.propTypes = {
	imagePath: PropTypes.string.isRequired,
}

export default ImageViewer