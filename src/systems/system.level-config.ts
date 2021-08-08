import {
  LevelConf,
  KaboomCtx,
  SolidComp,
  ScaleComp,
  OriginComp,
  SpriteComp,
} from "kaboom";
import {
  ENEMY,
  SPRITE_COIN,
  SPRITE_BLUE_EVIL_SHROOM,
  SPRITE_EVIL_SHROOM,
  SPRITE_MUSHROOM,
  SPRITE_PIPE_BOTTOM_LEFT,
  SPRITE_PIPE_BOTTOM_RIGHT,
  SPRITE_PIPE_TOP_LEFT,
  SPRITE_PIPE_TOP_RIGHT,
  SPRITE_LEVEL_TILES,
  COIN_SURPRISE,
  MUSHROOM_SURPRISE,
} from "../constants";

export function SystemLevelConfig(this: any, k: KaboomCtx): LevelConf {
  return {
    width: 20,
    height: 20,
    // "=": [
    //   k.sprite(SPRITE_SOIL_BLOCK),
    //   k.solid(),
    //   k.area(k.vec2(-12, -24), k.vec2(12, 0)),
    //   k.origin("bot"),
    // ],
    "=": setTileProps([k.sprite(SPRITE_LEVEL_TILES, { frame: 111 })], k),
    "]": setTileProps([k.sprite(SPRITE_LEVEL_TILES, { frame: 98 })], k),
    "[": setTileProps([k.sprite(SPRITE_LEVEL_TILES, { frame: 124 })], k),
    $: [k.sprite(SPRITE_COIN), k.origin("bot"), "coin"],
    "%": setTileProps([k.sprite(SPRITE_LEVEL_TILES, { frame: 0 }), COIN_SURPRISE], k),
    "*": setTileProps([k.sprite(SPRITE_LEVEL_TILES, { frame: 0 }), MUSHROOM_SURPRISE], k),
    "}": setTileProps([k.sprite(SPRITE_LEVEL_TILES, { frame: 84 })], k),
    "(": [
      k.sprite(SPRITE_PIPE_BOTTOM_LEFT),
      k.solid(),
      k.origin("bot"),
      k.scale(0.5),
    ],
    ")": [
      k.sprite(SPRITE_PIPE_BOTTOM_RIGHT),
      k.solid(),
      k.origin("bot"),
      k.scale(0.5),
    ],
    "-": [
      k.sprite(SPRITE_PIPE_TOP_LEFT),
      k.solid(),
      k.origin("bot"),
      k.scale(0.5),
      "pipe",
    ],
    "+": [
      k.sprite(SPRITE_PIPE_TOP_RIGHT),
      k.solid(),
      k.origin("bot"),
      k.scale(0.5),
      "pipe",
    ],
    "^": [k.sprite(SPRITE_EVIL_SHROOM), k.body(), k.origin("bot"), ENEMY],
    "#": [
      k.sprite(SPRITE_MUSHROOM),
      k.solid(),
      k.origin("bot"),
      "mushroom",
      k.body(),
    ],
    "!": setTileProps([k.sprite(SPRITE_LEVEL_TILES, { frame: 37 })], k),
    "£": setTileProps([k.sprite(SPRITE_LEVEL_TILES, { frame: 59 })], k),
    z: [
      k.sprite(SPRITE_BLUE_EVIL_SHROOM),
      k.body(),
      k.origin("bot"),
      k.scale(0.5),
      ENEMY,
    ],
    v: setTileProps([k.sprite(SPRITE_LEVEL_TILES, { frame: 3 })], k),
    x: setTileProps([k.sprite(SPRITE_LEVEL_TILES, { frame: 156 })], k),
    any(_ch) {
      return [];
    },
  };
}

const setTileProps = (
  arr: Array<ScaleComp | SolidComp | OriginComp | SpriteComp | string>,
  k: KaboomCtx
) => {
  arr.push(k.solid());
  arr.push(k.scale(0.29));
  arr.push(k.origin("bot"));

  return arr;
};
