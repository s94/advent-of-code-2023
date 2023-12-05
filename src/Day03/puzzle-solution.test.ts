import * as fs from 'fs';
import { assert } from 'chai';

const file: string = fs.readFileSync("./src/Day03/puzzle-input.txt", "utf-8");

describe("Day 03", () => {
	it("Part 1", () => {
		let sum: number = 0;
		let engineSchematic: EngineSchematic = new EngineSchematic();
		for (let i = 0; i < engineSchematic.schematic.length; i++) {
			const line = engineSchematic.schematic[i];
			for (let j = 0; j < line.length; j++) {
				if (isNaN(Number(line[j])) && line[j] !== ".") {
					let adjacentNumbers: number[] = engineSchematic.getAdjacentNumbersFromSymbol(i, j);
					adjacentNumbers.forEach((val: number) => sum += val);
				}
			}
		}
		assert.equal(sum, 514969);
	});
	it("Part 2", () => {
		let sum: number = 0;
		let engineSchematic: EngineSchematic = new EngineSchematic();
		for (let i = 0; i < engineSchematic.schematic.length; i++) {
			const line = engineSchematic.schematic[i];
			for (let j = 0; j < line.length; j++) {
				if (isNaN(Number(line[j])) && line[j] !== ".") {
					engineSchematic.getAdjacentNumbersFromSymbol(i, j);
				}
			}
		}
		engineSchematic.gearRatios.forEach((val: number) => sum += val);
		assert.equal(sum, 78915902);
	});
});

class EngineSchematic {
	schematic: string[][] = [];
	gearRatios: number[] = [];

	constructor() {
		this.processSchematicFile();
	}

	public getAdjacentNumbersFromSymbol(lineNumber: number, symbolLocation: number): number[] {
		let retVal: number[] = [];
		
		let lineAbove: string[] = lineNumber !== 0 ? this.schematic[lineNumber - 1] : undefined;
		let line: string[] = this.schematic[lineNumber];
		let lineBelow: string[] = lineNumber !== this.schematic.length - 1 ? this.schematic[lineNumber + 1] : undefined;

		this.getAdjacentNumbersFromSameLine(line, symbolLocation).forEach((val: number) => retVal.push(val));
		this.getAdjacentNumbersFromDiffLine(lineAbove, symbolLocation).forEach((val: number) => retVal.push(val));
		this.getAdjacentNumbersFromDiffLine(lineBelow, symbolLocation).forEach((val: number) => retVal.push(val));

		if (line[symbolLocation] === "*" && retVal.length === 2)
			this.gearRatios.push(retVal[0] * retVal[1]);

		return retVal;
	}

	private getAdjacentNumbersFromDiffLine(line: string[], symbolLocation: number): number[] {
		let retVal: number[] = [];
		if (isNaN(Number(line[symbolLocation])))
			return this.getAdjacentNumbersFromSameLine(line, symbolLocation);

		let numberAsString: string = "";
		let onLeft: boolean = true;

		let startLocation: number = (symbolLocation - 5) < 0 ? 0 : (symbolLocation - 5);
		let endLocation: number = (symbolLocation + 5) < line.length ? line.length - 1 : (symbolLocation + 5);

		for (let i = startLocation; i < endLocation; i++)
		{
			if (isNaN(Number(line[i])) && !onLeft) break;
			if (isNaN(Number(line[i]))) {
				numberAsString = "";
				continue;
			}
			if (onLeft && i >= symbolLocation)
				onLeft = false;
			numberAsString += line[i];
		}
		if (numberAsString !== "")
			retVal.push(Number(numberAsString));

		return retVal;
	}

	private getAdjacentNumbersFromSameLine(line: string[], symbolLocation: number): number[] {
		let retVal: number[] = [];
		if (!isNaN(Number(line[symbolLocation - 1])))
		{
			let numberAsString: string = "";
			for (let i = symbolLocation - 1; i > symbolLocation - 4; i--)
			{
				if (isNaN(Number(line[i]))) break;
				numberAsString = line[i] + numberAsString;
			}
			if (numberAsString !== "")
				retVal.push(Number(numberAsString));
		}
		if (!isNaN(Number(line[symbolLocation + 1])))
		{
			let numberAsString: string = "";
			for (let i = symbolLocation + 1; i < symbolLocation + 4; i++) {
				if (isNaN(Number(line[i]))) break;
				numberAsString += line[i];
			}
			if (numberAsString !== "")
				retVal.push(Number(numberAsString));
		}

		return retVal;
	}

	private processSchematicFile(): void {
		const fileContents: string[] = file.split(/\r?\n/);

		fileContents.forEach((line: string) => {
			let temp: string[] = [];
			for (let i = 0; i < line.length; i++) {
				temp.push(line[i]);
			}
			this.schematic.push(temp);
		});
	}
}
