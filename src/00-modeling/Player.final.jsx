import { useEffect } from 'react';
import { useReducer } from 'react';

const initialState = {
  value: 'loading', // or 'playing' or 'paused'
};

function playerMachine(state, event) {
  switch (state.value) {
    case 'loading':
      if (event.type === 'LOADED') {
        return { ...state, value: 'playing' };
      }
      return state;
    case 'playing':
      if (event.type === 'PAUSE') {
        return { ...state, value: 'paused' };
      }
      return state;
    case 'paused':
      if (event.type === 'PLAY') {
        return { ...state, value: 'playing' };
      }
      return state;
    default:
      return state;
  }
}

const playerMachineObject = {
  initial: 'loading',
  states: {
    loading: {
      on: {
        LOADED: 'playing',
      },
    },
    playing: {
      on: {
        PAUSE: 'paused',
      },
    },
    paused: {
      on: {
        PLAY: 'playing',
      },
    },
  },
};

function playerMachine2(state, event) {
  const nextStateValue =
    playerMachineObject.states[state.value].on?.[event.type];

  if (!nextStateValue) {
    return state;
  }

  return {
    ...state,
    value: nextStateValue,
  };
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
            onClick={() => send({ type: 'PLAY' })}
          ></button>
        )}
        {state.value === 'playing' && (
          <button
            id="button-pause"
            onClick={() => {
              send({ type: 'PAUSE' });
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
