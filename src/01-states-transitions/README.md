# 01. States and transitions

## Goals

- Understand the purpose of XState (state orchestration vs. state management)
- Know how to install XState (`npm install xstate`)
- Make a small state machine with XState and use `machine.transition(...)`
- Interpret a machine using `interpret(machine)`
- Inspect machines using `@xstate/inspect`
- Know what a "finite state" is and how it differs from "extended" (quantitative, infinite) data
- Recognize when and where to split app logic into finite states (treat them as "behaviors")
- Specify an initial state in XState
- Specify additional states in XState
- Know what events are and where they can come from
- Know what a transition is and when transitions between states should occur
- Know the shorthand and object syntax for creating transitions in XState

## Exercises

1. Take the previous state machine you created (using switch statements or objects) and refactor it to use XState (`createMachine(...)`).
2. Test the flow with `machine.transition(state, event)`
3. Use the machine by passing it into a `useMachine(machine)` hook in the `<Player>` component.
4. Inspect the machine using `@xstate/inspect`

## Resources

- [XState React documentation](https://xstate.js.org/docs/packages/xstate-react/)
