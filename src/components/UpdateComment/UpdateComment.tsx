import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../../firebase";

const UpdateComment = ({
  pathToDb,
  commentID,
  username,
}: {
  pathToDb: any;
  commentID: string;
  username: string;
}) => {
  const [comment, setComment] = useState("");
  const [emptyComment, setEmptyComment] = useState(false);

  async function updateComment() {
    if (comment === "") {
      setEmptyComment(true);
      return;
    }

    const userID = auth?.currentUser?.uid;

    await setDoc(doc(db, pathToDb[0], pathToDb[1], "comentarios", commentID), {
      comentario: comment,
      username: username,
      userID,
    })
      .then(() => {
        console.log("funcionou");
      })
      .catch(() => {
        console.log("nao funconoiu");
      });
  }

  return (
    <div>
      <div className="flex flex-col mb-8">
        <textarea
          className={`resize-none text-textLight rounded-xl p-2 ${
            emptyComment && "border border-[red]"
          }`}
          placeholder="Comentario"
          rows={5}
          cols={80}
          maxLength={500}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          className="border mt-4 w-64 mx-auto rounded"
          type="button"
          onClick={updateComment}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateComment;
