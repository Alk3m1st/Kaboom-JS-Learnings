import { KaboomCtx, LevelConf } from "kaboom";
import { ScoreComponent } from "../components";
import { DESTROY, ENEMY, INCREASE_SCORE } from "../constants";
import { EntityPlayer } from "../entities";
import { SystemCollisions, SystemLevelConfig, SystemMovement } from "../systems";
import { LoadMaps } from "../utils";

export type SceneMainArgs = {
    k: KaboomCtx,
    score: number,
    level: number
}

export function SceneMain(args: SceneMainArgs) {
    let { k, score, level } = args;

    // Layer consts
    const LAYER_BG = "bg",
    LAYER_OBJ = "obj",
    LAYER_UI = "ui";
    // Speed consts
    const SPEED_ENEMY = 20,
      SPEED_MUSHROOM = 50;
    // Position consts
    const FALL_DEATH = 400;

    k.layers([LAYER_BG, LAYER_OBJ, LAYER_UI], LAYER_OBJ);

    const maps = LoadMaps();
  
    // TODO: Move to Score System
    const scoreLabel = k.add([
      k.text(score.toString()),
      k.pos(4, 20),
      k.layer(LAYER_UI),
      ScoreComponent(score),
    ]);
    scoreLabel.on(INCREASE_SCORE, () => {
      scoreLabel.text = scoreLabel.score();
    });
  
    const levelCfg: LevelConf = SystemLevelConfig(k);
    const gameLevel = k.addLevel(maps[level], levelCfg);
    k.add([k.text(`level ${level + 1}`), k.pos(4, 6)]);
    level++; // Increment level for the next playthrough
  
    const playerEntity = new EntityPlayer(k);
    const player = playerEntity.Player;
  
    SystemMovement.SetUpMovement(player, k);
  
    SystemCollisions.SetUpEnemyCollisions(player, k);
    SystemCollisions.SetUpEnvironmentCollisions(player, k, gameLevel, scoreLabel);
  
    // Make things move
    k.action("mushroom", (m) => {
      m.move(SPEED_MUSHROOM, 0);
    });
    k.action(ENEMY, (d) => {
      d.move(-SPEED_ENEMY, 0);
    });
  
    // Player actions
    player.action(() => {
      k.camPos(player.pos);
  
      if (player.pos.y >= FALL_DEATH) {
        k.go("lose", { score: scoreLabel.score() });
      }
    });
  
    // End game if player dies
    player.on(DESTROY, () => {
      console.log("You died");
      k.go("lose", { score: scoreLabel.score() });
    });
  
    player.collides("pipe", () => {
      k.keyPress("down", () => {
        console.log(
          `Down the pipe we go. Level: ${level}, Maps length: ${maps.length}`
        );
  
        if (level >= maps.length) {
          k.go("lose", { score: scoreLabel.score() });
        } else {
          k.go("game", {
            //score: scoreLabel.value,
            k: k,
            score: scoreLabel.score(),
            level: level,
          });
        }
      });
    });
}
