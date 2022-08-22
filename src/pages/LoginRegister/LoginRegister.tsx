import React, { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { getDoc, doc, setDoc } from "firebase/firestore";

import { Form, Input, Btn } from "./LoginRegister.style";

import { auth, db } from "../../firebase";
import { useAppDispatch } from "../../app/hooks";
import { setUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

type CredentialsType = string | undefined;

const LoginRegister = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  //used only on register
  const [username, setUsername] = useState("");

  const [urlEndpoint, setUrlEndpoint] = useState("");

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  //change to login or register depending on the url
  useEffect(() => {
    setUrlEndpoint(window.location.pathname.slice(1));

    //eslint-disable-next-line
  }, [window.location.pathname]);

  async function handleLogin() {
    await signInWithEmailAndPassword(auth, email, pass)
      .then((userCredentials) => {
        saveLocal(userCredentials.user.uid);
      })
      .catch((err) => {
        alert("user not found");
      });

    async function saveLocal(uid: string) {
      //token
      const credential: CredentialsType = await auth.currentUser?.getIdToken();

      const docRef = doc(db, "users", uid);
      const dbUserName = await getDoc(docRef);

      //if get token fails
      if (credential === undefined) return;

      if (dbUserName.exists()) {
        //username
        const data = dbUserName.data();

        const localUser = {
          username: data.username,
          email: auth.currentUser?.email,
          token: credential,
        };

        localStorage.setItem("auth", JSON.stringify(localUser));

        dispatch(setUser([data.username, email, credential]));

        navigate("/");
      } else {
        console.log("usuario nao existe");
      }
    }
  }

  async function handleRegister() {
    const user = await createUserWithEmailAndPassword(auth, email, pass);

    //token
    const credential = await auth.currentUser?.getIdToken();

    const newUser = {
      username,
      email,
    };

    const localUser = {
      username,
      email: auth.currentUser?.email,
      token: credential,
    };

    //create user on db with same id
    await setDoc(doc(db, "users", user.user.uid), newUser);

    localStorage.setItem("auth", JSON.stringify(localUser));

    dispatch(setUser([username, email, credential || null]));

    navigate("/");
  }

  return (
    <div>
      <Form>
        {urlEndpoint === "register" && (
          <Input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        )}

        <Input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPass(e.target.value)}
        />
        <Btn
          type="submit"
          onClick={urlEndpoint === "login" ? handleLogin : handleRegister}
        >
          {urlEndpoint === "login" ? "login" : "register"}
        </Btn>
      </Form>
    </div>
  );
};

export default LoginRegister;
