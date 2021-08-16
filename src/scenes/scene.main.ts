import { KaboomCtx, LevelConf } from "kaboom";
import { ScoreComponent } from "../components";
import {
  DESTROY,
  ENEMY,
  INCREASE_SCORE,
  SOUND_DECEND_PIPE,
  SOUND_PLAYER_DEATH,
} from "../constants";
import { EntityPlayer } from "../entities";
import {
  SystemCollisions,
  SystemLevelConfig,
  SystemMovement,
} from "../systems";
import { LoadMaps } from "../utils";

export type SceneMainArgs = {
  k: KaboomCtx;
  score: number;
  level: number;
};

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
    "score",
  ]);
  scoreLabel.on(INCREASE_SCORE, () => {
    scoreLabel.text = scoreLabel.score();
  });

  scoreLabel.action(() => {
    scoreLabel.text = `level ${
      level + 1
    }. FPS: ${k.debug.fps()}. Obj Count: ${k.debug.objCount()}\nScore: ${scoreLabel.score()}`;
  });

  const levelCfg: LevelConf = SystemLevelConfig(k);
  const gameLevel = k.addLevel(maps[level], levelCfg);

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
      k.go("lose", { k: k, score: scoreLabel.score() });
    }

    SystemMovement.MoveScore(
      k,
      player.pos.x - k.width() / 2,
      player.pos.y - k.height() / 2
    );
  });

  // End game if player dies
  player.on(DESTROY, () => {
    k.play(SOUND_PLAYER_DEATH);
    k.go("lose", { k: k, score: scoreLabel.score() });
  });

  // Shift this but currently has a dependency on the levels array
  player.collides("pipe", () => {
    k.keyPress("down", () => {
      k.play(SOUND_DECEND_PIPE);

      if (level >= maps.length) {
        k.go("lose", { k: k, score: scoreLabel.score() });
      } else {
        level++;
        k.go("game", {
          k: k,
          score: scoreLabel.score(),
          level: level,
        });
      }
    });
  });
}
