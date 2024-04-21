import {
  CountryCode,
  isValidPhoneNumber,
  parsePhoneNumber,
} from 'libphonenumber-js/mobile';

export const getInternationalMobileNumber = (
  phoneNumber: string,
  countryCode: CountryCode = 'NG'
): string => {
  if (!isValidPhoneNumber(phoneNumber, countryCode)) {
    return phoneNumber;
  }

  const parsedPhoneNumber = parsePhoneNumber(phoneNumber, countryCode);

  return `${parsedPhoneNumber.number}`;
};

export const validMobileNumber = (
  value?: string,
  countryCode: CountryCode = 'NG'
) => {
  return isValidPhoneNumber(value || '', countryCode);
};
