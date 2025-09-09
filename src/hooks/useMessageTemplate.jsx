import { useCallback, useEffect, useMemo, useState } from "react";
import useActualMessage from "./useActualMessage";
import useAltMessage from "./AltMessage";

const useMessageTemplate = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allVariations, setAllVariations] = useState([]);
  const {
    errors: errors1,
    html: html1,
    isDone: isDone1,
    length: length1,
    message: message1,
    setMessage: setMessage1,
    validations: validations1,
    variations: variations1,
    setErrors: setErrors1,
  } = useActualMessage();
  const {
    errors: errors2,
    html: html2,
    isDone: isDone2,
    length: length2,
    message: message2,
    setMessage: setMessage2,
    validations: validations2,
    variations: variations2,
    setErrors: setErrors2,
  } = useActualMessage();
  const {
    errors: errors0,
    html: html0,
    isDone: isDone0,
    length: length0,
    message: message0,
    setMessage: setMessage0,
    validations: validations0,
    variations: variations0,
    setErrors: setErrors0,
  } = useActualMessage();
  const {
    errors: errors3,
    html: html3,
    isDone: isDone3,
    length: length3,
    message: message3,
    setMessage: setMessage3,
    validations: validations3,
    variations: variations3,
    setErrors: setErrors3,
  } = useActualMessage();
  const {
    errors: errors4,
    html: html4,
    isDone: isDone4,
    length: length4,
    message: message4,
    setMessage: setMessage4,
    validations: validations4,
    variations: variations4,
    setErrors: setErrors4,
  } = useAltMessage();

  const messages = useMemo(
    () => [
      {
        errors: errors0,
        html: html0,
        isDone: isDone0,
        length: length0,
        message: message0,
        setMessage: setMessage0,
        validations: validations0,
        variations: variations0,
        setErrors: setErrors0,
      },
      {
        errors: errors1,
        html: html1,
        isDone: isDone1,
        length: length1,
        message: message1,
        setMessage: setMessage1,
        validations: validations1,
        variations: variations1,
        setErrors: setErrors1,
      },
      {
        errors: errors2,
        html: html2,
        isDone: isDone2,
        length: length2,
        message: message2,
        setMessage: setMessage2,
        validations: validations2,
        variations: variations2,
        setErrors: setErrors2,
      },
      {
        errors: errors3,
        html: html3,
        isDone: isDone3,
        length: length3,
        message: message3,
        setMessage: setMessage3,
        validations: validations3,
        variations: variations3,
        setErrors: setErrors3,
      },
      {
        errors: errors4,
        html: html4,
        isDone: isDone4,
        length: length4,
        message: message4,
        setMessage: setMessage4,
        validations: validations4,
        variations: variations4,
        setErrors: setErrors4,
      },
    ],
    [
      errors0,
      errors1,
      errors2,
      errors3,
      errors4,
      html0,
      html1,
      html2,
      html3,
      html4,
      isDone0,
      isDone1,
      isDone2,
      isDone3,
      isDone4,
      length0,
      length1,
      length2,
      length3,
      length4,
      message0,
      message1,
      message2,
      message3,
      message4,
      setMessage0,
      setMessage1,
      setMessage2,
      setMessage3,
      setMessage4,
      validations0,
      validations1,
      validations2,
      validations3,
      validations4,
      variations0,
      variations1,
      variations2,
      variations3,
      variations4,
    ]
  );

  const variations = useMemo(
    () => [variations0, variations1, variations2, variations3, variations4],
    [variations0, variations1, variations2, variations3, variations4]
  );

  const setMessage = (message) => {
    return messages[currentIndex].setMessage(message);
  };

  const preprocessString = (str) => {
    return str.replace(/[\s.]/g, "").toLowerCase();
  };

  const findDuplicateStrings = useCallback((arrays) => {
    for (let i = 0; i < arrays.length; i++) {
      for (let j = i + 1; j < arrays.length; j++) {
        const array1 = arrays[i].map(preprocessString);
        const array2 = arrays[j].map(preprocessString);

        for (const str1 of array1) {
          if (array2.includes(str1)) {
            messages[i].setErrors((p) => [
              ...p,
              `Message ${i + 1} is same as Message ${j + 1}.`,
            ]);
            messages[j].setErrors((p) => [
              ...p,
              `Message ${i + 1} is same as Message ${j + 1}.`,
            ]);
            break;
          } else {
            messages[i].setErrors((p) => [
              ...p.filter(
                (err) => err !== `Message ${i + 1} is same as Message ${j + 1}.`
              ),
            ]);
            messages[j].setErrors((p) => [
              ...p.filter(
                (err) => err !== `Message ${i + 1} is same as Message ${j + 1}.`
              ),
            ]);
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    const variats = [];

    for (const variationsOfSingleMessage of variations) {
      variats.push(...variationsOfSingleMessage);
    }

    setAllVariations(variats.filter((variation) => variation));
  }, [variations]);
 
   

  useEffect(() => {
    findDuplicateStrings(variations);
  }, [variations, currentIndex, findDuplicateStrings]);

  return {
    currentIndex,
    setMessage,
    allVariations,
    setCurrentIndex,
    messages,
  };
};

export default useMessageTemplate;
