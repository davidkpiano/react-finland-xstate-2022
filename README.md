# React Finland XState Workshop

Welcome to the React Finland workshop on **State Machines and Statecharts with XState & React**! In this workshop, we will be learning about software modeling with state machines and statecharts by building a real-world media player application.

- GitHub repo: https://github.com/statelyai/xstate
- Documentation: https://xstate.js.org/docs
- Visualizer: https://stately.ai/viz
- Community: https://discord.gg/xstate

## Getting Started

1. Run `npm install` or `yarn`
2. Run `npm run dev` or `yarn dev`
3. Navigate to any of the exercises:

- [00-modeling](http://localhost:5173/00-modeling/)
- [01-states-transitions](http://localhost:5173/01-states-transitions/)
- [02-actions](http://localhost:5173/02-actions/)
- [03-context](http://localhost:5173/03-context/)
- [04-guards](http://localhost:5173/04-guards/)
- [05-compound-states](http://localhost:5173/05-compound-states/)
- [06-parallel-states](http://localhost:5173/06-parallel-states/)
- [07-final-states](http://localhost:5173/07-final-states/)
- [08-history-states](http://localhost:5173/08-history-states/)
- [09-actors](http://localhost:5173/09-actors/)
- [10-testing](http://localhost:5173/10-testing/)

## What we're building

In this workshop, we will be building a media player. This app will allow you to like/ unlike a song, represented by the heart symbol. The next option the app will allow you to do is thumbs down the song, which will remove it from your playlist. The play/pause action will allow you to play or pause the current song. Then we have the forward/next option of the app that will allow you to skip the current song and load the next in queue. Next, you will have the option to mute/ unmute the current song that is playing.

![media-player](https://user-images.githubusercontent.com/49595511/139563998-b2118580-d981-4465-bfd1-06d876b0b08a.png)

We will be using state machines, state charts, and the actor model to build these features on our media player app.
