import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState, FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase";

import {
  PostContainer,
  ContentContainer,
  Title,
  MainContent,
  UsernameContainer,
  Username,
  CommentsContainer,
  UpDelContainer,
  UpdateCommentContainer,
} from "./FullPost.style";

import CreateComment from "../../components/CreateComment/CreateComment";
import UpdateComment from "../../components/UpdateComment/UpdateComment";

type CommentsProp = Array<DocumentData>;

interface UpCommentI {
  show: boolean;
  id: string;
}

const FullPost: FC = () => {
  const [comments, setComments] = useState<CommentsProp | undefined>();
  const [postInfo, setPostInfo] = useState<DocumentData | undefined>();
  const [pathToDb, setPathToDb] = useState<any>();
  const [updateComment, setUpdateComment] = useState<UpCommentI>({
    show: false,
    id: "",
  });

  const validRoutes = ["general-discussion", "off-topic", "lore", "questions"];

  const location = useLocation();

  const navigate = useNavigate();

  //get the valid url and the postId
  const urlParams = location.pathname.split("/").slice(2);

  useEffect(() => {
    if (!validRoutes.includes(urlParams[0])) {
      console.log(urlParams);
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const docRef = doc(db, urlParams[0], urlParams[1]);

    async function getOneDoc() {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPostInfo(docSnap.data());
      } else {
        navigate("/");
      }
    }
    getOneDoc();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    //post comments
    const dbRef = collection(db, urlParams[0], urlParams[1], "comentarios");

    //path needed to create a commentary
    setPathToDb([urlParams[0], urlParams[1]]);

    async function getPosts() {
      await getDocs(dbRef)
        .then((data) => {
          setComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getPosts();
    //eslint-disable-next-line
  }, []);

  async function deleteComment(commentID: any) {
    await deleteDoc(
      doc(db, urlParams[0], urlParams[1], "comentarios", commentID)
    )
      .then(() => {
        console.log("deletou");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="w-4/5 mx-auto">
      <h2 className="mb-8">Full Posts</h2>
      <PostContainer>
        <ContentContainer>
          <Title>{postInfo?.title}</Title>
          <MainContent>{postInfo?.mainContent}</MainContent>
        </ContentContainer>
        <UsernameContainer>
          <Username>Username: {postInfo?.username.toUpperCase()}</Username>
        </UsernameContainer>
      </PostContainer>

      {comments?.map((comment: DocumentData) => {
        return (
          <CommentsContainer key={comment.id}>
            <UsernameContainer>
              <Username isComment={true}>
                Username: {comment?.username.toUpperCase()}
              </Username>
            </UsernameContainer>
            <ContentContainer>
              <p>{comment?.comentario}</p>
            </ContentContainer>

            {auth?.currentUser?.uid === comment?.userID &&
              auth.currentUser !== null && (
                <UpDelContainer>
                  <button
                    className="mr-8"
                    onClick={() => deleteComment(comment.id)}
                  >
                    Delete
                  </button>

                  <button
                    onClick={() =>
                      setUpdateComment({
                        show: true,
                        id: comment.id,
                      })
                    }
                  >
                    Update
                  </button>

                  {updateComment.show &&
                    updateComment.id === comment.id &&
                    auth?.currentUser?.uid === comment?.userID && (
                      <UpdateCommentContainer>
                        <UpdateComment
                          pathToDb={pathToDb}
                          commentID={comment.id}
                          username={comment?.username}
                        />
                      </UpdateCommentContainer>
                    )}
                </UpDelContainer>
              )}
          </CommentsContainer>
        );
      })}

      <div>
        <CreateComment pathToDb={pathToDb} />
      </div>
    </div>
  );
};

export default FullPost;
