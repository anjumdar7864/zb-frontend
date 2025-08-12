import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const spinnerRegex = /\[([^\]]+)?\]/g;
const placeholderRegex = /\{([^}]+)?\}/g;

const negativeKeywords = [
  "random",
  "public",
  "blue",
  "out of the blue",
  "county",
  "properties",
  "purchasing",
  "selling",
  "buyer",
  "hoping",
  "right",
  "looking",
  "investment",
  "consider",
  "considered",
  "person",
  "not sure",
  "interested",
  "story",
  "apologies",
  "apologize",
  "covid",
  "we buy house",
  "we buy houses",
   "sell house", "house to sell", "sell home", "home to sell", "your place", "your house", "bid", "coinbase",
  "bitcoin", "request to withdraw", "email change", "block the transaction", "withdraw funds", "coinbase",
  "affiliate", "affiliates", "referral", "referrals", "bonus", "commission", "commissions", "percent",
  "percentage", "gratuity", "dividend",  "%", "i came across", "i’ve come across", "came across",
  "i cam across", "i came acros", "i cam acros", "i’ve com acros", "cam across", "came acros", "come across",
  "came accrossed", "i come across", "i drove by", "drove by", "drivin by", "was driving by", "drove past",
  "drivin past", "was passin by", "just drove by", "i was drivin by", "passed by", "came by", "came thru",
  "was around the area", "are you the owner", "is this the owner", "this is {firstname}", "correct",
  "you’re the owner right", "am i speaking with the owner", "is this your property",
  "is this still yours", "are you still the homeowner", "are you the homeowner",
  "this your place", "this still your house",
];

const useAltMessage = () => {
  const [message, setMessage] = useState("");
  const [length, setLength] = useState(0);
  const [html, setHtml] = useState("");
  const [errors, setErrors] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [validations, setValidations] = useState([
    { name: "Minimum of 8 characters", isDone: false },
    { name: "Cannot have any merge fields", isDone: true },
    { name: "Must have no negative/restricted keywords", isDone: true },
    {
      name: "All Text Spinners must be valid",
      isDone: true,
    },
  ]);

  const [variations, setVariations] = useState([]);

  const validateLength = () => {
    if (message.length < 8) {
      setValidations((p) => {
        p[0].isDone = false;
        return p;
      });
    } else {
      setValidations((p) => {
        p[0].isDone = true;
        return p;
      });
    }
  };

  const findFirstMismatchedParentheses = () => {
    const stack = [];
    const errors = [];

    for (let i = 0; i < message.length; i++) {
      const char = message[i];

      if (char === "[") {
        stack.push({ char, position: i });
      } else if (char === "]") {
        if (stack.length === 0) {
          errors.push(`Mismatched parentheses at postion ${i + 1}`);
          break;
        }
        const top = stack.pop();
        if (char === "]" && top.char !== "[") {
          errors.push(`Mismatched parentheses at postion ${i + 1}`);
          break;
        }
      }
    }

    if (stack.length > 0) {
      errors.push(`Mismatched parentheses at postion ${stack[0].position + 1}`);
    }

    setErrors((p) => [...p, ...errors]);
  };

  const formatTemplateString = () => {
    setHtml(
      message
        .replace(placeholderRegex, '<span class="placeholder">{$1}</span>')
        .replace(spinnerRegex, '<span class="text-spinner">[$1]</span>')
        .replace(/ {2,}/g, (match) => "&nbsp;".repeat(match.length))
        .replace(/\n/g, "<br>")
    );
  };

  const validatePlaceholder = () => {
    const matches = Array.from(message.matchAll(placeholderRegex)).map(
      (match) => match[1]
    );

    let errors = [];

    if (matches.length === 0) {
      setValidations((p) => {
        p[1].isDone = true;
        return p;
      });
    } else {
      errors.push("Alt message cannot have any merge fields");
      setValidations((p) => {
        p[1].isDone = false;
        return p;
      });
    }

    setErrors((p) => [...p, ...errors]);
  };

  const validateTextSpinner = () => {
    const matches = Array.from(message.matchAll(spinnerRegex)).map(
      (match) => match[1]
    );

    let errors = [];
    for (const match of matches) {
      if (!match) {
        errors.push(`Empty Text Spinner isn't allowed!`);
        continue;
      }

      const arr = match.split("/");
      if (arr.length < 2) {
        errors.push(
          `Each Text Spinner must be contain more than or equal to 2 elements.`
        );
      }
      if (arr.length > 5) {
        errors.push(
          `Each Text Spinner must be contain less than or equal to 5 elements.`
        );
      }

      for (const element of arr) {
        if (element.length < 2) {
          errors.push(`Each element must be contain at least 2 characters.`);
        }
      }
    }

    if (errors.length === 0) {
      setValidations((p) => {
        p[3].isDone = true;
        return p;
      });
    } else {
      setValidations((p) => {
        p[3].isDone = false;
        return p;
      });
    }

    setErrors((p) => [...p, ...errors]);
  };

  const validateNegativeWords = () => {
    const errors = [];
    const msg = message.replace(/[().]/g, "").replace(/\./g, "").toLowerCase();

    const negativeWords = [];
    for (const negativeKeyword of negativeKeywords) {
      if (Array.from(msg.matchAll(negativeKeyword)).length > 0) {
        negativeWords.push(negativeKeyword);
      }
    }

    if (negativeWords.length > 0) {
      if (negativeWords.length === 1) {
        errors.push(`"${negativeWords[0]}" is a negative word.`);
      } else {
        errors.push(`"${negativeWords.join(", ")}" are negative words.`);
      }
    }

    if (errors.length === 0) {
      setValidations((p) => {
        p[2].isDone = true;
        return p;
      });
    } else {
      setValidations((p) => {
        p[2].isDone = false;
        return p;
      });
    }

    setErrors((p) => [...p, ...errors]);
  };

  const extractPlaceholders = (baseString) => {
    const placeholderRegex = /\[([^\]]+)\]/g;
    const placeholders = [];

    let match;
    while ((match = placeholderRegex.exec(baseString)) !== null) {
      placeholders.push(match[1].split("/"));
    }

    return placeholders;
  };

  const generateVariationsRecursive = (
    baseString,
    placeholders,
    currentVariation,
    placeholderIndex,
    variations
  ) => {
    if (placeholderIndex === placeholders.length) {
      variations.push(currentVariation);
    } else {
      for (const option of placeholders[placeholderIndex]) {
        const nextVariation = currentVariation.replace(
          `[${placeholders[placeholderIndex].join("/")}]`,
          option
        );
        generateVariationsRecursive(
          nextVariation,
          placeholders,
          nextVariation,
          placeholderIndex + 1,
          variations
        );
      }
    }
  };

  const generateAllVariations = () => {
    const baseString = message;
    const variations = [];
    const placeholders = extractPlaceholders(baseString);

    if (placeholders.length === 0) {
      setVariations(baseString.length > 0 ? [baseString] : []);
      return;
    }

    generateVariationsRecursive(
      baseString,
      placeholders,
      baseString,
      0,
      variations
    );

    setVariations(variations);
  };

  useEffect(() => {
    if (message.length > 320) {
      toast.error(
        "Please make sure you message is less than or equal to 320 characters."
      );
      setMessage((p) => p.slice(0, 320));
      setIsDone(false);
      return;
    }

    setLength(message.length);
    setErrors([]);
    setIsDone(false);

    formatTemplateString();
    validateLength();
    findFirstMismatchedParentheses();
    validatePlaceholder();
    validateTextSpinner();
    validateNegativeWords();
    generateAllVariations();
  }, [message]);

  useEffect(() => {
    if (
      errors.length === 0 &&
      !validations.find((validation) => !validation.isDone) &&
      message !== ""
    ) {
      setIsDone(true);
    } else {
      setIsDone(false);
    }
  }, [message, length, html, errors, validations, variations]);

  return {
    message,
    setMessage,
    length,
    html,
    isDone,
    validations,
    variations,
    errors,
    setErrors,
  };
};

export default useAltMessage;
