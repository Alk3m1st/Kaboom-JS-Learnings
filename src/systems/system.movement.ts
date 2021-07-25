import { GameObj, KaboomCtx } from "kaboom";

export abstract class SystemMovement {
  private static MOVE_SPEED: number = 120;
  private static JUMP_FORCE: number = 360;
  private static BIG_JUMP_FORCE: number = 550;

  public static SetUpMovement(player: GameObj, k: KaboomCtx): void {
    k.keyDown("right", () => {
      player.move(this.MOVE_SPEED, 0);
    });

    k.keyDown("left", () => {
      player.move(-this.MOVE_SPEED, 0);
    });

    k.keyPress("space", () => {
      if (player.grounded()) {
        let currentJumpForce = this.JUMP_FORCE;
        if (player.isBig()) currentJumpForce = this.BIG_JUMP_FORCE;

        player.jump(currentJumpForce);
      }
    });
  }
}
