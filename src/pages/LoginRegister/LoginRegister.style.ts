import styled from "styled-components";
import tw from "twin.macro";

export const Form = styled.div`
  ${tw`
        flex
        flex-col
        justify-center
        mx-auto
        my-24
        w-72   
    `}
`;

export const Input = styled.input`
  ${tw`
        border
        border-textLight
        dark:border-transparent
        p-2
        mb-4
        text-textLight
        rounded-lg
    `}
`;

export const Btn = styled.button`
  ${tw`
        border
        rounded-lg
        border-transparent
        px-12
        py-2
        bg-primaryLight
        dark:border-none
        dark:bg-primaryDark
        text-textDark
        
    `}
`;
