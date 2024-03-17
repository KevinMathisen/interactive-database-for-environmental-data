import ExcelJS from 'exceljs';
import {
  FEEDBACK_TYPES,
  FEEDBACK_CODES,
  FEEDBACK_MESSAGES
} from '../constants/feedbackMessages.js';
import { addFeedbackToStore } from './addFeedbackToStore';

//  - - - - DOWNLOAD FUNCTIONALITY - - - -
/**
 * Generates an Excel file from the given data
 * @param {Array<object>} data - The data to generate the Excel file from
 * @returns {Promise<Buffer>} - A promise which resolves to a buffer containing the Excel file
 */
export async function generateExcelFile (data) {
  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet('Sheet1');
  worksheet.addRow(['Name', 'Age', 'Email']);

  /* const worksheet2 = workbook.addWorksheet('Sheet2');
    worksheet2.addRow(['Name2', 'Age2', 'Email2']); */

  // Add data
  data.forEach(row => {
    worksheet.addRow([row.name, row.age, row.email]);
  });

  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
}

/**
 * Generates a CSV file from the given data
 * @param {Array<object>} data - The data to generate the CSV file from
 * @returns {Promise<string>} - A promise which resolves to a string containing the CSV content
 */
export async function generateCSVFile (data) {
  // Generate CSV content
  const csvContent = data.map(row => Object.values(row).join(',')).join('\n');

  return csvContent;
}

//  - - - - UPLOAD FUNCTIONALITY - - - -

/**
 * Validated the file type and size
 * @param {File} file - The file to validate
 * @returns {boolean} - True if the file is valid, else false
 */
export function validateFile (file) {
  // Check if the file type is valid
  if (!['.csv', '.xlsx'].includes(file.name.slice(file.name.lastIndexOf('.')))) {
    
    addFeedbackToStore(FEEDBACK_TYPES.ERROR, FEEDBACK_CODES.UNSUPPORTED_CONTENT_TYPE, FEEDBACK_MESSAGES.UNSUPPORTED_CONTENT_TYPE);
    return false;
  }
  // Check if the file size exceeds the limit
  if (file.size > 10 * 1024 * 1024) {
    addFeedbackToStore(FEEDBACK_TYPES.ERROR, FEEDBACK_CODES.CONTENT_TO_LARGE, FEEDBACK_MESSAGES.CONTENT_TO_LARGE);
    return false;
  }
  return true;
}

/**
 * Reads the content of a CSV file
 * @param {File} file - The file to check
 * @param {Array<File>} filesArray - The array of files to check
 * @returns {boolean} - True if the file exists in the array, else false
 */
export function fileExistsInArray (file, filesArray) {
  return filesArray.some(existingFile => existingFile.name === file.name);
}
