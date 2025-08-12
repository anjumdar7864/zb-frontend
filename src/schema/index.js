import { templateNegativeWords } from "@/utils";
import * as Yup from "yup";

export const CreateAdminSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Invalid email format"
    )
    .required("Please enter valid email."),
  password: Yup.string().required("This field is required"),
  termsConditions: Yup.boolean().oneOf(
    [true],
    "You must agree to terms and conditions"
  ),
});

export const step1Schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  companyName: Yup.string().required("Company Name is required"),
  phoneNumber: Yup.string()
    .matches(/^[\d\s()+-]+$/, "Invalid phone number")
    .required("Phone Number is required"),
});

// Validation schema for Step 2
export const step2Schema = Yup.object().shape({
  experienceLevel: Yup.string().required("Experience Level is required"),
});

export const step3Schema = Yup.object().shape({
  targetMarketAreaCode: Yup.array()
    .required("Area Code is required")
    .min(2, "Area Code is required")
    .max(2, "Area Code is required"),
});

// Validation schema for Step 3
export const step4Schema = Yup.object().shape({
  billingStreet: Yup.string().required("Billing Street is required"),
  billingCity: Yup.string().required("Billing City is required"),
  // billingZip: Yup.number()
  //   .required("Billing Zip is required")
  //   .min(1, "Billing Zip must be at least 1 digit")
  //   .max(99999, "Billing Zip must be at most 5 digits")
  //   .typeError("Billing Zip must be a number"),
    billingZip: Yup.string()
    .required("Billing Zip is required")
    // .min(1, "Billing Zip must be at least 1 digit")
    // .max(99999, "Billing Zip must be at most 5 digits")
    // .typeError("Billing Zip must be a number")
    ,
  terms: Yup.boolean().optional("Terms and conditions must be accepted."),
  marketing: Yup.boolean(),
  policy: Yup.boolean().optional("Privacy policy must be accepted."),
});

// Validation schema for Step 4
export const step5Schema = Yup.object().shape({
  // hearAboutUs: Yup.string().required('Please tell us how you heard about us'),
  hearAboutUs: Yup.string(),
  // .required('Please tell us how you heard about us'),
});

export const forgetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      "Invalid email format"
    )
    .required("Please enter a valid Email Address"),
});

export const passwordResetSchema = Yup.object().shape({
  newPassword: Yup.string().required("New password is required"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});

export const passwordChangeSchema = Yup.object().shape({
  oldPassword: Yup.string().required("old password is required"),
  newPassword: Yup.string()
    .required("New password is required")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@$!%*?&)"
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});

export const userSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      "Invalid email format"
    )
    .required("Email is required"),
  role: Yup.string().required("Role is required"),
  aliasRepName: Yup.string().required("Alias/Rep Name is required"),
  companyName: Yup.string().required("Company Name is required"),
  phoneNumber: Yup.string()
    .matches(
      /^\(\d{3}\) \d{3}-\d{4}$/,
      "Phone number must be in the format (XXX) XXX-XXXX"
    )
    .required("Phone number is required"),
  active: Yup.boolean(),
  password: Yup.string().optional(),
});
export const masterUserSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      "Invalid email format"
    )
    .required("Email is required"),
  role: Yup.string().required("Role is required"),
});
export const roleSchema = Yup.object().shape({
  roleName: Yup.string().required("Role Name is required"),
});

export const permisionSchema = Yup.object().shape({
  permissionName: Yup.string().required("Permission Name is required"),
});

export const campaignSchema = Yup.object().shape({
  campaignName: Yup.string().required("Campaign Name is required"),
  market: Yup.string().required("Market is required"),
  callNumber: Yup.array().required("Call Forwarding Number is required"),
});

export const followUpCampaignSchema = Yup.object().shape({
  // campaign: Yup.string().required("Campaign is required"),
  market: Yup.string().required("Market is required"),
  title: Yup.string().required("Campaign Title is required"),
});

export const marketSchema = Yup.object().shape({
  // callForwardingNumber: Yup.string()
  //   .matches(
  //     /^\(\d{3}\) \d{3}-\d{4}$/,
  //     "Invalid phone number. Please use the format (123) 456-7890"
  //   )
  //   .required("Phone number is required"),
  callForwardingNumber: Yup.string()
  // .matches(/^\D*(\d\D*){11}$/, "Phone number must contain exactly 10 digits")
  .min(15, "Please provide a valid phone number.")
  .required("Phone number is required"),
  name: Yup.string().required("Name is required"),
  areaCode: Yup.string().required("Area code is required"),
  timeZone: Yup.string().required("Time zone is required"),
});

const validateNegativeKeywords = (thisPass, value) => {
  if (!value) return true;
  let negativeWords = [];
  for (const negativeKeyword of templateNegativeWords) {
    if (
      Array.from(
        value
          ?.trim()
          ?.split(" ")
          ?.join("")
          .matchAll(negativeKeyword?.trim()?.split(" ")?.join(""))
      ).length > 0
    ) {
      negativeWords.push(negativeKeyword);
    }
  }

  if (negativeWords.length === 0) return true;
  if (negativeWords.length === 1)
    return thisPass.createError({
      path: thisPass.path,
      message: `'${negativeWords[0]}' is negative word`,
    });

  return thisPass.createError({
    path: thisPass.path,
    message: `'${negativeWords.join(", ")}' are negative words`,
  });
};

function validateUniqueWords(value, word1, word2, word3, word4) {
  if (!value) return true;
  word1 = word1?.toLowerCase().trim().split(" ").join("");
  word2 = word2?.toLowerCase().trim().split(" ").join("");
  word3 = word3?.toLowerCase().trim().split(" ").join("");
  word4 = word4?.toLowerCase().trim().split(" ").join("");
  value = value?.toLowerCase().trim().split(" ").join("");
  return (
    value !== word1 && value !== word2 && value !== word3 && value !== word4
  );
}

export const textSpinnerSchema = Yup.object().shape({
  word1: Yup.string()
    .required("Alternative Word 1 is required")
    .min(2, "Alternative Word 1 must have at least 2 characters")
    .test("is-unique", "Alternative words must be unique", function (value) {
      let { word5, word2, word3, word4 } = this.parent;
      const result = validateNegativeKeywords(this, value);
      if (result !== true) return result;
      return validateUniqueWords(value, word5, word2, word3, word4);
    }),
  word2: Yup.string()
    .required("Alternative Word 2 is required")
    .min(2, "Alternative Word 2 must have at least 2 characters")
    .test("is-unique", "Alternative words must be unique", function (value) {
      let { word1, word5, word3, word4 } = this.parent;
      const result = validateNegativeKeywords(this, value);
      if (result !== true) return result;
      return validateUniqueWords(value, word1, word5, word3, word4);
    }),
  word3: Yup.string()
    .required("Alternative Word 3 is required")
    .min(2, "Alternative Word 3 must have at least 2 characters")
    .test("is-unique", "Alternative words must be unique", function (value) {
      let { word1, word2, word5, word4 } = this.parent;
      const result = validateNegativeKeywords(this, value);
      if (result !== true) return result;
      return validateUniqueWords(value, word1, word2, word5, word4);
    }),
  word4: Yup.string()
    .min(2, "Alternative Word 4 must have at least 2 characters")
    .test("is-unique", "Alternative words must be unique", function (value) {
      let { word1, word2, word3, word5 } = this.parent;
      const result = validateNegativeKeywords(this, value);
      if (result !== true) return result;
      return validateUniqueWords(value, word1, word2, word3, word5);
    }),
  word5: Yup.string()
    .min(2, "Alternative Word 5 must have at least 2 characters")
    .test("is-unique", "Alternative words must be unique", function (value) {
      let { word1, word2, word3, word4 } = this.parent;
      const result = validateNegativeKeywords(this, value);
      if (result !== true) return result;
      return validateUniqueWords(value, word1, word2, word3, word4);
    }),
});

export const textSpinnerSchema2 = Yup.object().shape({
  word1: Yup.string()
    .required("Alternative Word 1 is required")
    .min(2, "Alternative Word 1 must have at least 2 characters")
    .test("is-unique", "Alternative words must be unique", function (value) {
      let { word5, word2, word3, word4 } = this.parent;
      const result = validateNegativeKeywords(this, value);
      if (result !== true) return result;
      return validateUniqueWords(value, word5, word2, word3, word4);
    }),
  word2: Yup.string()
    .required("Alternative Word 2 is required")
    .min(2, "Alternative Word 2 must have at least 2 characters")
    .test("is-unique", "Alternative words must be unique", function (value) {
      let { word1, word5, word3, word4 } = this.parent;
      const result = validateNegativeKeywords(this, value);
      if (result !== true) return result;
      return validateUniqueWords(value, word1, word5, word3, word4);
    }),
  word3: Yup.string()
    // .required("Alternative Word 3 is required")
    // .min(2, "Alternative Word 3 must have at least 2 characters")
    .test("is-unique", "Alternative words must be unique", function (value) {
      let { word1, word2, word5, word4 } = this.parent;
      const result = validateNegativeKeywords(this, value);
      if (result !== true) return result;
      return validateUniqueWords(value, word1, word2, word5, word4);
    }),
  word4: Yup.string()
    .min(2, "Alternative Word 4 must have at least 2 characters")
    .test("is-unique", "Alternative words must be unique", function (value) {
      let { word1, word2, word3, word5 } = this.parent;
      const result = validateNegativeKeywords(this, value);
      if (result !== true) return result;
      return validateUniqueWords(value, word1, word2, word3, word5);
    }),
  word5: Yup.string()
    .min(2, "Alternative Word 5 must have at least 2 characters")
    .test("is-unique", "Alternative words must be unique", function (value) {
      let { word1, word2, word3, word4 } = this.parent;
      const result = validateNegativeKeywords(this, value);
      if (result !== true) return result;
      return validateUniqueWords(value, word1, word2, word3, word4);
    }),
});

export const createTemplateSchema = Yup.object().shape({
  templateName: Yup.string().required("Template Name is required"),
  templateType: Yup.string().required("Template Type is required"),
  message1: Yup.string().required("Message1 is required"),
  message2: Yup.string().required("Message2 is required"),
  message3: Yup.string().required("Message3 is required"),
  message4: Yup.string().required("Message4 is required"),
  message5: Yup.string().required("Message5 is required"),
});

export const profileUpdateSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  aliasRepName: Yup.string().required("Alias/Rep Name is required"),
  companyName: Yup.string().required("Company Name is required"),
  phoneNumber: Yup.string()
    .matches(
      /^\(\d{3}\) \d{3}-\d{4}$/,
      "Phone number must be in the format (XXX) XXX-XXXX"
    )
    .required("Phone number is required"),
});

export const replyTemplateCategorySchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

export const replyTemplateSchema = Yup.object().shape({
  category: Yup.string().required("Category is required"),
  title: Yup.string().required("Title is required"),
  message: Yup.string().required("Message is required"),
});

export const setRemainderSchema = Yup.object().shape({
  note: Yup.string().required("Note is required"),
  message: Yup.string().required("Message is required"),
  date: Yup.date()
    // .min(new Date(), ("Date is required"))
    .required("Date is required"),
});

export const dncSchema = Yup.object().shape({
  number: Yup.string()
    .matches(
      /^1 \(\d{3}\) \d{3}-\d{4}$/,
      "Phone number must be in the format (XXX) XXX-XXXX"
    )
    .required("Phone number is required"),
});
