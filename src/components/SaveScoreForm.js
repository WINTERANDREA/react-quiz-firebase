import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "./Firebase/FirebaseContext";

export const SaveScoreForm = ({ score, scoreSaved }) => {
  const [username, setUsername] = useState("");
  const firebase = useFirebase();

  const onUsernameChange = (e) => {
    const upadtedUsername = e.target.value;
    setUsername(upadtedUsername);
  };

  const saveUserData = (e) => {
    e.preventDefault();
    const record = {
      name: username,
      score,
    };
    firebase.scores().push(record, () => {
      scoreSaved();
    });
  };

  return (
    <div className="container">
      <h1>Score: {score}</h1>
      <form onSubmit={saveUserData}>
        <input
          value={username}
          onChange={onUsernameChange}
          type="text"
          name="username"
          id="username"
          placeholder="cool kid 123"
        />
        <button type="submit" className="btn">
          Save
        </button>
        <Link to="/" className="btn">
          New Game
        </Link>
      </form>
    </div>
  );
};
