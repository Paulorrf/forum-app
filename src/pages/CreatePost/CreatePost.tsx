import { collection, setDoc, doc } from "firebase/firestore";
import { MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { db } from "../../firebase";

import { Container, Input, TxtArea, BtnSubmit } from "./CreatePost.style";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [radioOp, setRadioOp] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  const navigate = useNavigate();

  async function createNewPost(e: MouseEvent) {
    e.preventDefault();

    if (title === "" || comment === "" || radioOp === "") {
      setErrorMsg("Por favor, preencha todos os campos.");
      setShowMsg(true);
    }

    const local: any = localStorage.getItem("auth");

    // Add a new document with a generated id
    const newPostRef = doc(collection(db, radioOp));

    await setDoc(newPostRef, {
      title,
      mainContent: comment,
      username: JSON.parse(local).username,
    });

    navigate("/");
  }

  return (
    <Container>
      {showMsg && <h2 className="mx-auto mb-8 text-[red]">{errorMsg}</h2>}
      <div className="child:mr-8 mb-4 flex justify-center">
        <div className="flex child:px-4 mx-auto child:cursor-pointer">
          <div>
            <input
              type="radio"
              id="general-discussion"
              name="post_section"
              value="general-discussion"
              className="mr-2"
              required={true}
              onChange={(e) => setRadioOp(e.target.value)}
            />
            <label htmlFor="general-discussion">General Discussion</label>
          </div>

          <div>
            <input
              type="radio"
              id="lore"
              name="post_section"
              value="lore"
              className="mr-2"
              required={true}
              onChange={(e) => setRadioOp(e.target.value)}
            />
            <label htmlFor="lore">Lore</label>
          </div>

          <div>
            <input
              type="radio"
              id="off_topic"
              name="post_section"
              value="off-topic"
              className="mr-2"
              required={true}
              onChange={(e) => setRadioOp(e.target.value)}
            />
            <label htmlFor="off_topic">Off Topic</label>
          </div>

          <div>
            <input
              type="radio"
              id="questions"
              name="post_section"
              value="questions"
              className="mr-2"
              required={true}
              onChange={(e) => setRadioOp(e.target.value)}
            />
            <label htmlFor="questions">Questions</label>
          </div>
        </div>
      </div>
      <Input
        type="text"
        placeholder="title"
        required
        onChange={(e) => setTitle(e.target.value)}
      />
      <TxtArea
        className="resize-none"
        placeholder="Comentario"
        rows={8}
        cols={60}
        maxLength={100}
        required={true}
        onChange={(e) => setComment(e.target.value)}
      />
      <BtnSubmit type="submit" onClick={(e) => createNewPost(e)}>
        Submit
      </BtnSubmit>
    </Container>
  );
};

export default CreatePost;
