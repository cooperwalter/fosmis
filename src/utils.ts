import * as fs from "fs";
import csv from "csv-parser";

/**
 * Reads a CSV file and returns its contents as an array of objects.
 * @param filePath The path to the CSV file.
 * @returns A promise that resolves to an array of objects.
 */
async function readCsvFile(filePath: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const results: any[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data: any) => results.push(data))
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error: Error) => {
        reject(error);
      });
  });
}

export { readCsvFile };
