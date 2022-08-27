import styled from "styled-components";
import tw from "twin.macro";

export const Container = styled.form`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ${tw`
        absolute
        flex
        flex-col
    `}
`;

export const Input = styled.input`
  ${tw`
        mb-8
        p-2
        border
    `}
`;

export const TxtArea = styled.textarea`
  ${tw`
        border
        p-2
  `}
`;

export const BtnSubmit = styled.button`
  ${tw`
        border
        mt-8
        p-2
        w-40
        mx-auto
    `}
`;
