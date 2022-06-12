import './App.css'

import { bluetoothClient } from 'bluetooth/connect'
import React, { useEffect } from 'react'

import logo from './logo.svg'

function App(): JSX.Element {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <button onClick={(): Promise<void> => bluetoothClient.connect()}>CONNECT</button>
        <button onClick={(): Promise<void> => bluetoothClient.startPingDevice()}>START PING</button>
        <button onClick={(): void => bluetoothClient.stopPingDevice()}>STOP PING</button>
      </header>
    </div>
  )
}

export default App
