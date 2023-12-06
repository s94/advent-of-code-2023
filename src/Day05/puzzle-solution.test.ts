import * as fs from 'fs';
import { assert } from 'chai';

const file: string = fs.readFileSync("./src/Day05/puzzle-input.txt", "utf-8");
const fileContents: string[] = file.split(/\r?\n/);

describe("Day 05", () => {
	it("Part 1", () => {
		let lowestLocation: number = 0;
		const seedPlanter: SeedPlanter = new SeedPlanter(fileContents);
		seedPlanter.seeds.forEach((seed: number) => console.log(seed));
		assert.equal(lowestLocation, 0);
	});
});

type MovementInstruction = {
	destinationStart: number;
	destinationEnd: number;
	sourceStart: number;
	sourceEnd: number;
	rangeLength: number;
}

class SeedPlanter {
	seeds: Array<number> = [];
	seedToSoilInstructions: Array<MovementInstruction> = [];
	soilToFertilizerInstructions: Array<MovementInstruction> = [];
	fertilizerToWaterInstructions: Array<MovementInstruction> = [];
	waterToLightInstructions: Array<MovementInstruction> = [];
	lightToTemperatureInstructions: Array<MovementInstruction> = [];
	temperatureToHumidityInstructions: Array<MovementInstruction> = [];
	humidityToLocationInstructions: Array<MovementInstruction> = [];

	constructor(almanac: string[]) {
		almanac[0].replace("seeds: ", "").split(" ").forEach((seed: string) => {
			if (!isNaN(Number(seed)))
				this.seeds.push(Number(seed));
		});
	}
}