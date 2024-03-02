// excelUtils.js
import ExcelJS from 'exceljs';

export async function generateExcelFile(data) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    // Add headers
    worksheet.addRow(['Name', 'Age', 'Email']);

    // Add data
    data.forEach(row => {
        worksheet.addRow([row.name, row.age, row.email]);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
}

export async function generateCSVFile(data) {
    // Generate CSV content
    const csvContent = data.map(row => Object.values(row).join(',')).join('\n');

    return csvContent;
}
