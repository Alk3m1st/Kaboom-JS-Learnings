import kb, { KaboomCtx } from "kaboom";

export const k: KaboomCtx = kb({
  fullscreen: true,
  scale: 1,
  debug: true,
  clearColor: [0, 0, 0, 1],
});

export default k;
