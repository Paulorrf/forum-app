import { getDocs, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase";

type PostsT = Array<Object>;

const Post = () => {
  const [posts, setPosts] = useState<PostsT>();
  const params = useParams();
  const navigate = useNavigate();

  const validRoutes = ["general-discussions", "off-topic", "lore", "questions"];

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
  console.log(posts);

  return <div>Post</div>;
};

export default Post;
