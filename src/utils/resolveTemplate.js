import { replace } from "lodash-es";

export default function resolveTemplate(messageTemplate, data) {
  let message = messageTemplate;
  message = replace(message, /\{FirstName}/gi, () => {
    return data?.firstName || "{FirstName}";
  });
  message = replace(message, /\{LastName}/gi, () => {
    return data?.lastName || "{LastName}";
  });
  message = replace(message, /\{Phone1}/gi, () => {
    return data?.phone1 || "{Phone1}";
  });
  message = replace(message, /\{Phone2}/gi, () => {
    return data?.phone2 || "{Phone2}";
  });
  message = replace(message, /\{Phone3}/gi, () => {
    return data?.phone3 || "{Phone3}";
  });
  message = replace(message, /\{PropertyAddress}/gi, () => {
    return data?.propertyAddress || "{PropertyAddress}";
  });
  message = replace(message, /\{PropertyCity}/gi, () => {
    return data?.propertyCity || "{PropertyCity}";
  });
  message = replace(message, /\{PropertyState}/gi, () => {
    return data?.propertyState || "{PropertyState}";
  });
  message = replace(message, /\{PropertyCountry}/gi, () => {
    return data?.propertyCountry || "{PropertyCountry}";
  });
  message = replace(message, /\{PropertyZip}/gi, () => {
    return data?.propertyZip || "{PropertyZip}";
  });
  message = replace(message, /\{MailingAddress}/gi, () => {
    return data?.mailingAddress || "{MailingAddress}";
  });
  message = replace(message, /\{MailingCity}/gi, () => {
    return data?.mailingCity || "{MailingCity}";
  });
  message = replace(message, /\{MailingState}/gi, () => {
    return data?.mailingState || "{MailingState}";
  });
  message = replace(message, /\{MailingZip}/gi, () => {
    return data?.mailingZip || "{MailingZip}";
  });
  message = replace(message, /\{Email}/gi, () => {
    return data?.email || "{Email}";
  });
  message = replace(message, /\{Acreage}/gi, () => {
    return data?.acreage || "{Acreage}";
  });
  message = replace(message, /\{AliasRepName}/gi, () => {
    return data?.aliasRepName || "{AliasRepName}";
  });
  message = replace(message, /\{AliasRepName}/gi, () => {
    return data?.aliasName || "{AliasRepName}";
  });
  message = replace(message, /\{CompanyName}/gi, () => {
    return data?.companyName || "{CompanyName}";
  });
  message = replace(message, /\{APN}/gi, () => {
    return data?.apn || "{APN}";
  });
  message = replace(message, /\{PROPERTYCOUNTY}/gi, () => {
    return data?.propertyCounty || "{PROPERTYCOUNTY}";
  });
  message = replace(message, /\{ACREAGE}/gi, () => {
    return data?.acreage || "{ACREAGE}";
  });

  return message;
}
