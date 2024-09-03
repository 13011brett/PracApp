import { expect, test, describe } from 'vitest';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function runPythonFunction(data) {
// Python script was exported to its own file. This was a requirement, possibility due to machine configuration.

	const { stdout } = await execAsync(`python3 ".\\tests\\unitTestTest.py" ${JSON.stringify(data)}`);
	return stdout.trim();
}

//This method could be used if we took the API response and pulled it down into a JSON file.

//Leaving it here as it was in the assessment.

// function loadJsonData(filePath) {
// 	const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, filePath), 'utf8'));
// 	return data.datapoints;
// }

describe('upOrDown function', () => {
	test('should return DOWN for empty data', async () => {
		const result = await runPythonFunction([]);
		expect(result).toBe('DOWN');
	});

	test('should return UP for all up data', async () => {
		const data = Array(100).fill([0, 1234567890]); // 100 data points with all 0s (UP)
		const result = await runPythonFunction(data);
		expect(result).toBe('UP');
	});

	test('should return UP for mixed data with 70% up', async () => {
		const data = [...Array(70).fill([0, 1234567890]), ...Array(30).fill([1, 1234567890])];
		const result = await runPythonFunction(data);
		expect(result).toBe('UP');
	});

	test('should return DOWN for edge case with 60% up', async () => {
		const data = [...Array(60).fill([0, 1234567890]), ...Array(40).fill([1, 1234567890])];
		const result = await runPythonFunction(data);
		expect(result).toBe('DOWN');
	});
});
