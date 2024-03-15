import ExcelJS from 'exceljs'
import {
  FEEDBACK_TYPES,
  FEEDBACK_CODES,
  FEEDBACK_MESSAGES
} from '../constants/feedbackMessages.js';
import { addFeedbackToStore } from './addFeedbackToStore';

//  - - - - DOWNLOAD FUNCTIONALITY - - - -
export async function generateExcelFile (data) {
  const workbook = new ExcelJS.Workbook()

  const worksheet = workbook.addWorksheet('Sheet1')
  worksheet.addRow(['Name', 'Age', 'Email'])

  /* const worksheet2 = workbook.addWorksheet('Sheet2');
    worksheet2.addRow(['Name2', 'Age2', 'Email2']); */

  // Add data
  data.forEach(row => {
    worksheet.addRow([row.name, row.age, row.email])
  })

  const buffer = await workbook.xlsx.writeBuffer()
  return buffer
}

export async function generateCSVFile (data) {
  // Generate CSV content
  const csvContent = data.map(row => Object.values(row).join(',')).join('\n')

  return csvContent
}

//  - - - - UPLOAD FUNCTIONALITY - - - -

export function validateFile (file) {
  // Check if the file type is valid
  if (!['.csv', '.xlsx'].includes(file.name.slice(file.name.lastIndexOf('.')))) {
    
    addFeedbackToStore(FEEDBACK_TYPES.ERROR, FEEDBACK_CODES.UNSUPPORTED_CONTENT_TYPE, FEEDBACK_MESSAGES.UNSUPPORTED_CONTENT_TYPE)
    return false
  }
  // Check if the file size exceeds the limit
  if (file.size > 10 * 1024 * 1024) {
    addFeedbackToStore(FEEDBACK_TYPES.ERROR, FEEDBACK_CODES.CONTENT_TO_LARGE, FEEDBACK_MESSAGES.CONTENT_TO_LARGE)
    return false
  }
  return true
}

export function fileExistsInArray (file, filesArray) {
  return filesArray.some(existingFile => existingFile.name === file.name)
}
