import k from "./kaboom.context";
import { SystemSpriteLoader, SystemSoundLoader } from "./systems";
import { SceneLose, SceneMain } from "./scenes";

SystemSpriteLoader.LoadAllSprites(k);
SystemSoundLoader.LoadSounds(k);

k.scene("game", SceneMain);
k.scene("lose", SceneLose);

k.start("game", { k: k, score: 0, level: 0 });
