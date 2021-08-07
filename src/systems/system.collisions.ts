import { GameObj, KaboomCtx, Level } from "kaboom";
import {
  ENEMY,
  HEADBUMP,
  COIN_SURPRISE,
  MUSHROOM_SURPRISE,
  COIN,
  MUSHROOM,
  SOUND_MUSHROOM_COLLECT,
  SOUND_COIN_COLLECT,
  SOUND_SQUASH_MUSHROOM,
  SOUND_BLOCK_HIT,
} from "../constants";

export class SystemCollisions {
  public static SetUpEnemyCollisions(player: GameObj, k: KaboomCtx) {
    player.overlaps(ENEMY, (enemy: GameObj) => {
      if (!player.grounded()) {
        k.destroy(enemy);
        k.play(SOUND_SQUASH_MUSHROOM);
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
        k.play(SOUND_BLOCK_HIT);
        gameLevel.spawn("}", obj.gridPos.sub(0, 0));
      }
      if (obj && obj.is(MUSHROOM_SURPRISE)) {
        gameLevel.spawn("#", obj.gridPos.sub(0, 1));
        k.destroy(obj);
        k.play(SOUND_BLOCK_HIT);
        gameLevel.spawn("}", obj.gridPos.sub(0, 0));
      }
    });

    player.collides(MUSHROOM, (m: GameObj) => {
      k.destroy(m);
      player.biggify(6);
      k.play(SOUND_MUSHROOM_COLLECT);
      scoreLabel.increaseScore(10); // TODO: Move to own system?
    });

    player.collides(COIN, (c: GameObj) => {
      k.destroy(c);
      k.play(SOUND_COIN_COLLECT);
      scoreLabel.increaseScore(10); // TODO: Move to own system?
    });
  }
}
