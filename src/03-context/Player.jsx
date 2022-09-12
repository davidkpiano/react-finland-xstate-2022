import { createMachine, assign } from 'xstate';
import { raise } from 'xstate/lib/actions';
import { useMachine } from '@xstate/react';
import { useEffect } from 'react';
import { formatTime } from '../formatTime';

const playerMachine = createMachine({
  initial: 'loading',
  context: {
    // Add initial context here for:
    // title, artist, duration, elapsed, likeStatus, volume
  },
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
    'AUDIO.TIME': {
      actions: 'assignTime',
    },
  },
}).withConfig({
  actions: {
    assignSongData: assign({
      // Assign the `title`, `artist`, and `duration` from the event.
      // Assume the event looks like this:
      // {
      //   type: 'LOADED',
      //   data: {
      //     title: 'Some title',
      //     artist: 'Some artist',
      //     duration: 123
      //   }
      // }
      // Also, reset the `elapsed` and `likeStatus` values.
    }),
    likeSong: assign({
      // Assign the `likeStatus` to "liked"
    }),
    unlikeSong: assign({
      // Assign the `likeStatus` to 'unliked',
    }),
    dislikeSong: assign({
      // Assign the `likeStatus` to 'disliked',
    }),
    assignVolume: assign({
      // Assign the `volume` to the `level` from the event.
      // Assume the event looks like this:
      // {
      //   type: 'VOLUME',
      //   level: 5
      // }
    }),
    assignTime: assign({
      // Assign the `elapsed` value to the `currentTime` from the event.
      // Assume the event looks like this:
      // {
      //   type: 'AUDIO.TIME',
      //   currentTime: 10
      // }
    }),
    skipSong: () => {
      console.log('Skipping song');
    },
    playAudio: () => {},
    pauseAudio: () => {},
  },
});

export function Player() {
  const [state, send] = useMachine(playerMachine);
  const { context } = state;

  useEffect(() => {
    const i = setTimeout(() => {
      send({
        type: 'LOADED',
        data: {
          title: 'Some song title',
          artist: 'Some song artist',
          duration: 100,
        },
      });
    }, 1000);

    return () => {
      clearTimeout(i);
    };
  }, []);

  return (
    <div id="player">
      <div className="song">
        <div className="title">{context.title ?? <>&nbsp;</>}</div>
        <div className="artist">{context.artist ?? <>&nbsp;</>}</div>
        <input
          type="range"
          id="scrubber"
          min="0"
          max={context.duration}
          value={context.elapsed}
        />
        <output id="elapsed">
          {formatTime(context.elapsed - context.duration)}
        </output>
      </div>
      <div className="controls">
        <button
          id="button-like"
          onClick={() => send({ type: 'LIKE' })}
          data-like-status={context.likeStatus}
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
        {state.matches('loading') && <button id="button-loading"></button>}
        <button
          id="button-skip"
          onClick={() => send({ type: 'SKIP' })}
        ></button>
        <button
          id="button-volume"
          data-level={
            context.volume === 0
              ? 'zero'
              : context.volume <= 2
              ? 'low'
              : context.volume >= 8
              ? 'high'
              : undefined
          }
        ></button>
      </div>
    </div>
  );
}
