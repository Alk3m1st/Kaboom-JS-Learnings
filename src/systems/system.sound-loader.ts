import { KaboomCtx } from 'kaboom';
import JumpSound from '../assets/sounds/Bubble1.wav';

export abstract class SystemSoundLoader {
    public static LoadSounds(kb: KaboomCtx): void {
        kb.loadSound("jump", JumpSound);
    }
}