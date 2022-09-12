import { createMachine, assign } from 'xstate';
import { raise } from 'xstate/lib/actions';
import { useMachine } from '@xstate/react';
import { useEffect } from 'react';
import { formatTime } from '../formatTime';

const playerMachine = createMachine({
  context: {
    title: undefined,
    artist: undefined,
    duration: 0,
    elapsed: 0,
    likeStatus: 'unliked', // or 'liked' or 'disliked'
    volume: 5,
  },
  type: 'parallel',
  states: {
    player: {
      initial: 'loading',
      states: {
        loading: {
          id: 'loading',
          tags: ['loading'],
          on: {
            LOADED: {
              actions: 'assignSongData',
              target: 'ready',
            },
          },
        },
        ready: {
          initial: 'playing',
          states: {
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
          always: {
            cond: (ctx) => ctx.elapsed >= ctx.duration,
            target: 'finished',
          },
        },
        finished: {
          type: 'final',
        },
      },
      onDone: {
        target: '.loading',
      },
      on: {
        SKIP: {
          actions: 'skipSong',
          target: '#loading',
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
        'AUDIO.TIME': {
          actions: 'assignTime',
        },
      },
    },
    volume: {
      initial: 'unmuted',
      states: {
        unmuted: {
          on: {
            'VOLUME.TOGGLE': 'muted',
          },
        },
        muted: {
          on: {
            'VOLUME.TOGGLE': 'unmuted',
          },
        },
      },
      on: {
        VOLUME: {
          cond: 'volumeWithinRange',
          actions: 'assignVolume',
        },
      },
    },
  },
}).withConfig({
  actions: {
    assignSongData: assign({
      title: (_, e) => e.data.title,
      artist: (_, e) => e.data.artist,
      duration: (ctx, e) => e.data.duration,
      elapsed: 0,
      likeStatus: 'unliked',
    }),
    likeSong: assign({
      likeStatus: 'liked',
    }),
    unlikeSong: assign({
      likeStatus: 'unliked',
    }),
    dislikeSong: assign({
      likeStatus: 'disliked',
    }),
    assignVolume: assign({
      volume: (_, e) => e.level,
    }),
    assignTime: assign({
      elapsed: (_, e) => e.currentTime,
    }),
    skipSong: () => {
      console.log('Skipping song');
    },
    playAudio: () => {},
    pauseAudio: () => {},
  },
  guards: {
    volumeWithinRange: (_, e) => {
      return e.level <= 10 && e.level >= 0;
    },
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
  }, [state.hasTag('loading')]);

  return (
    <div id="player">
      <div class="song">
        <div class="title">{context.title ?? <>&nbsp;</>}</div>
        <div class="artist">{context.artist ?? <>&nbsp;</>}</div>
        <input
          type="range"
          id="scrubber"
          min="0"
          max={context.duration}
          value={context.elapsed}
          onChange={(e) =>
            send({
              type: 'AUDIO.TIME',
              currentTime: e.target.valueAsNumber,
            })
          }
        />
        <output id="elapsed">
          {formatTime(context.elapsed - context.duration)}
        </output>
      </div>
      <div class="controls">
        <button
          id="button-like"
          onClick={() => send({ type: 'LIKE.TOGGLE' })}
          data-like-status={context.likeStatus}
        ></button>
        <button
          id="button-dislike"
          onClick={() => send({ type: 'DISLIKE' })}
        ></button>
        {state.can({ type: 'PLAY' }) && (
          <button
            id="button-play"
            onClick={() => send({ type: 'PLAY' })}
          ></button>
        )}
        {state.can({ type: 'PAUSE' }) && (
          <button
            id="button-pause"
            onClick={() => {
              send({ type: 'PAUSE' });
            }}
          ></button>
        )}
        {state.hasTag('loading') && <button id="button-loading"></button>}
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
          onClick={() => send({ type: 'VOLUME.TOGGLE' })}
          data-status={state.matches({ volume: 'muted' }) ? 'muted' : undefined}
        ></button>
      </div>
    </div>
  );
}
