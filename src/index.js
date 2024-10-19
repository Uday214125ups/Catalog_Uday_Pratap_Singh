const fs = require("fs");
const path = require("path");
const { decode, lagrange } = require("./utils");

// Function to read the test case JSON files
function readTestCase(filename) {
  const path_to_file = path.join(__dirname, "../data", filename);
  const content_of_file = fs.readFileSync(path_to_file, "utf-8");
  return JSON.parse(content_of_file);
}

// Function to process each test case and find the secret 'c'
function processTestCase(testcase) {
  const { keys, ...roots } = testcase;
  const points = [];

  // Extract the x and decoded y values from the JSON input
  Object.keys(roots).forEach((key) => {
    const x = parseInt(key, 10);
    const { base, value } = roots[key];
    const y = decode(base, value);
    points.push([x, y]);
  });

  // Use Lagrange interpolation to find the constant term 'c'
  const secret_key = lagrange(points);
  return secret_key;
}

// Main function to handle both test cases
function main() {
  const testcase1 = readTestCase("testcase1.json");
  const testcase2 = readTestCase("testcase2.json");

  const secret_key1 = processTestCase(testcase1);
  const secret_key2 = processTestCase(testcase2);

  console.log("Secret_key for Testcase 1:", secret_key1);
  console.log("Secret_key for Testcase 2:", secret_key2);
}

// Run the main function
main();
