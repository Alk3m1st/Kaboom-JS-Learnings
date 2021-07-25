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
    SPRITE_MARIO,
    SPRITE_MUSHROOM,
    SPRITE_PIPE_BOTTOM_LEFT,
    SPRITE_PIPE_BOTTOM_RIGHT,
    SPRITE_PIPE_TOP_LEFT,
    SPRITE_PIPE_TOP_RIGHT,
    SPRITE_SURPRISE,
    SPRITE_UNBOXED,
  } from "../constants";

export abstract class SystemSpriteLoader {
    public static LoadAllSprites(kb: KaboomCtx): void {
        // TODO: Load from a config file?
        kb.loadRoot("https://i.imgur.com/");

        this.LoadPlayerSprite(kb);
        this.LoadEnemySprites(kb);
        this.LoadLevelSprites(kb);
    }

    private static LoadPlayerSprite(kb: KaboomCtx): void {
        kb.loadSprite(SPRITE_MARIO, "Wb1qfhK.png");
    }

    private static LoadEnemySprites(kb: KaboomCtx): void {
        kb.loadSprite(SPRITE_EVIL_SHROOM, "KPO3fR9.png");
        kb.loadSprite(SPRITE_BLUE_EVIL_SHROOM, "SvV4ueD.png");
    }

    private static LoadLevelSprites(kb: KaboomCtx): void {
        kb.loadSprite(SPRITE_COIN, "wbKxhcd.png");
        kb.loadSprite(SPRITE_BRICK, "pogC9x5.png");
        kb.loadSprite(SPRITE_BLOCK, "M6rwarW.png");
        kb.loadSprite(SPRITE_MUSHROOM, "0wMd92p.png");
        kb.loadSprite(SPRITE_SURPRISE, "gesQ1KP.png");
        kb.loadSprite(SPRITE_UNBOXED, "bdrLpi6.png");
        kb.loadSprite(SPRITE_BLUE_SURPRISE, "RMqCc1G.png");
        kb.loadSprite(SPRITE_PIPE_TOP_LEFT, "ReTPiWY.png");
        kb.loadSprite(SPRITE_PIPE_TOP_RIGHT, "hj2GK4n.png");
        kb.loadSprite(SPRITE_PIPE_BOTTOM_LEFT, "c1cYSbt.png");
        kb.loadSprite(SPRITE_PIPE_BOTTOM_RIGHT, "nqQ79eI.png");
        kb.loadSprite(SPRITE_BLUE_BLOCK, "fVscIbn.png");
        kb.loadSprite(SPRITE_BLUE_BRICK, "3e5YRQd.png");
        kb.loadSprite(SPRITE_BLUE_STEEL, "gqVoI2b.png");
    }
}