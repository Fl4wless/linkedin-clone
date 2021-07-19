import React, { useState, useEffect } from "react";
import CreateIcon from "@material-ui/icons/Create";
import "./Feed.css";
import InputOption from "./InputOption";
import ImageIcon from "@material-ui/icons/Image";
import YouTubeIcon from "@material-ui/icons/YouTube";
import EventIcon from "@material-ui/icons/Event";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Post from "./Post";
import { db } from "./firebase";
import firebase from "firebase";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import FlipMove from "react-flip-move";

const Feed = () => {
  const user = useSelector(selectUser);
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  const submitPostHandler = (e) => {
    e.preventDefault();

    db.collection("posts").add({
      name: user.displayName,
      description: user.email,
      message: input,
      photoUrl: user.photoUrl || "",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <CreateIcon />
          <form>
            <input
              type="text"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
            <button type="submit" onClick={submitPostHandler}>
              Send
            </button>
          </form>
        </div>
        <div className="feed__inputOptions">
          <InputOption title="Photo" Icon={ImageIcon} color="#70b5f9" />
          <InputOption title="Video" Icon={YouTubeIcon} color="#e7a33e" />
          <InputOption title="Event" Icon={EventIcon} color="#c0cbcd" />
          <InputOption
            title="Write article"
            Icon={AssignmentIcon}
            color="#7fc15e"
          />
        </div>
      </div>

      {/* Posts */}
      <FlipMove>
        {posts.map(({ id, data: { name, description, message, photoUrl } }) => (
          <Post
            key={id}
            name={name}
            description={description}
            message={message}
            photoURL={photoUrl}
          />
        ))}
      </FlipMove>
    </div>
  );
};

export default Feed;
