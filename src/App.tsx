import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "./app/hooks";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import LoginRegister from "./pages/LoginRegister/LoginRegister";
import Posts from "./pages/Posts/Posts";
import Post from "./components/Post/Post";
import CreatePost from "./pages/CreatePost/CreatePost";
import FullPost from "./pages/FullPost/FullPost";

import RequireAuth from "./utils/RequireAuth";

function App() {
  const { dark } = useAppSelector((state) => state.lightDark);

  return (
    <div className={dark ? "dark" : undefined}>
      <div className="bg-bgLight dark:bg-bgDark w-screen h-screen text-textLight dark:text-textDark overflow-x-hidden">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="create"
            element={
              <RequireAuth>
                <CreatePost />
              </RequireAuth>
            }
          />
          <Route path="posts" element={<Posts />}>
            <Route path=":id" element={<Post />} />
          </Route>
          <Route path="posts/:id/:id" element={<FullPost />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/register" element={<LoginRegister />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
