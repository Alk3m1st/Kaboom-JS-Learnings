import { KaboomCtx } from "kaboom";
import {
  SPRITE_COIN,
  SPRITE_BLUE_EVIL_SHROOM,
  SPRITE_BRICK,
  SPRITE_EVIL_SHROOM,
  SPRITE_MUSHROOM,
  SPRITE_PIPE_BOTTOM_LEFT,
  SPRITE_PIPE_BOTTOM_RIGHT,
  SPRITE_PIPE_TOP_LEFT,
  SPRITE_PIPE_TOP_RIGHT,
  SPRITE_PLAYER,
  SPRITE_LEVEL_TILES,
} from "../constants";
import GeneralSprite from "@assets/images/tiles_spritesheet.png";
import DinoSprite from "@assets/images/DinoSprites - doux.png";

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
      //sliceX: 24,
      gridWidth: 24,
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
    kb.loadSprite(SPRITE_MUSHROOM, `${this.rootDomain}0wMd92p.png`);
    kb.loadSprite(SPRITE_PIPE_TOP_LEFT, `${this.rootDomain}ReTPiWY.png`);
    kb.loadSprite(SPRITE_PIPE_TOP_RIGHT, `${this.rootDomain}hj2GK4n.png`);
    kb.loadSprite(SPRITE_PIPE_BOTTOM_LEFT, `${this.rootDomain}c1cYSbt.png`);
    kb.loadSprite(SPRITE_PIPE_BOTTOM_RIGHT, `${this.rootDomain}nqQ79eI.png`);
    kb.loadSprite(SPRITE_LEVEL_TILES, GeneralSprite, {
      gridWidth: 72,
      gridHeight: 72,
    });
  }
}
