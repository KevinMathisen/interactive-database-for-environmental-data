import ExcelJS from 'exceljs'

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
    alert('Invalid file type. Only .csv and .xlsx files are allowed.')
    return false
  }
  // Check if the file size exceeds the limit
  if (file.size > 10 * 1024 * 1024) {
    alert('File size exceeds the maximum limit of 5MB.')
    return false
  }
  return true
}

export function fileExistsInArray (file, filesArray) {
  return filesArray.some(existingFile => existingFile.name === file.name)
}
