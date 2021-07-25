import { Comp } from "kaboom";

export function ScoreComponent(score: number): Comp {
    return {
        increaseScore(amount: number): void {
            score += amount;
            this.trigger("increase-score");
            console.log(`Score: ${score}`);
        },
        score(): number {
            return score;
        }
    }
}