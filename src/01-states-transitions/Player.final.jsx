import { createMachine, assign, interpret, send } from 'xstate';
import { useMachine } from '@xstate/react';
import { useEffect } from 'react';

const playerMachine = createMachine({
  initial: 'loading',
  states: {
    loading: {
      on: {
        LOADED: { target: 'playing' },
      },
    },
    paused: {
      on: {
        PLAY: { target: 'playing' },
      },
    },
    playing: {
      on: {
        PAUSE: { target: 'paused' },
      },
    },
  },
});

export function Player() {
  const [state, send] = useMachine(playerMachine);

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
        {state.matches('paused') && (
          <button
            id="button-play"
            onClick={() => send({ type: 'PLAY' })}
          ></button>
        )}
        {state.matches('playing') && (
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
