import { GameObj, KaboomCtx, Level } from "kaboom";
import { ENEMY, HEADBUMP, COIN_SURPRISE, MUSHROOM_SURPRISE } from "../constants";

export class SystemCollisions {
  private player: GameObj;
  private k: KaboomCtx;

  constructor(player: GameObj, k: KaboomCtx) {
    this.player = player;
    this.k = k;
  }

  public SetUpEnemyCollisions() {
    console.log("In collisions set up function");
    this.player.collides(ENEMY, (enemy: GameObj) => {
      if (!this.player.grounded()) {
        this.k.destroy(enemy);
      } else {
        this.k.destroy(this.player);
      }
    });
  }

  public SetUpEnvironmentCollisions(gameLevel: Level) {
    // Spawn from boxes
    this.player.on(HEADBUMP, (obj?: GameObj) => {
        if (obj && obj.is(COIN_SURPRISE)) {
            gameLevel.spawn("$", obj.gridPos.sub(0, 1));
            this.k.destroy(obj);
            gameLevel.spawn("}", obj.gridPos.sub(0, 0));
        }
        if (obj && obj.is(MUSHROOM_SURPRISE)) {
            gameLevel.spawn("#", obj.gridPos.sub(0, 1));
            this.k.destroy(obj);
            gameLevel.spawn("}", obj.gridPos.sub(0, 0));
        }
    });
  }
}
