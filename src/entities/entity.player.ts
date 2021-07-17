import { GameObj, KaboomCtx, Comp } from "kaboom";
import { SPRITE_MARIO } from "../constants";

export class EntityPlayer {
  private _player: GameObj;

  constructor(kb: KaboomCtx) {
    this._player = kb.add([
      kb.sprite(SPRITE_MARIO),
      kb.solid(),
      kb.pos(30, 10),
      kb.body(),
    //   this.isJumping(),
      this.big(kb),
      kb.origin("bot"),
    ]);
  }

  public get Player() {
    return this._player;
  }

  // Possibly move methods to System (Player)?
//   private isJumping(): Object {
//     let isJ = true;
//     return {
//       isJumping() {
//         return isJ;
//       },
//       setJumping(isJumping: boolean) {
//         isJ = isJumping;
//       },
//     };
//   }

  private big(k: KaboomCtx): Comp {
    let timer = 0;
    let isBig = false;
    return {
      update() {
        if (isBig) {
          timer -= k.dt();
          if (timer <= 0) {
            this.smallify();
          }
        }
      },
      isBig() {
        return isBig;
      },
      smallify() {
        this.scale = k.vec2(1);
        timer = 0;
        isBig = false;
      },
      biggify(time: number) {
        this.scale = k.vec2(2);
        timer = time;
        isBig = true;
      },
    };
  }
}
