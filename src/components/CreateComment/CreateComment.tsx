import {
  addDoc,
  collection,
  CollectionReference,
  DocumentData,
} from "firebase/firestore";
import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { auth, db } from "../../firebase";

type PathT = Array<string>;

type DbRef = CollectionReference<DocumentData> | undefined;

const CreateComment = ({ pathToDb }: { pathToDb: PathT }) => {
  const [comment, setComment] = useState("");
  const [showAddComment, setShowAddComment] = useState(false);
  const [emptyComment, setEmptyComment] = useState(false);

  const user = useAppSelector((state) => state.auth);

  async function createComment() {
    if (comment === "") {
      setEmptyComment(true);
      return;
    }

    const dbRef: DbRef = collection(
      db,
      pathToDb[0],
      pathToDb[1],
      "comentarios"
    );

    const userID = auth?.currentUser?.uid;

    await addDoc(dbRef, {
      comentario: comment,
      username: user.username,
      userID,
    });
    setShowAddComment(false);
  }

  //Only show add comment if user is logged
  return auth.currentUser === null ? (
    <></>
  ) : (
    <div>
      <h2
        className="text-center mb-4"
        onClick={() => setShowAddComment((prev) => !prev)}
      >
        Create Comment {showAddComment ? "-" : "+"}
      </h2>

      {showAddComment && (
        <div className="flex flex-col mb-8">
          <textarea
            className={`resize-none border text-textLight ${
              emptyComment && "border-[red]"
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
            onClick={createComment}
          >
            Criar
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateComment;
