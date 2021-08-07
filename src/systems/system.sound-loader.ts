import { KaboomCtx } from "kaboom";
import JumpSound from "../assets/sounds/Bubble1.wav";
import MushroomCollectSound from "../assets/sounds/BigEggCollect1.wav";
import CoinCollectSound from "../assets/sounds/FruitCollect1.wav";
import DecendPipeSound from "../assets/sounds/1up5-SoundEffectsPack2.wav";
import SquashMushroomSound from "../assets/sounds/Eat.mp3";
import BlockHitSound from "../assets/sounds/Blip1-SoundEffectsPack2.wav";
import PlayerDeathSound from "../assets/sounds/Lose1-SoundEffectsPack2.wav";
import BackgroundMusicSound from "../assets/sounds/music/251461__joshuaempyre__arcade-music-loop.mp3";
import {
  SOUND_COIN_COLLECT,
  SOUND_JUMP,
  SOUND_MUSHROOM_COLLECT,
  SOUND_DECEND_PIPE,
  SOUND_SQUASH_MUSHROOM,
  SOUND_BLOCK_HIT,
  SOUND_PLAYER_DEATH,
  SOUND_BACKGROUND_MUSIC,
} from "../constants/";

export abstract class SystemSoundLoader {
  public static async LoadSounds(kb: KaboomCtx): Promise<void> {
    await Promise.all([
      kb.loadSound(SOUND_JUMP, JumpSound),
      kb.loadSound(SOUND_MUSHROOM_COLLECT, MushroomCollectSound),
      kb.loadSound(SOUND_COIN_COLLECT, CoinCollectSound),
      kb.loadSound(SOUND_DECEND_PIPE, DecendPipeSound),
      kb.loadSound(SOUND_SQUASH_MUSHROOM, SquashMushroomSound),
      kb.loadSound(SOUND_BLOCK_HIT, BlockHitSound),
      kb.loadSound(SOUND_PLAYER_DEATH, PlayerDeathSound),
      kb.loadSound(SOUND_BACKGROUND_MUSIC, BackgroundMusicSound)
    ]);

    this.PlayBackgroundMusic(kb);
  }

  private static PlayBackgroundMusic(kb: KaboomCtx) {
    const music = kb.play(SOUND_BACKGROUND_MUSIC);
    music.loop();
    music.speed(0.8);
    music.detune(200);
  }
}
