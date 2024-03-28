import { AbstractControl, ValidatorFn } from '@angular/forms';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null; // If the value is empty, validation passes
    }

    const phoneNumberObj = parsePhoneNumberFromString(control.value);
    if (phoneNumberObj && phoneNumberObj.isValid()) {
      return null; // If the phone number is valid, return null (no validation error)
    } else {
      return { 'invalidPhoneNumber': { value: control.value } }; // Return validation error
    }
  };
}
