import k from "./kaboom.context";
import { SystemSpriteLoader } from "./systems";
import { SceneMain } from "./scenes";

SystemSpriteLoader.LoadAllSprites(k);

k.scene("game", SceneMain);

k.scene("lose", ({ score }) => {
  k.add([
    k.text(score, 32),
    k.origin("center"),
    k.pos(k.width() / 2, k.height() / 2),
  ]);
});

k.start("game", { k: k, score: 0, level: 0 });

// *** animations?
