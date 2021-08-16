import { Comp } from "kaboom";
import { INCREASE_SCORE } from "../constants";

export function ScoreComponent(score: number): Comp {
    return {
        increaseScore(amount: number): void {
            score += amount;
            this.trigger(INCREASE_SCORE);
        },
        score(): number {
            return score;
        }
    }
}