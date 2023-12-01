import * as fs from 'fs';
import { assert } from 'chai';

const file: string = fs.readFileSync("./src/Day01/puzzle-input.txt", "utf-8");
const fileContents: string[] = file.split(/\r?\n/);

describe("Day 01", () => {
	it("Part 1", () => {
		let calibrationValues: number[] = [];
		fileContents.forEach((line) => {
			let lineCalibrationValue: number = 0;
			let temp: string = "";
			for (let index = 0; index < line.length; index++) {
				const character: string = line[index];
				let characterAsNumber: number = +character;
				if (isNaN(characterAsNumber)) continue;
				temp += character;
			}
			lineCalibrationValue = +(`${temp[0]}${temp[temp.length - 1]}`);
			calibrationValues.push(lineCalibrationValue);
		});
		let calibrationValuesSum: number = 0;
		for (let index = 0; index < calibrationValues.length - 1; index++) {
			const val: number = calibrationValues[index];
			calibrationValuesSum += val;
		}
		assert.equal(calibrationValuesSum, 55386);
	});
});
