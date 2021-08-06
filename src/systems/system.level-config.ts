import { LevelConf, KaboomCtx } from "kaboom";
import {
    ENEMY,
    SPRITE_COIN,
    SPRITE_BLOCK,
    SPRITE_BLUE_BLOCK,
    SPRITE_BLUE_BRICK,
    SPRITE_BLUE_EVIL_SHROOM,
    SPRITE_BLUE_STEEL,
    SPRITE_BLUE_SURPRISE,
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

export function SystemLevelConfig(k: KaboomCtx): LevelConf {
  return {
    width: 20,
    height: 20,
    "=": [k.sprite(SPRITE_BLOCK), k.solid()],
    $: [k.sprite(SPRITE_COIN), "coin"],
    "%": [k.sprite(SPRITE_SURPRISE), k.solid(), "coin-surprise"],
    "*": [k.sprite(SPRITE_SURPRISE), k.solid(), "mushroom-surprise"],
    "}": [k.sprite(SPRITE_UNBOXED), k.solid()],
    "(": [k.sprite(SPRITE_PIPE_BOTTOM_LEFT), k.solid(), k.scale(0.5)],
    ")": [k.sprite(SPRITE_PIPE_BOTTOM_RIGHT), k.solid(), k.scale(0.5)],
    "-": [k.sprite(SPRITE_PIPE_TOP_LEFT), k.solid(), k.scale(0.5), "pipe"],
    "+": [k.sprite(SPRITE_PIPE_TOP_RIGHT), k.solid(), k.scale(0.5), "pipe"],
    "^": [k.sprite(SPRITE_EVIL_SHROOM), k.body(), ENEMY],
    "#": [k.sprite(SPRITE_MUSHROOM), k.solid(), "mushroom", k.body()],
    "!": [k.sprite(SPRITE_BLUE_BLOCK), k.solid(), k.scale(0.5)],
    "£": [k.sprite(SPRITE_BLUE_BRICK), k.solid(), k.scale(0.5)],
    z: [k.sprite(SPRITE_BLUE_EVIL_SHROOM), k.body(), k.scale(0.5), ENEMY],
    "@": [
      k.sprite(SPRITE_BLUE_SURPRISE),
      k.solid(),
      k.scale(0.5),
      "coin-surprise",
    ],
    x: [k.sprite(SPRITE_BLUE_STEEL), k.solid(), k.scale(0.5)],
    any(_ch) {
      return [];
    },
  };
}