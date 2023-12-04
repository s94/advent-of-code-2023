import * as fs from 'fs';
import { assert } from 'chai';

const file: string = fs.readFileSync("./src/Day02/puzzle-input.txt", "utf-8");
const fileContents: string[] = file.split(/\r?\n/);

describe("Day 02", () => {
	it("Part 1", () => {
		let idSum: number = 0;
		fileContents.forEach((line: string) => {
			let game: CubeGame = new CubeGame(line);
			idSum = game.maxRedCubes > 12 || game.maxGreenCubes > 13 || game.maxBlueCubes > 14 ? idSum : idSum + game.id;
		});
		assert.equal(idSum, 2061);
	});
	it("Part 2", () => {
		let sumOfPower: number = 0;
		fileContents.forEach((line: string) => {
			let game: CubeGame = new CubeGame(line);
			sumOfPower += game.maxRedCubes * game.maxGreenCubes * game.maxBlueCubes;
		});
		assert.equal(sumOfPower, 72596);
	});
});

class CubeGame {
	id: number;
	maxRedCubes: number = 0;
	maxGreenCubes: number = 0;
	maxBlueCubes: number = 0;

	constructor(game: string)
	{
		let gameInfo: string[] = game.split(":");
		let id: string = gameInfo[0].replace("Game ", "");
		this.id = Number(id);
		this.processSets(gameInfo[1].split(";"));
	}

	private processSets(sets: string[]): void {
		sets.forEach((set: string) => this.processCubes(set.split(",")));
	}

	private processCubes(cubes: string[]): void {
		cubes.forEach((cube: string) => {
			let val: number = parseInt(cube);
			let colour: CubeColour = this.getColour(cube);

			switch (colour) {
				case CubeColour.red:
					this.maxRedCubes = this.maxRedCubes < val ? val : this.maxRedCubes;
					break;
				case CubeColour.green:
					this.maxGreenCubes = this.maxGreenCubes < val ? val : this.maxGreenCubes;
					break;
				case CubeColour.blue:
					this.maxBlueCubes = this.maxBlueCubes < val ? val : this.maxBlueCubes;
					break;
				default:
					break;
			}
		});
	}

	private getColour(cube: string): CubeColour {
		if (cube.includes("red")) return CubeColour.red;
		if (cube.includes("green")) return CubeColour.green;
		if (cube.includes("blue")) return CubeColour.blue;
	}
}

enum CubeColour {
	red,
	green,
	blue
}