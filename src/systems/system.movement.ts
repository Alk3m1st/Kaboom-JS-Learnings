import { GameObj, KaboomCtx } from "kaboom";
import { SOUND_JUMP } from "../constants";

export abstract class SystemMovement {
  private static MOVE_SPEED: number = 120;
  private static JUMP_FORCE: number = 400;
  private static BIG_JUMP_FORCE: number = 550;

  public static SetUpMovement(player: GameObj, k: KaboomCtx): void {
    k.keyDown("right", () => {
      player.flipX(1);
      player.move(this.MOVE_SPEED, 0);
    });
    k.keyPress("right", () => {
      player.play("walk");
    });
    k.keyRelease("right", () => {
      player.stop();
    });

    k.keyDown("left", () => {
      player.flipX(-1);
      player.move(-this.MOVE_SPEED, 0);
    });
    k.keyPress("left", () => {
      player.play("walk");
    });
    k.keyRelease("left", () => {
      player.stop();
      //.play("idle")
    })

    k.keyPress("space", () => {
      if (player.grounded()) {
        let currentJumpForce = this.JUMP_FORCE;
        if (player.isBig()) currentJumpForce = this.BIG_JUMP_FORCE;

        player.jump(currentJumpForce);
        k.play(SOUND_JUMP);
      }
    });
  }

  public static MoveScore(k: KaboomCtx, x: number, y: number) {
    const scoreLabel: GameObj[] = k.get("score");

    if(scoreLabel)
      scoreLabel.map(sl => {
        sl.pos.x = x;
        sl.pos.y = y;
      });
  }
}
