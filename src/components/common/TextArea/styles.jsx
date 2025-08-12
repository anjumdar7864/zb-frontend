import styled from "@emotion/styled";


export const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  resize: vertical;

  &:focus {
    border-color: #007bff;
  }
`;