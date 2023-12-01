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
		const sum: number = calibrationValues.reduce((previousVal, currentVal) => previousVal + currentVal, 0);
		assert.equal(sum, 55386);
	});
	it("Part 2", () => {
		let calibrationValues: number[] = [];
		fileContents.forEach((line) => {
			let temp: string = "";
			let possibleNumberAsString: string = "";
			for (let i = 0; i < line.length; i++) {
				if (!isNaN(Number(line[i]))) {
					temp += line[i];
					possibleNumberAsString = "";
				}

				possibleNumberAsString += line[i];
				let sanitisedNumber: number = checkForValidNumberString(possibleNumberAsString);
				if (sanitisedNumber === undefined) continue;
				
				temp += sanitisedNumber;
				possibleNumberAsString = possibleNumberAsString.substring(possibleNumberAsString.length - 2);
			}
			calibrationValues.push(Number(`${temp[0]}${temp[temp.length - 1]}`));
		});
		const sum: number = calibrationValues.reduce((previousVal, currentVal) => previousVal + currentVal, 0);
		assert.equal(sum, 54824);

		function checkForValidNumberString(value: string): number {
			if (value.includes("one")) return 1;
			if (value.includes("two")) return 2;
			if (value.includes("three")) return 3;
			if (value.includes("four")) return 4;
			if (value.includes("five")) return 5;
			if (value.includes("six")) return 6;
			if (value.includes("seven")) return 7;
			if (value.includes("eight")) return 8;
			if (value.includes("nine")) return 9;

			return undefined;
		}
	});
});