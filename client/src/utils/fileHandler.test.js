import { describe, it, expect } from 'vitest'
import { fileExistsInArray } from './fileHandler.js';

// TODO: write tests for generateExcelFile, generateCSVFile, validateFile


describe('fileExistsInArray', () => {
	it('should return true if file exists in array', () => {
	  const file = { name: 'existing.xlsx' };
	  const filesArray = [{ name: 'existing.xlsx' }];
	  expect(fileExistsInArray(file, filesArray)).toBe(true);
	});
  
	it('should return false if file does not exist in array', () => {
	  const file = { name: 'new.xlsx' };
	  const filesArray = [{ name: 'existing.xlsx' }];
	  expect(fileExistsInArray(file, filesArray)).toBe(false);
	});
});
  