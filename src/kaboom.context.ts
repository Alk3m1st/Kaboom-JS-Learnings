import kb, { KaboomCtx } from "kaboom";

export const k: KaboomCtx = kb({
  fullscreen: true,
  scale: 2,
  debug: true,  // debug mode
  clearColor: [0, 0, 0, 1],
});

export default k;
