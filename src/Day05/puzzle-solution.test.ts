import * as fs from 'fs';
import { assert } from 'chai';

const file: string = fs.readFileSync("./src/Day05/puzzle-input.txt", "utf-8");
const fileContents: string[] = file.split(/\r?\n/);

describe("Day 05", () => {
	it("Part 1", () => {
		let lowestLocation: number = 0;
		const seedPlanter: SeedPlanter = new SeedPlanter(fileContents);
		seedPlanter.seeds.forEach((seed: number) => {
			const location: number = getLocationValue(seed, seedPlanter);
			lowestLocation = lowestLocation === 0 ? location : location < lowestLocation ? location : lowestLocation;
		});
		assert.equal(lowestLocation, 227653707);
	});
	it.skip("Part 2", () => {
		let lowestLocation: number = 0;
		const seedPlanter: SeedPlanter = new SeedPlanter(fileContents);

		let seedRanges: Array<SeedRange> = [];
		let seedStarts: number[] = [];
		let seedLengths: number[] = [];

		seedPlanter.seeds.forEach((seed: number) => {
			if (seedPlanter.seeds.indexOf(seed) % 2)
				seedLengths.push(seed);
			else
				seedStarts.push(seed);
		});

		for (let i = 0; i < seedStarts.length; i++) {
			seedRanges.push({
				start: seedStarts[i],
				length: seedLengths[i]
			});
		}

		seedRanges.forEach((seedRange: SeedRange) => {
			for (let i = seedRange.start; i < seedRange.start + seedRange.length; i++) {
				const location: number = getLocationValue(i, seedPlanter);
				if (lowestLocation === 0)
					lowestLocation = location;
			
				if (location < lowestLocation) 
					lowestLocation = location;
			}
		});

		assert.equal(lowestLocation, 78775051);
	});

	function getLocationValue(seed: number, seedPlanter: SeedPlanter): number {
		const soil: number = getDestinationValue(seed, seedPlanter.seedToSoilInstructions);
		const fertilizer: number = getDestinationValue(soil, seedPlanter.soilToFertilizerInstructions);
		const water: number = getDestinationValue(fertilizer, seedPlanter.fertilizerToWaterInstructions);
		const light: number = getDestinationValue(water, seedPlanter.waterToLightInstructions);
		const temperature: number = getDestinationValue(light, seedPlanter.lightToTemperatureInstructions);
		const humidity: number = getDestinationValue(temperature, seedPlanter.temperatureToHumidityInstructions);
		const location: number = getDestinationValue(humidity, seedPlanter.humidityToLocationInstructions);

		return location;
	}

	function getDestinationValue(input: number, instructions: Array<MovementInstruction>): number {
		let retVal: number = input;
		instructions.forEach((instruction: MovementInstruction) => {
			if (input >= instruction.sourceStart && input <= instruction.sourceEnd) {
				let difference: number = input - instruction.sourceStart;
				retVal = instruction.destinationStart + difference;
			}
		});

		return retVal;
	}
});

type MovementInstruction = {
	destinationStart: number;
	destinationEnd: number;
	sourceStart: number;
	sourceEnd: number;
	rangeLength: number;
}

type SeedRange = {
	start: number;
	length: number;
}

class SeedPlanter {
	seeds: Array<number> = [];
	seedToSoilInstructions: Array<MovementInstruction>;
	soilToFertilizerInstructions: Array<MovementInstruction>;
	fertilizerToWaterInstructions: Array<MovementInstruction>;
	waterToLightInstructions: Array<MovementInstruction>;
	lightToTemperatureInstructions: Array<MovementInstruction>;
	temperatureToHumidityInstructions: Array<MovementInstruction>;
	humidityToLocationInstructions: Array<MovementInstruction>;

	constructor(almanac: string[]) {
		almanac[0].replace("seeds: ", "").split(" ").forEach((seed: string) => {
			if (!isNaN(Number(seed)))
				this.seeds.push(Number(seed));
		});

		const seedToSoilSpan: number[] = [almanac.indexOf("seed-to-soil map:") + 1, 0];
		const soilToFertilizerSpan: number[] = [almanac.indexOf("soil-to-fertilizer map:") + 1, 0];
		const fertilizerToWaterSpan: number[] = [almanac.indexOf("fertilizer-to-water map:") + 1, 0];
		const waterToLightSpan: number[] = [almanac.indexOf("water-to-light map:") + 1, 0];
		const lightToTemperatureSpan: number[] = [almanac.indexOf("light-to-temperature map:") + 1, 0];
		const temperatureToHumiditySpan: number[] = [almanac.indexOf("temperature-to-humidity map:") + 1, 0];
		const humidityToLocationSpan: number[] = [almanac.indexOf("humidity-to-location map:") + 1, almanac.length];
		seedToSoilSpan[1] = soilToFertilizerSpan[0] - 2;
		soilToFertilizerSpan[1] = fertilizerToWaterSpan[0] - 2;
		fertilizerToWaterSpan[1] = waterToLightSpan[0] - 2;
		waterToLightSpan[1] = lightToTemperatureSpan[0] - 2;
		lightToTemperatureSpan[1] = temperatureToHumiditySpan[0] - 2;
		temperatureToHumiditySpan[1] = humidityToLocationSpan[0] - 2;

		this.seedToSoilInstructions = this.getInstructions(almanac, seedToSoilSpan);
		this.soilToFertilizerInstructions = this.getInstructions(almanac, soilToFertilizerSpan);
		this.fertilizerToWaterInstructions = this.getInstructions(almanac, fertilizerToWaterSpan);
		this.waterToLightInstructions = this.getInstructions(almanac, waterToLightSpan);
		this.lightToTemperatureInstructions = this.getInstructions(almanac, lightToTemperatureSpan);
		this.temperatureToHumidityInstructions = this.getInstructions(almanac, temperatureToHumiditySpan);
		this.humidityToLocationInstructions = this.getInstructions(almanac, humidityToLocationSpan);
	}

	private getInstructions(almanac: string[], lineRange: number[]): Array<MovementInstruction> {
		let retVal: Array<MovementInstruction> = [];
		for (let i = lineRange[0]; i < lineRange[1]; i++) {
			const line: string = almanac[i];
			const splitLine: string[] = line.split(" ");
			const instruction: MovementInstruction = {
				destinationStart: Number(splitLine[0]),
				destinationEnd: 0,
				sourceStart: Number(splitLine[1]),
				sourceEnd: 0,
				rangeLength: Number(splitLine[2])
			}
			instruction.destinationEnd = instruction.destinationStart + instruction.rangeLength - 1;
			instruction.sourceEnd = instruction.sourceStart + instruction.rangeLength - 1;
			retVal.push(instruction);
		}

		return retVal;
	}
}