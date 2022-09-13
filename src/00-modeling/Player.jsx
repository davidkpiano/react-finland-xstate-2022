import { useEffect } from 'react';
import { useReducer } from 'react';

const initialState = {
  value: 'loading', // or 'playing' or 'paused'
};

function playerMachine(state, event) {
  // Use state machine

  return state;
}

export function Player() {
  const [state, send] = useReducer(playerMachine, initialState);

  useEffect(() => {
    const i = setTimeout(() => {
      send({ type: 'LOADED' });
    }, 1000);

    return () => {
      clearTimeout(i);
    };
  }, []);

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
        {state.value === 'paused' && (
          <button
            id="button-play"
            onClick={() => {
              // Send a 'PLAY' event
            }}
          ></button>
        )}
        {state.value === 'playing' && (
          <button
            id="button-pause"
            onClick={() => {
              // Send a 'PAUSE' event
            }}
          ></button>
        )}
        {state.value === 'loading' && <button id="button-loading"></button>}
        <button id="button-skip"></button>
        <button id="button-volume"></button>
      </div>
    </div>
  );
}
