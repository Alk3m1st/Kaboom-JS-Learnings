import { KaboomCtx } from "kaboom";
import {
  SPRITE_COIN,
  SPRITE_BLOCK,
  SPRITE_BLUE_BLOCK,
  SPRITE_BLUE_BRICK,
  SPRITE_BLUE_EVIL_SHROOM,
  SPRITE_BLUE_STEEL,
  SPRITE_BLUE_SURPRISE,
  SPRITE_BRICK,
  SPRITE_EVIL_SHROOM,
  SPRITE_MUSHROOM,
  SPRITE_PIPE_BOTTOM_LEFT,
  SPRITE_PIPE_BOTTOM_RIGHT,
  SPRITE_PIPE_TOP_LEFT,
  SPRITE_PIPE_TOP_RIGHT,
  SPRITE_SURPRISE,
  SPRITE_UNBOXED,
  SPRITE_PLAYER,
} from "../constants";
import GeneralSprite from "../assets/images/sprite.png";
import DinoSprite from "../assets/images/DinoSprites - doux.png";

export abstract class SystemSpriteLoader {
  private static readonly rootDomain: string = "https://i.imgur.com/";

  public static LoadAllSprites(kb: KaboomCtx): void {
    // TODO: Load from a config file?
    //kb.loadRoot("https://i.imgur.com/");

    this.LoadPlayerSprite(kb);
    this.LoadEnemySprites(kb);
    this.LoadLevelSprites(kb);
  }

  private static LoadPlayerSprite(kb: KaboomCtx): void {
    kb.loadSprite(SPRITE_PLAYER, DinoSprite, {
      sliceX: 24,
      anims: {
        walk: {
          from: 5,
          to: 9,
        },
      },
    });
  }

  private static LoadEnemySprites(kb: KaboomCtx): void {
    kb.loadSprite(SPRITE_EVIL_SHROOM, `${this.rootDomain}KPO3fR9.png`);
    kb.loadSprite(SPRITE_BLUE_EVIL_SHROOM, `${this.rootDomain}SvV4ueD.png`);
  }

  private static LoadLevelSprites(kb: KaboomCtx): void {
    kb.loadSprite(SPRITE_COIN, `${this.rootDomain}wbKxhcd.png`);
    kb.loadSprite(SPRITE_BRICK, `${this.rootDomain}pogC9x5.png`);
    kb.loadSprite(SPRITE_BLOCK, `${this.rootDomain}M6rwarW.png`);
    kb.loadSprite(SPRITE_MUSHROOM, `${this.rootDomain}0wMd92p.png`);
    kb.loadSprite(SPRITE_SURPRISE, `${this.rootDomain}gesQ1KP.png`);
    kb.loadSprite(SPRITE_UNBOXED, `${this.rootDomain}bdrLpi6.png`);
    kb.loadSprite(SPRITE_BLUE_SURPRISE, `${this.rootDomain}RMqCc1G.png`);
    kb.loadSprite(SPRITE_PIPE_TOP_LEFT, `${this.rootDomain}ReTPiWY.png`);
    kb.loadSprite(SPRITE_PIPE_TOP_RIGHT, `${this.rootDomain}hj2GK4n.png`);
    kb.loadSprite(SPRITE_PIPE_BOTTOM_LEFT, `${this.rootDomain}c1cYSbt.png`);
    kb.loadSprite(SPRITE_PIPE_BOTTOM_RIGHT, `${this.rootDomain}nqQ79eI.png`);
    kb.loadSprite(SPRITE_BLUE_BLOCK, `${this.rootDomain}fVscIbn.png`);
    kb.loadSprite(SPRITE_BLUE_BRICK, `${this.rootDomain}3e5YRQd.png`);
    kb.loadSprite(SPRITE_BLUE_STEEL, `${this.rootDomain}gqVoI2b.png`);
    kb.loadSprite("SPRITE_General", GeneralSprite, {
      sliceX: 13,
      sliceY: 9,
    });
  }
}
