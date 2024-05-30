import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export function phoneNumberValidator(
  countryControl: AbstractControl | null
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value || !countryControl) {
      return null; // Return null if there's no value to validate or countryControl is null
    }

    const country = countryControl.value;
    try {
      const phoneNumber = parsePhoneNumberFromString(control.value, country);
      // Additional check for Indian phone numbers
      if (country === 'IN') {
        const isValidIndianNumber = /^\d{10}$/.test(control.value);
        return isValidIndianNumber
          ? null
          : { invalidPhoneNumber: { value: control.value } };
      }
      if (phoneNumber && phoneNumber.isPossible() && phoneNumber.isValid()) {
        return null; // Return null if the phone number is valid
      }
    } catch (error) {
      // If parsing fails, it means the number is invalid
      return { invalidPhoneNumber: { value: control.value } };
    }

    return { invalidPhoneNumber: { value: control.value } }; // Return an error if the phone number is invalid
  };
}

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(control.value)
      ? null
      : { invalidEmail: { value: control.value } };
  };
}
