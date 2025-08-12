import React, { useEffect, useMemo, useRef, useState } from "react";
import debounce from "lodash/debounce";
const ChatInput = React.memo(
    ({  selectedUserId, sendMessageLoading, getSendButtonTitle, textAreaRef, inputValueRef , onUpdateMessage , sendMessageText , handleKeyDown}) => {
      const [text, setText] = useState("");
 
      useEffect(() => {
        setText("");
        if (textAreaRef?.current) {
          textAreaRef.current.focus();
        }
      }, [selectedUserId]);
  
      useEffect(() => {
        inputValueRef.current = text;
      }, [text]);
      const autoResize = () => {
        const textareaRef = textAreaRef.current;
        textareaRef.style.height = "auto"; // Reset height
        textareaRef.style.height = textareaRef.scrollHeight + "px"; // Adjust height
      };
      useEffect(() => {
        // if (text) {
          autoResize();
        // }
      }, [text]);
  
      // const handleKeyDown = (e) => {
      //   if (e.key === "Enter" && !e.shiftKey) {
      //     e.preventDefault();
         
      //   }
      // };

    const handChange = (value) => {
       
        onUpdateMessage(value);
        // Make your API call here
      };

    const debouncedSearch = useMemo(
        () => debounce(handChange, 400),
        []
      );
    
      // Clean up debounce on unmount
      useEffect(() => {
        return () => {
          debouncedSearch.cancel();
        };
      }, [debouncedSearch]);
       
         
        useEffect(()=>{
            // if(text){
                debouncedSearch(text);
            // }
        },[text])
      
  useEffect(() => {
    if (sendMessageText != text) {
      setText(sendMessageText);
    }
  }, [sendMessageText]);

  useEffect(() => {
    if (text && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [text]);

  // Prevent blur when text is not empty
  const handlePreventBlur = (e) => {
    if (text) {
      e.preventDefault();
      textAreaRef.current?.focus(); // force refocus
    }
  };
  
      return (
        // <textarea
        //   value={text}
        //   onChange={(e) => setText(e.target.value)}
        //   onKeyDown={(e)=>{
        //     if (e.key === "Enter" && !e.shiftKey) {
             

        //       e.preventDefault();
        //       if(!sendMessageLoading){
        //         handleKeyDown(text)
        //         console.log("Enter key pressed!!!!" , text);

        //       }
            
                
         
           
             
        //     }
        //   }}
        //   readOnly={!getSendButtonTitle().send || sendMessageLoading}
          
        //   placeholder="Write Message"
        //   ref={textAreaRef}
        //   maxLength={800}
        //   rows={1}
        //   style={{
        //     width: "100%",
        //     outline: "none",
        //     border: "0px",
        //     fontSize: "16px",
        //     fontWeight: 400,
        //     color: "#012635",
        //     resize: "none",
        //   }}
        // />
        <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (!sendMessageLoading) {
              handleKeyDown(text);
              console.log("Enter key pressed!!!!", text);
            }
          }
        }}
        // onBlur={handlePreventBlur}
        readOnly={!getSendButtonTitle().send || sendMessageLoading}
        placeholder="Write Message"
        ref={textAreaRef}
        maxLength={800}
        rows={3}
        style={{
          width: "100%",
          outline: "none",
          border: "0px",
          fontSize: "14px",
          fontWeight: 400,
          color: "#012635",
          resize: "none",
          maxHeight:"100px"
        }}
      />
      );
    }
  );
  
  export default ChatInput;