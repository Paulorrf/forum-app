import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
} from "firebase/firestore";
import React, { useEffect, useState, FC } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase";

import {
  Line,
  PostContainer,
  Title,
  MainContent,
  Username,
} from "./FullPost.style";

import CreateComment from "../../components/CreateComment/CreateComment";

type CommentsProp = Array<DocumentData>;

const FullPost: FC = () => {
  const params = useParams();
  const [comments, setComments] = useState<CommentsProp | undefined>();
  const [postInfo, setPostInfo] = useState<DocumentData | undefined>();
  const [pathToDb, setPathToDb] = useState<any>();

  const validRoutes = ["general-discussion", "off-topic", "lore", "questions"];

  const location = useLocation();

  const navigate = useNavigate();

  //get the valid url and the postId
  const urlParams = location.pathname.split("/").slice(2);

  useEffect(() => {
    if (!validRoutes.includes(urlParams[0])) {
      console.log(urlParams);
    }
  }, []);

  console.log(postInfo);

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
  }, []);

  useEffect(() => {
    //comentarios do post
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
  }, []);

  return (
    <div className="w-4/5 mx-auto">
      <h2 className="mb-8">Full Posts</h2>
      <PostContainer>
        <p>{params.id}</p>
        <Title>{postInfo?.title}</Title>
        <MainContent>{postInfo?.mainContent}</MainContent>
        <Username>{postInfo?.username}</Username>
      </PostContainer>
      <Line></Line>
      {comments?.map((comment: DocumentData) => {
        return (
          <div key={comment.id}>
            <p>{comment?.username}</p>
            <p>{comment?.comentario}</p>
            <div>--------</div>
          </div>
        );
      })}

      <div>
        <CreateComment pathToDb={pathToDb} />
      </div>
    </div>
  );
};

export default FullPost;
