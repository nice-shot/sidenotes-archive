import React, { Component } from 'react'
import path from 'path'
import ImageViewer from './components/ImageViewer'

const electron = window.require('electron')
const app = electron.remote.app

class App extends Component {

  render() {
    const imagePath = path.join(app.getAppPath(), 'tests', 'UnderstandingAnimation_20161120_P-002.jpg')
    return <ImageViewer imagePath={'file://' + imagePath.replace('\\', '/')} />
  }
}

export default App;
