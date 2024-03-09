import * as attributesToFilterOn from '../constants/attributesToFilterOn'
import { addFeedbackToStore } from './addFeedbackToStore.js'
import { FEEDBACK_TYPES, FEEDBACK_CODES, FEEDBACK_MESSAGES } from '../constants/feedbackMessages'

/**
 * Filters a list of objects based on if a value given exists as a substring for a given attribute
 *
 * @param {object[]} objects - The list of objects to filter
 * @param {string[]} attributes - The attributes to filter on
 * @param {string} value - The value which should exist in the attribute value
 * @returns {object[]} - A filtered list of objects
 */
function filterDataBasedOnAttributeSubstring (objects, attributes, value) {
  // Checks for each object if the value is a subtext of the attributes, ignoring case
  return objects.filter(object =>
    attributes.some(attribute => object[attribute].toLowerCase().includes(value.toLowerCase())))
}

/**
 * Filters a list of objects based on if a given attribute is in a list of values
 *
 * @param {object[]} objects - The list of objects to filter
 * @param {string} attribute - The attribute to filter on
 * @param {string[]} value - The value which should be equal to the attribute value
 * @returns {object[]} - A filtered list of objects
 */
function filterDataBasedOnAttributeInList (objects, attribute, values) {
  // return the objects which have an attribute that is in the values list
  return objects.filter(object => values.includes(object[attribute]))
}


