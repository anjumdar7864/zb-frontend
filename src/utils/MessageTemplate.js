const spinnerRegex = /\[([^\]]+)\]/g;
const placeholderRegex = /\{([^}]+)\}/g;
const validPlaceholders = new Set([
  "FirstName",
  "LastName",
  "PropertyAddress",
  "PropertyCity",
  "MailingAddress",
  "AliasRepName",
  "CompanyName",
  "APN",
  "PROPERTYCOUNTY",
  "ACREAGE",
]);

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
  "offer",
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

class ActualMessage {
  constructor() {
    this.message = "";
    this.length = 0;
    this.html = "";
    this.errors = [];
    this.isDone = false;
    this.validations = [
      { name: "Minimum of 8 characters", isDone: false },
      { name: "At least 2 Text Spinners [0/2]", isDone: false },
      {
        name: "Each Text Spinner must have at least 3 elements",
        isDone: false,
      },
      { name: "Must have Merge Field", isDone: false },
      { name: "Must have no negative/restricted keywords", isDone: true },
      {
        name: "All Merge Fields and Text Spinners must be valid",
        isDone: true,
      },
    ];
    this.variations = [];
  }

  validateLength() {
    if (this.message.length < 8) {
      this.validations[0].isDone = false;
    } else {
      this.validations[0].isDone = true;
    }
  }

  findFirstMismatchedParentheses() {
    const stack = [];
    let s = this.message;

    for (let i = 0; i < s.length; i++) {
      const char = s[i];

      if (char === "{" || char === "[") {
        stack.push({ char, position: i });
      } else if (char === "}" || char === "]") {
        if (stack.length === 0) {
          this.errors.push(`Mismatched parentheses at postion ${i + 1}`);
          break;
        }
        const top = stack.pop();
        if (
          (char === "}" && top.char !== "{") ||
          (char === "]" && top.char !== "[")
        ) {
          this.errors.push(`Mismatched parentheses at postion ${i + 1}`);
          break;
        }
      }
    }

    if (stack.length > 0) {
      this.errors.push(
        `Mismatched parentheses at postion ${stack[0].position + 1}`
      );
    }
  }

  formatTemplateString() {
    this.html = this.message
      .replace(placeholderRegex, '<span class="placeholder">{$1}</span>')
      .replace(spinnerRegex, '<span class="text-spinner">[$1]</span>');
  }

  validatePlaceholder() {
    const matches = Array.from(this.message.matchAll(placeholderRegex)).map(
      (match) => match[1]
    );

    if (matches.length >= 1) {
      this.validations[3].isDone = true;
    } else {
      this.validations[3].isDone = false;
    }

    let errors = [];
    const usedPlaceholder = new Set([]);
    for (const match of matches) {
      if (!validPlaceholders.has(match)) {
        errors.push(`"${match}" isn't a valid merge field.`);
      } else {
        if (usedPlaceholder.has(match)) {
          errors.push(`"${match}" is already used.`);
        } else {
          usedPlaceholder.add(match);
        }
      }
    }

    this.errors.push(...errors);
    return errors;
  }

  validateTextSpinner() {
    const matches = Array.from(this.message.matchAll(spinnerRegex)).map(
      (match) => match[1]
    );
    let length = matches.length;
    if (length >= 2) {
      this.validations[1] = {
        name: "At least 2 Text Spinners [2/2]",
        isDone: true,
      };
    } else if (length === 1) {
      this.validations[1] = {
        name: "At least 2 Text Spinners [1/2]",
        isDone: false,
      };
    } else {
      this.validations[1] = {
        name: "At least 2 Text Spinners [0/2]",
        isDone: false,
      };
    }

    let errors = [];
    for (const match of matches) {
      const arr = match.split("/");
      if (arr.length < 3) {
        errors.push(
          `Each Text Spinner must be contain more than or equal to 3 elements.`
        );
      }
      if (arr.length > 5) {
        errors.push(
          `Each Text Spinner must be contain more than or equal to 3 elements.`
        );
      }

      for (const element of arr) {
        if (element.length < 3) {
          errors.push(`Each element must be contain at least 3 characters.`);
        }
      }
    }

    if (errors.length === 0) {
      this.validations[2].isDone = true;
    } else {
      this.validations[2].isDone = false;
    }

    this.errors.push(...errors);
    return errors;
  }

  validateBothPlaceholderAndTextSpinner() {
    const errors = [
      ...this.validatePlaceholder(),
      ...this.validateTextSpinner(),
    ];

    if (errors.length === 0) {
      this.validations[5].isDone = true;
    } else {
      this.validations[5].isDone = false;
    }
  }
  validateNegativeWords() {
    const errors = [];
    const message = this.message
      .replace(/[().]/g, "")
      .replace(/\./g, "")
      .toLowerCase();

    for (const negativeKeyword of negativeKeywords) {
      if (Array.from(message.matchAll(negativeKeyword)).length > 0) {
        errors.push(`"${negativeKeyword}" is a negative word.`);
      }
    }

    if (errors.length === 0) {
      this.validations[4].isDone = true;
    } else {
      this.validations[4].isDone = false;
    }

    this.errors.push(...errors);
  }

  extractPlaceholders(baseString) {
    const placeholderRegex = /\[([^\]]+)\]/g;
    const placeholders = [];

    let match;
    while ((match = placeholderRegex.exec(baseString)) !== null) {
      placeholders.push(match[1].split("/"));
    }

    return placeholders;
  }

  generateVariationsRecursive(
    baseString,
    placeholders,
    currentVariation,
    placeholderIndex,
    variations
  ) {
    if (placeholderIndex === placeholders.length) {
      variations.push(currentVariation);
    } else {
      for (const option of placeholders[placeholderIndex]) {
        const nextVariation = currentVariation.replace(
          `[${placeholders[placeholderIndex].join("/")}]`,
          option
        );
        this.generateVariationsRecursive(
          nextVariation,
          placeholders,
          nextVariation,
          placeholderIndex + 1,
          variations
        );
      }
    }
  }

  generateAllVariations() {
    const baseString = this.message.replace(
      placeholderRegex,
      "<strong>$1</strong>"
    );
    const variations = [];
    const placeholders = this.extractPlaceholders(baseString);

    if (placeholders.length === 0) {
      variations.push(baseString);
      return variations;
    }

    this.generateVariationsRecursive(
      baseString,
      placeholders,
      baseString,
      0,
      variations
    );

    this.variations = variations;
  }

  setMessage(message) { }
}

class AltMessage {
  constructor() {
    this.message = "";
    this.length = 0;
    this.html = "";
    this.errors = [];
    this.isDone = false;
    this.validations = [
      { name: "Minimum of 8 characters", isDone: false },
      { name: "Cannot have any merge fields", isDone: true },
      { name: "Must have no negative/restricted keywords", isDone: true },
      {
        name: "All Text Spinners must be valid",
        isDone: true,
      },
    ];
    this.variations = [];
  }

  validateLength() {
    if (this.message.length < 8) {
      this.validations[0].isDone = false;
    } else {
      this.validations[0].isDone = true;
    }
  }

  findFirstMismatchedParentheses() {
    const stack = [];
    let s = this.message;

    for (let i = 0; i < s.length; i++) {
      const char = s[i];

      if (char === "[") {
        stack.push({ char, position: i });
      } else if (char === "]") {
        if (stack.length === 0) {
          this.errors.push(`Mismatched parentheses at postion ${i + 1}`);
          break;
        }
        const top = stack.pop();
        if (char === "]" && top.char !== "[") {
          this.errors.push(`Mismatched parentheses at postion ${i + 1}`);
          break;
        }
      }
    }

    if (stack.length > 0) {
      this.errors.push(
        `Mismatched parentheses at postion ${stack[0].position + 1}`
      );
    }
  }

  formatTemplateString() {
    this.html = this.message.replace(
      spinnerRegex,
      '<span class="text-spinner">[$1]</span>'
    );
  }

  validatePlaceholder() {
    const matches = Array.from(this.message.matchAll(placeholderRegex)).map(
      (match) => match[1]
    );

    if (matches.length === 0) {
      this.validations[1].isDone = true;
    } else {
      this.errors.push("Alt message cannot have any merge fields");
      this.validations[1].isDone = false;
    }
  }

  validateTextSpinner() {
    const matches = Array.from(this.message.matchAll(spinnerRegex)).map(
      (match) => match[1]
    );
    let errors = [];
    for (const match of matches) {
      const arr = match.split("/");
      if (arr.length < 2) {
        errors.push(
          `Each Text Spinner must be contain more than or equal to 2 elements.`
        );
      }
      if (arr.length > 5) {
        errors.push(
          `Each Text Spinner must be contain more than or equal to 3 elements.`
        );
      }

      for (const element of arr) {
        if (element.length < 3) {
          errors.push(`Each element must be contain at least 3 characters.`);
        }
      }
    }

    if (errors.length === 0) {
      this.validations[3].isDone = true;
    } else {
      this.validations[3].isDone = false;
    }

    this.errors.push(...errors);
  }

  validateNegativeWords() {
    const errors = [];
    const message = this.message
      .replace(/[().]/g, "")
      .replace(/\./g, "")
      .toLowerCase();

    for (const negativeKeyword of negativeKeywords) {
      if (Array.from(message.matchAll(negativeKeyword)).length > 0) {
        errors.push(`"${negativeKeyword}" is a negative word.`);
      }
    }

    if (errors.length === 0) {
      this.validations[2].isDone = true;
    } else {
      this.validations[2].isDone = false;
    }

    this.errors.push(...errors);
  }

  extractPlaceholders(baseString) {
    const placeholderRegex = /\[([^\]]+)\]/g;
    const placeholders = [];

    let match;
    while ((match = placeholderRegex.exec(baseString)) !== null) {
      placeholders.push(match[1].split("/"));
    }

    return placeholders;
  }

  generateVariationsRecursive(
    baseString,
    placeholders,
    currentVariation,
    placeholderIndex,
    variations
  ) {
    if (placeholderIndex === placeholders.length) {
      variations.push(currentVariation);
    } else {
      for (const option of placeholders[placeholderIndex]) {
        const nextVariation = currentVariation.replace(
          `[${placeholders[placeholderIndex].join("/")}]`,
          option
        );
        this.generateVariationsRecursive(
          nextVariation,
          placeholders,
          nextVariation,
          placeholderIndex + 1,
          variations
        );
      }
    }
  }

  generateAllVariations() {
    const baseString = this.message;
    const variations = [];
    const placeholders = this.extractPlaceholders(baseString);

    if (placeholders.length === 0) {
      variations.push(baseString);
      return variations;
    }

    this.generateVariationsRecursive(
      baseString,
      placeholders,
      baseString,
      0,
      variations
    );

    this.variations = variations;
  }

  setMessage(message) {
    if (message.length > 320) return false;

    this.message = message;
    this.length = this.message.length;
    this.errors = [];
    this.isDone = false;

    this.formatTemplateString();
    this.validateLength();

    this.findFirstMismatchedParentheses();
    this.validatePlaceholder();
    this.validateTextSpinner();

    this.validateNegativeWords();
    this.generateAllVariations();

    if (this.errors.length === 0) {
      this.isDone = true;
    } else {
      this.isDone = false;
    }
    return true;
  }
}

class MessageTemplate {
  constructor() {
    this.messages = [
      new ActualMessage(),
      new ActualMessage(),
      new ActualMessage(),
      new ActualMessage(),
      new AltMessage(),
    ];

    this.currentIndex = 0;
  }

  setMessage(message) {
    return this.messages[this.currentIndex].setMessage(message);
  }

  allVariations() {
    const variations = [];

    for (const message of this.messages) {
      variations.push(...message.variations);
    }

    return variations;
  }
}

export default MessageTemplate;
