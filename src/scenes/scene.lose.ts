import { KaboomCtx } from "kaboom";
import { SystemSoundLoader } from "../systems";

export type SceneLoseArgs = {
  k: KaboomCtx;
  score: number;
};

export function SceneLose(args: SceneLoseArgs) {
  let { k, score } = args;
  k.add([
    k.text(score.toString(), 32),
    k.origin("center"),
    k.pos(k.width() / 2, k.height() / 2),
  ]);
  k.add([
    k.text("Game Over", 26),
    k.origin("center"),
    k.pos(k.width() / 2, k.height() / 4),
  ]);
  AddPlayAgainButton(k);

  SystemSoundLoader.PlayEndTheme(k);
}

function AddPlayAgainButton(k: KaboomCtx) {
    // TODO: centre the button and text
  const playAgainButton = k.add([k.rect(160, 20), k.pos(240, 180), "button"]);
  playAgainButton.clicks(() => {
    SystemSoundLoader.PlayBackgroundMusic(k);

    k.go("game", {
      k: k,
      score: 0,
      level: 0,
    });
  });
  k.add([k.text("Play again"), k.pos(280, 185), k.color(0, 0, 0)]);
}
