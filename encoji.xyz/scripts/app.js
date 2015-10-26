import React from 'react'
import ReactDOM from 'react-dom'
import encoji from 'encoji'
import autosize from 'autosize'

var App = React.createClass({
  getInitialState () {
    return {
      input: 'Hello, world!',
      mode: 'encode'
    }
  },

  handleRawChange (event) {
    this.setState({mode: 'encode', input: event.target.value})
  },

  handleEncodedChange (event) {
    this.setState({mode: 'decode', input: event.target.value})
  },

  componentDidUpdate (prevProps, prevState) {
    var event = new Event('autosize:update')
    var list = document.querySelectorAll('textarea')

    for (var item of list){
      item.dispatchEvent(event)
    }
  },

  isEncode () {
    return this.state.mode === 'encode'
  },

  render () {
    return (
      <div className='encoder'>
        <div className='encode-group'>
          <div className='instructions'>
            <h2>Plaintext</h2>
            <p>Enter some data to be encoded as emojis</p>
          </div>
          <textarea
           placeholder='Enter some data to encode'
           onChange={this.handleRawChange}
           value={this.isEncode() ? this.state.input : encoji.decode(this.state.input)} />
         </div>

        <div className='encode-group'>
          <div className='instructions'>
            <h2>Encoded</h2>
            <p>Enter some data to be decoded back to plaintext</p>
          </div> 
          <textarea
           placeholder='Enter some data to decode'
           onChange={this.handleEncodedChange}
           value={this.isEncode() ? encoji.encode(this.state.input) : this.state.input} />
         </div>
       </div>
    )
  }
})

window.encoji = encoji
ReactDOM.render(<App />, document.getElementById('app'))
autosize(document.querySelectorAll('textarea'))
