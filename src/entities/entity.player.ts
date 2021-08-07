import { GameObj, KaboomCtx, Comp } from "kaboom";
import { SPRITE_PLAYER } from "../constants";

export class EntityPlayer {
  private _player: GameObj;

  constructor(kb: KaboomCtx) {
    this._player = kb.add([
      kb.sprite(SPRITE_PLAYER, {
        animSpeed: 0.1, // time per frame (defaults to 0.1)
        frame: 0, // start frame (defaults to 0)
      }),
      kb.area(kb.vec2(-7, -9), kb.vec2(7, 9)),  // Adjust sprite collision area
      kb.solid(),
      kb.scale(1.5),
      kb.pos(30, 10),
      kb.body(),
      this.big(kb),
      kb.origin("center"),
    ]);
  }

  public get Player() {
    return this._player;
  }

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
        this.scale = k.vec2(1.5);
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
