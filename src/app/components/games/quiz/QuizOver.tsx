'use client';

import { GiTrophyCup } from "react-icons/gi";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Question {
  id: number;
  question: string;
  answer: string;
}

interface QuizOverProps {
  score: number;
  maxQuestions: number;
  quizLevel: number;
  loadLevelQuestions: (level: number, status?: string) => void;
  levelNames: string[];
  nameCategory: string;
  storageQuestions: Question[];
  arrayRightAnswers: Record<number, string>;
  updateFirestore: () => void;
}

const QuizOver: React.FC<QuizOverProps> = ({
  score,
  maxQuestions,
  quizLevel,
  loadLevelQuestions,
  levelNames,
  nameCategory,
  storageQuestions,
  arrayRightAnswers,
  updateFirestore,
}) => {
  const router = useRouter();

  const clickBackHome = (e: React.MouseEvent<HTMLButtonElement>) => {
    const isClassNameFailed = (e.target as HTMLElement).className;
    if (isClassNameFailed === "backToMenu_failed") {
      router.push("/home");
    } else {
      updateFirestore();
      router.push("/home");
    }
  };

  const nameGameCap =
    nameCategory.charAt(0).toUpperCase() +
    nameCategory.slice(1).toLowerCase();

  const decision =
    score >= 0 ? (
      quizLevel >= levelNames.length - 1 ? (
        <div className="quizOver_box">
          <div className="quizOver_title_final">
            <h2>Félicitations !!!</h2>
            <p>
              {`Tu remportes le dernier niveau du quiz ${nameGameCap} ! Tu deviens Maître dans cette catégorie !`}
            </p>
            {/* <GiTrophyCup color="gold" className="trophee" /> */}
          </div>
          <button onClick={clickBackHome}>Retour au menu</button>
        </div>
      ) : (
        <div className="quizOver_title_win">
          <p>Bravo ! Tu as réussi ce quiz !</p>
          <p>Tu peux passer au niveau suivant !</p>
          <div className="quizOver_boxButtons_win">
            <button onClick={() => loadLevelQuestions(quizLevel + 1)}>
              Niveau Suivant
            </button>
            <button onClick={clickBackHome}>Retour au menu</button>
          </div>
        </div>
      )
    ) : (
      <div className="quizOver_title_failed">
        <p>
          Malheureusement, tu n'as pas atteint un minimum de 7 bonnes réponses...
        </p>
        <div className="quizOver_boxButtons_win">
          <button onClick={() => loadLevelQuestions(quizLevel, "failed")}>
            Recommencer
          </button>
          <button className="backToMenu_failed" onClick={clickBackHome}>
            Retour au menu
          </button>
        </div>
      </div>
    );

  const tableQuestions =
    score >= 0 ? (
      storageQuestions.map((question) => (
        <tr key={question.id}>
          <td>
            {question.id + 1}. {question.question}
          </td>
          <td
            style={{
              backgroundColor:
                arrayRightAnswers[question.id] === "1"
                  ? "rgba(44, 231, 47, 0.403)"
                  : "rgba(241, 43, 43, 0.403)",
            }}
          >
            {question.answer}
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={2} style={{ textAlign: "center" }}>
          Le quiz doit être validé pour avoir accès aux réponses !
        </td>
      </tr>
    );

  return (
    <div className="quizOver">
      {decision}
      <div className="quizOver_progress">
        <div className="quizOver_progress_box">{`Réponses : ${score} / ${maxQuestions}`}</div>
        <div className="quizOver_progress_box">{`Score : ${score * 10} pts`}</div>
      </div>
      <div className="quizOver_answers">
        <table className="table_answers">
          <thead>
            <tr>
              <th>QUESTIONS</th>
              <th>RÉPONSE</th>
            </tr>
          </thead>
          <tbody>{tableQuestions}</tbody>
        </table>
      </div>
    </div>
  );
};

export default QuizOver;