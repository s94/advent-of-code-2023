import * as fs from 'fs';
import { assert } from 'chai';

const file: string = fs.readFileSync("./src/Day01/puzzle-input.txt", "utf-8");
const fileContents: string[] = file.split(/\r?\n/);

describe("Day 01", () => {
	it("Part 1", () => {
		let calibrationValues: number[] = [];
		fileContents.forEach((line) => {
			let temp: string = "";
			for (let i = 0; i < line.length; i++) {
				if (isNaN(Number(line[i]))) continue;
				temp += line[i];
			}
			calibrationValues.push(Number(`${temp[0]}${temp[temp.length - 1]}`));
		});
		let calibrationValuesSum: number = 0;
		calibrationValues.forEach((n: number) => {
			if (!isNaN(n))
				calibrationValuesSum += n;
		});
		assert.equal(calibrationValuesSum, 55386);
	});
});
