// excelUtils.js
import ExcelJS from 'exceljs';

export async function generateExcelFile(data) {
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

export async function generateCSVFile(data) {
    // Generate CSV content
    const csvContent = data.map(row => Object.values(row).join(',')).join('\n');

    return csvContent;
}
