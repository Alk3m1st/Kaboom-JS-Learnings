import k from "./kaboom.context";
import { SystemSpriteLoader, SystemSoundLoader } from "./systems";
import { SceneLose, SceneMain, SceneMenu } from "./scenes";

SystemSpriteLoader.LoadAllSprites(k);
SystemSoundLoader.LoadSounds(k);

k.scene("menu", SceneMenu);
k.scene("game", SceneMain);
k.scene("lose", SceneLose);

k.start("menu", { k });
