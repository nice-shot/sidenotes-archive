import React, { Component } from 'react'

import ImageViewer from './components/ImageViewer'

class App extends Component {

  render() {
    const imagePath = 'file://E:/Programming/sidenotes-archive/tests/UnderstandingAnimation_20161120_P-002.jpg'
    console.log(imagePath)
    return <ImageViewer imagePath={imagePath} />
  }
}

export default App;
