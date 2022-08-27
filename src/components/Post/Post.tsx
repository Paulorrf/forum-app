import { getDocs, collection, DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase";

import {
  Container,
  Line,
  PostContainer,
  Title,
  MainContent,
  Username,
} from "./Post.style";

type PostsT = Array<DocumentData> | [];

const Post = () => {
  const [posts, setPosts] = useState<PostsT>([]);
  const params = useParams();
  const navigate = useNavigate();

  const validRoutes = ["general-discussion", "off-topic", "lore", "questions"];

  useEffect(() => {
    //if route is invalid
    if (!validRoutes.includes(params.id!)) {
      navigate("/");
    }

    const dbRef = collection(db, params.id!);

    async function getPosts() {
      const data = await getDocs(dbRef);
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    getPosts();
    //eslint-disable-next-line
  }, []);

  return (
    <Container>
      {posts?.map((post: DocumentData) => {
        return (
          <PostContainer key={post.id}>
            <Link to={`/posts/${params.id}/${post.id}`}>
              <Title>{post?.title.toUpperCase()}</Title>
            </Link>
            <MainContent>{post?.mainContent.toUpperCase()}</MainContent>
            <Username>{post?.username.toUpperCase()}</Username>
            <Line></Line>
          </PostContainer>
        );
      })}
    </Container>
  );
};

export default Post;
