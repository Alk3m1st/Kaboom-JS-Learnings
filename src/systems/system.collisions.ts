import { GameObj, KaboomCtx, Level } from "kaboom";
import {
  ENEMY,
  HEADBUMP,
  COIN_SURPRISE,
  MUSHROOM_SURPRISE,
  COIN,
  MUSHROOM,
} from "../constants";

export class SystemCollisions {
  public static SetUpEnemyCollisions(player: GameObj, k: KaboomCtx) {
    console.log("In collisions set up function");
    player.collides(ENEMY, (enemy: GameObj) => {
      if (!player.grounded()) {
        k.destroy(enemy);
      } else {
        k.destroy(player);
      }
    });
  }

  public static SetUpEnvironmentCollisions(
    player: GameObj,
    k: KaboomCtx,
    gameLevel: Level,
    scoreLabel: GameObj
  ) {
    // Spawn from boxes
    player.on(HEADBUMP, (obj?: GameObj) => {
      if (obj && obj.is(COIN_SURPRISE)) {
        gameLevel.spawn("$", obj.gridPos.sub(0, 1));
        k.destroy(obj);
        gameLevel.spawn("}", obj.gridPos.sub(0, 0));
      }
      if (obj && obj.is(MUSHROOM_SURPRISE)) {
        gameLevel.spawn("#", obj.gridPos.sub(0, 1));
        k.destroy(obj);
        gameLevel.spawn("}", obj.gridPos.sub(0, 0));
      }
    });

    player.collides(MUSHROOM, (m: GameObj) => {
      k.destroy(m);
      player.biggify(6);
      scoreLabel.increaseScore(10); // TODO: Move to own system?
    });

    player.collides(COIN, (c: GameObj) => {
      k.destroy(c);
      scoreLabel.increaseScore(10); // TODO: Move to own system?
    });
  }
}
