import './App.css';
// import { Player } from './00-modeling/Player';
// import { Player } from './01-states-transitions/Player';
// import { Player } from './02-actions/Player';
// import { Player } from './03-context/Player';
// import { Player } from './04-guards/Player';
// import { Player } from './05-compound-states/Player';
// import { Player } from './06-parallel-states/Player';
// import { Player } from './07-final-states/Player';
// import { Player } from './08-history-states/Player';
import { Player } from './09-actors/Player';

function xPlayer() {
  return (
    <div id="player">
      <div className="song">
        <div className="title">
          <em>Song Title</em>
        </div>
        <div className="artist">
          <em>Artist</em>
        </div>
        <input type="range" id="scrubber" min="0" max="0" />
        <output id="elapsed"></output>
      </div>
      <div className="controls">
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
  return (
    <div className="App">
      <Player />
    </div>
  );
}

export default App;
