import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
// import { Player } from './00-modeling/Player.final';
// import { Player } from './01-states-transitions/Player.final';
import { Player } from './02-actions/Player.final';

function xPlayer() {
  return (
    <div id="player">
      <div class="song">
        <div class="title">
          <em>Song Title</em>
        </div>
        <div class="artist">
          <em>Artist</em>
        </div>
        <input type="range" id="scrubber" min="0" max="0" />
        <output id="elapsed"></output>
      </div>
      <div class="controls">
        <button id="button-like"></button>
        <button id="button-dislike"></button>
        <button id="button-play"></button>
        <button id="button-pause"></button>
        <button id="button-loading"></button>
        <button id="button-skip"></button>
        <button id="button-volume"></button>
      </div>
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Player />
    </div>
  );
}

export default App;
