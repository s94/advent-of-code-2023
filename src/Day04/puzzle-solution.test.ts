import * as fs from 'fs';
import { assert } from 'chai';

const file: string = fs.readFileSync("./src/Day04/puzzle-input.txt", "utf-8");
const fileContents: string[] = file.split(/\r?\n/);

describe("Day 04", () => {
	it("Part 1", () => {
		let total: number = 0;
		fileContents.forEach((line: string) => {
			let scratchCard: ScratchCard = new ScratchCard(line);
			total += scratchCard.getPoints();
		});
		assert.equal(total, 21213);
	});
});

class ScratchCard {
	winningNumbers: number[] = [];
	yourNumbers: number[] = [];

	constructor(scratchCard: string) {
		scratchCard = scratchCard.split(":")[1];
		scratchCard.split("|")[0].split(" ").forEach((wNum: string) => {
			if (wNum !== "")
				this.winningNumbers.push(Number(wNum));
		});
		scratchCard.split("|")[1].split(" ").forEach((yNum: string) => {
			if (yNum !== "")
				this.yourNumbers.push(Number(yNum))
		});
	}

	public getPoints(): number {
		let retVal: number = 0;
		this.winningNumbers.forEach((num: number) => {
			if (this.yourNumbers.includes(num))
				retVal = retVal === 0 ? 1 : retVal + retVal;
		});

		return retVal;
	}
}