import kb, { KaboomCtx, LevelConf, GameObj, Comp } from "kaboom";
import { SystemCollisions } from "./systems";
import { EntityPlayer } from "./entities/entity.player";
import {
  ENEMY,
  SPRITE_COIN,
  SPRITE_BLOCK,
  SPRITE_BLUE_BLOCK,
  SPRITE_BLUE_BRICK,
  SPRITE_BLUE_EVIL_SHROOM,
  SPRITE_BLUE_STEEL,
  SPRITE_BLUE_SURPRISE,
  SPRITE_BRICK,
  SPRITE_EVIL_SHROOM,
  SPRITE_MARIO,
  SPRITE_MUSHROOM,
  SPRITE_PIPE_BOTTOM_LEFT,
  SPRITE_PIPE_BOTTOM_RIGHT,
  SPRITE_PIPE_TOP_LEFT,
  SPRITE_PIPE_TOP_RIGHT,
  SPRITE_SURPRISE,
  SPRITE_UNBOXED,
} from "./constants";

// Import these (later)
// Layer consts
const LAYER_BG = "bg",
  LAYER_OBJ = "obj",
  LAYER_UI = "ui";
// Speed consts
const SPEED_ENEMY = 20,
  SPEED_MUSHROOM = 50;
// Position consts
const FALL_DEATH = 400;

const k: KaboomCtx = kb({
  fullscreen: true,
  scale: 1,
  debug: true,
  clearColor: [0, 0, 0, 1],
});

k.loadRoot("https://i.imgur.com/");
k.loadSprite(SPRITE_COIN, "wbKxhcd.png");
k.loadSprite(SPRITE_EVIL_SHROOM, "KPO3fR9.png");
k.loadSprite(SPRITE_BRICK, "pogC9x5.png");
k.loadSprite(SPRITE_BLOCK, "M6rwarW.png");
k.loadSprite(SPRITE_MARIO, "Wb1qfhK.png");
k.loadSprite(SPRITE_MUSHROOM, "0wMd92p.png");
k.loadSprite(SPRITE_SURPRISE, "gesQ1KP.png");
k.loadSprite(SPRITE_UNBOXED, "bdrLpi6.png");
k.loadSprite(SPRITE_PIPE_TOP_LEFT, "ReTPiWY.png");
k.loadSprite(SPRITE_PIPE_TOP_RIGHT, "hj2GK4n.png");
k.loadSprite(SPRITE_PIPE_BOTTOM_LEFT, "c1cYSbt.png");
k.loadSprite(SPRITE_PIPE_BOTTOM_RIGHT, "nqQ79eI.png");
k.loadSprite(SPRITE_BLUE_BLOCK, "fVscIbn.png");
k.loadSprite(SPRITE_BLUE_BRICK, "3e5YRQd.png");
k.loadSprite(SPRITE_BLUE_STEEL, "gqVoI2b.png");
k.loadSprite(SPRITE_BLUE_EVIL_SHROOM, "SvV4ueD.png");
k.loadSprite(SPRITE_BLUE_SURPRISE, "RMqCc1G.png");

k.scene("game", ({ score, level }) => {
  k.layers([LAYER_BG, LAYER_OBJ, LAYER_UI], LAYER_OBJ);

  const maps = [
    [
      "                                     ",
      "                                     ",
      "                                     ",
      "            %                        ",
      "                                     ",
      "                                     ",
      "                                     ",
      "     %   =*=%=                       ",
      "                                     ",
      "                            -+       ",
      "        ^         ^    ^    ()       ",
      "==============================  =====",
    ],
    [
      "£                                            £",
      "£                                            £",
      "£                                            £",
      "£                                            £",
      "£                                            £",
      "£                                            £",
      "£           z                %@@@            £",
      "£        @%@@@@@                             £",
      "£@@@@%               @*@%@     x             £",
      "£                            x x             £",
      "£                          x x x           -+£",
      "£         z           z  x x x x           ()£",
      "!!!!!!!!!!!!   !!!!!!!!!!!!!!!!!  !!!!!!!!!!!!",
    ],
  ];

  const levelCfg: LevelConf = {
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
    "^": [k.sprite(SPRITE_EVIL_SHROOM), ENEMY],
    "#": [k.sprite(SPRITE_MUSHROOM), k.solid(), "mushroom", k.body()],
    "!": [k.sprite(SPRITE_BLUE_BLOCK), k.solid(), k.scale(0.5)],
    "£": [k.sprite(SPRITE_BLUE_BRICK), k.solid(), k.scale(0.5)],
    z: [k.sprite(SPRITE_BLUE_EVIL_SHROOM), k.scale(0.5), ENEMY],
    "@": [
      k.sprite(SPRITE_BLUE_SURPRISE),
      k.solid(),
      k.scale(0.5),
      "coin-surprise",
    ],
    x: [k.sprite(SPRITE_BLUE_STEEL), k.solid(), k.scale(0.5)],
    any(ch) {
      return [];
    },
  };

  const scoreLabel = k.add([
    k.text(score),
    k.pos(4, 20),
    k.layer(LAYER_UI),
    {
      value: score,
    },
  ]);

  console.log(`level: ${level} - maps.length: ${maps.length}`);

  const gameLevel = k.addLevel(maps[level], levelCfg);
  k.add([k.text(`level ${parseInt(level, 10) + 1}`), k.pos(4, 6)]);
  level++; // Increment level for the next playthrough

  const player = setUpPlayer(k);

  let collisionsSystem = new SystemCollisions(player, k);
  collisionsSystem.SetUpEnemyCollisions();
  collisionsSystem.SetUpEnvironmentCollisions(gameLevel);

  // Make things move
  k.action("mushroom", (m) => {
    m.move(SPEED_MUSHROOM, 0);
  });
  k.action(ENEMY, (d) => {
    d.move(-SPEED_ENEMY, 0);
  });

  // Player actions
  player.action(() => {
    k.camPos(player.pos);

    if (player.pos.y >= FALL_DEATH) {
      k.go("lose", { score: scoreLabel.value });
    }
  });

  // Player collisions
  player.collides("mushroom", (m: GameObj) => {
    k.destroy(m);
    player.biggify(6);
  });
  player.collides("coin", (c: GameObj) => {
    k.destroy(c);
    scoreLabel.value += 10;
    scoreLabel.text = scoreLabel.value;
  });

  // End game if player dies
  player.on("destroy", () => {
    console.log("You died");
    k.go("lose", { score: scoreLabel.value });
  });

  player.collides("pipe", () => {
    k.keyPress("down", () => {
      console.log(
        `Down the pipe we go. Level: ${level}, Maps length: ${maps.length}`
      );

      if (level >= maps.length) {
        k.go("lose", { score: scoreLabel.value });
      } else {
        k.go("game", {
          score: scoreLabel.value,
          level: level,
        });
      }
    });
  });
});

k.scene("lose", ({ score }) => {
  k.add([
    k.text(score, 32),
    k.origin("center"),
    k.pos(k.width() / 2, k.height() / 2),
  ]);
});

k.start("game", { score: 0, level: 0 });

// *** animations?
const setUpPlayer = (k: KaboomCtx): GameObj => {
  const MOVE_SPEED = 120;
  const JUMP_FORCE = 360;
  const BIG_JUMP_FORCE = 550;

  const playerEntity = new EntityPlayer(k);
  const player = playerEntity.Player;

  // Player movement / keys
  k.keyPress("space", () => {
    if (player.grounded()) {
      let currentJumpForce = JUMP_FORCE;
      if (player.isBig()) currentJumpForce = BIG_JUMP_FORCE;

      player.jump(currentJumpForce);
    }
  });
  k.keyDown("right", () => {
    player.move(MOVE_SPEED, 0);
  });
  k.keyDown("left", () => {
    player.move(-MOVE_SPEED, 0);
  });

  return player;
};
