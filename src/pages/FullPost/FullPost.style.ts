import styled from "styled-components";
import tw from "twin.macro";

interface UsernameProps {
  isComment?: boolean;
}

export const PostContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  ${tw`
      flex
      flex-col
      rounded-xl
      mb-12
      border
      border-bgDark
    `}
`;

export const ContentContainer = styled.div`
  ${tw`
      p-4
      rounded-tr-lg
      rounded-tl-lg
  `}
`;

export const Title = styled.h2`
  ${tw`
      text-4xl
      mb-4
    `}
`;
export const MainContent = styled.p`
  ${tw`
      text-lg
      mb-2
    `}
`;

export const UsernameContainer = styled.div`
  ${tw`
      w-full
      min-h-full
  `}
`;

export const Username = styled.p<UsernameProps>`
  background-color: rgba(1, 1, 1, 0.3);

  ${({ isComment }) =>
    isComment
      ? tw`rounded-tr-lg rounded-tl-lg`
      : tw`rounded-br-lg
        rounded-bl-lg`}

  ${tw`
      text-sm
      w-full
      p-4
       
        
    `}
`;

export const CommentsContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.1);

  ${tw`
      rounded-xl
      mb-4
      border
      border-bgDark
  `}
`;

export const UpDelContainer = styled.div`
  background-color: rgba(1, 1, 1, 0.3);
  ${tw`
      px-4
      py-2
      rounded-br-lg
      rounded-bl-lg
  `}
`;

export const UpdateCommentContainer = styled.div`
  ${tw`
      mt-8
  `}
`;
