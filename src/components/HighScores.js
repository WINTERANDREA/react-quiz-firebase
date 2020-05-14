import React, { useEffect, useState } from "react";
import { useFirebase } from "./Firebase/FirebaseContext";
import { Link } from "react-router-dom";

export const HighScores = () => {
  const firebase = useFirebase();
  const [scores, setScores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    firebase.scores().once("value", (snapshot) => {
      const data = snapshot.val();
      const sortedScores = formatScoreData(data);
      setScores(sortedScores);
      setIsLoading(false);
    });
  }, [firebase]);

  const formatScoreData = (firebaseScores) => {
    const scores = [];
    for (let key in firebaseScores) {
      const val = firebaseScores[key];
      val["key"] = key;
      scores.push(val);
    }

    return scores.sort((score1, score2) => score2.score - score1.score).slice(0, 10);
  };

  return (
    <>
      {isLoading && <div id="loader"></div>}
      {!isLoading && (
        <div className="container">
          <h1>HighScores</h1>
          <div id="highScoresList">
            {scores.map((score) => {
              return (
                <li key={score.key} className="high-score">
                  {score.name} - {score.score}
                </li>
              );
            })}
            <div style={{ marginTop: 50 }}>
              <Link to="/" className="btn" style={{ paddingLeft: 50, paddingRight: 50 }}>
                Go Back
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
