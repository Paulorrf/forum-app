import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { db } from "../../firebase";

type PostsT = Array<Object>;

const Home = () => {
  const [posts, setPosts] = useState<PostsT>();
  const dbRef = collection(db, "general-discussion");

  useEffect(() => {
    async function getPosts() {
      const data = await getDocs(dbRef);
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    getPosts();

    //eslint-disable-next-line
  }, []);

  console.log(posts);

  return <div></div>;
};

export default Home;
