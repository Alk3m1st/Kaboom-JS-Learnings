import { KaboomCtx } from "kaboom";
import { SystemSoundLoader } from "../systems";

export function SceneMenu(args: { k: KaboomCtx }) {
  let { k } = args;
  
  k.add([
    k.text("Random Platformer", 24),
    k.origin("center"),
    k.pos(k.width() / 2, k.height() / 2),
  ]);

  AddPlayButton(k);

  SystemSoundLoader.PlayMenuMusic(k);
}

async function AddPlayButton(k: KaboomCtx) {
    // TODO: centre the button and text
  const playButton = k.add([k.rect(160, 20), k.pos(240, 180), "button"]);
  playButton.clicks(() => {
    SystemSoundLoader.PlayBackgroundMusic(k);

    k.go("game", {
      k: k,
      score: 0,
      level: 0,
    });
  });
  k.add([k.text("Play"), k.pos(300, 185), k.color(0, 0, 0)]);
}
