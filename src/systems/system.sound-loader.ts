import { AudioPlay, KaboomCtx } from "kaboom";
import JumpSound from "../assets/sounds/Bubble1.wav";
import MushroomCollectSound from "../assets/sounds/BigEggCollect1.wav";
import CoinCollectSound from "../assets/sounds/FruitCollect1.wav";
import DecendPipeSound from "../assets/sounds/1up5-SoundEffectsPack2.wav";
import SquashMushroomSound from "../assets/sounds/Eat.mp3";
import BlockHitSound from "../assets/sounds/Blip1-SoundEffectsPack2.wav";
import PlayerDeathSound from "../assets/sounds/Lose1-SoundEffectsPack2.wav";
import BackgroundMusicSound from "../assets/sounds/music/251461__joshuaempyre__arcade-music-loop.mp3";
import EndThemeMusicSound from "@assets/sounds/music/240376__edtijo__happy-8bit-pixel-adenture.mp3";
import MenuMusicSound from "@assets/sounds/music/410574__yummie__game-background-music-loop-short.mp3";
import {
  SOUND_COIN_COLLECT,
  SOUND_JUMP,
  SOUND_MUSHROOM_COLLECT,
  SOUND_DECEND_PIPE,
  SOUND_SQUASH_MUSHROOM,
  SOUND_BLOCK_HIT,
  SOUND_PLAYER_DEATH,
  SOUND_BACKGROUND_MUSIC,
  SOUND_END_THEME,
  SOUND_MENU_MUSIC,
} from "../constants/";

export abstract class SystemSoundLoader {
  private static music: AudioPlay | undefined;
  private static endMusic: AudioPlay | undefined;

  public static async LoadSounds(kb: KaboomCtx): Promise<void> {
    await Promise.all([
      kb.loadSound(SOUND_JUMP, JumpSound),
      kb.loadSound(SOUND_MUSHROOM_COLLECT, MushroomCollectSound),
      kb.loadSound(SOUND_COIN_COLLECT, CoinCollectSound),
      kb.loadSound(SOUND_DECEND_PIPE, DecendPipeSound),
      kb.loadSound(SOUND_SQUASH_MUSHROOM, SquashMushroomSound),
      kb.loadSound(SOUND_BLOCK_HIT, BlockHitSound),
      kb.loadSound(SOUND_PLAYER_DEATH, PlayerDeathSound),
      kb.loadSound(SOUND_BACKGROUND_MUSIC, BackgroundMusicSound),
      kb.loadSound(SOUND_MENU_MUSIC, MenuMusicSound),
    ]);

    // console.log("should be playing now?");
    this.PlayMenuMusic(kb);
  }

  public static async PlayEndTheme(kb: KaboomCtx): Promise<void> {
    this.StopCurrentlyPlayingMusic();

    await kb.loadSound(SOUND_END_THEME, EndThemeMusicSound);
    this.endMusic = kb.play(SOUND_END_THEME);
  }

  public static PlayBackgroundMusic(kb: KaboomCtx): void {
    this.StopCurrentlyPlayingMusic();
    this.music = kb.play(SOUND_BACKGROUND_MUSIC);

    this.music.loop();
    this.music.speed(0.8);
    this.music.detune(200);
  }

  public static PlayMenuMusic(kb: KaboomCtx): void {
    this.StopCurrentlyPlayingMusic();
    
    this.music = kb.play(SOUND_MENU_MUSIC);
    this.music.loop();
  }

  private static StopCurrentlyPlayingMusic(): void {
    if(this.endMusic)
      this.endMusic.stop();
    if(this.music)
      this.music.stop();
  }
}
