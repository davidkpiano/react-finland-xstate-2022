import { createMachine } from 'xstate';
import { raise } from 'xstate/lib/actions';
import { useMachine } from '@xstate/react';
import { useEffect } from 'react';

const playerMachine = createMachine({
  initial: 'loading',
  states: {
    loading: {
      on: {
        LOADED: {
          actions: 'assignSongData',
          target: 'playing',
        },
      },
    },
    paused: {
      on: {
        PLAY: { target: 'playing' },
      },
    },
    playing: {
      entry: 'playAudio',
      exit: 'pauseAudio',
      on: {
        PAUSE: { target: 'paused' },
      },
    },
  },
  on: {
    SKIP: {
      actions: 'skipSong',
      target: 'loading',
    },
    LIKE: {
      actions: 'likeSong',
    },
    UNLIKE: {
      actions: 'unlikeSong',
    },
    DISLIKE: {
      actions: ['dislikeSong', raise('SKIP')],
    },
    VOLUME: {
      actions: 'assignVolume',
    },
  },
}).withConfig({
  actions: {
    assignSongData: () => {},
    likeSong: () => {},
    unlikeSong: () => {},
    dislikeSong: () => {},
    skipSong: () => {},
    assignVolume: () => {},
    assignTime: () => {},
    playAudio: () => {},
    pauseAudio: () => {},
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

  console.log(state.actions);

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
        <button
          id="button-like"
          onClick={() => send({ type: 'LIKE' })}
        ></button>
        <button
          id="button-dislike"
          onClick={() => send({ type: 'DISLIKE' })}
        ></button>
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
        <button
          id="button-skip"
          onClick={() => send({ type: 'SKIP' })}
        ></button>
        <button id="button-volume"></button>
      </div>
    </div>
  );
}
