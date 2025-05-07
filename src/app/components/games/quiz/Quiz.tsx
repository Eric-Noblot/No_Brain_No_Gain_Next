'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Pour récupérer les paramètres dynamiques
import { questions } from '../../../data/questions';

import Level from "./Level"
import ProgressBar from './ProgressBar';
import QuizOver from "./QuizOver"

// Firebase
// import { db, auth } from '../Firebase/firebase';
// import { doc, updateDoc } from 'firebase/firestore';

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface QuizLevel {
  levelNames: string[];
  userAnswer: string | null;
  idQuestion: number;
  quizLevel: number;
  maxQuestions: number;
  quizEnd: boolean;
  actualQuestion: string;
  actualAnswers: string[];
  storageQuestions: Question[];
}

const Quiz: React.FC = () => {
  const params = useParams();
  const categoryNameUrl = params?.categoryName as string;

  const [activeBtn, setActiveBtn] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [arrayRightAnswers, setArrayRightAnswers] = useState<string[]>([]);
  const [hasAlreadyPlayed, setHasAlreadyPlayed] = useState<boolean>(false);
  const [levelFromCategory, setLevelFromCategory] = useState<number>(0);

  // @ts-ignore - cette donnée vient d'ailleurs, à typer correctement si possible
  const dataFromCategory: Record<string, number> = {}; // <-- à remplacer selon ta source de données
  const levelFromDataFromCategory = dataFromCategory[categoryNameUrl];

  const [level, setLevel] = useState<QuizLevel>({
    levelNames: ['apprenti', 'expert', 'maître'],
    userAnswer: null,
    idQuestion: 0,
    quizLevel: 0,
    maxQuestions: 10,
    quizEnd: false,
    actualQuestion: '',
    actualAnswers: [],
    storageQuestions: [],
  });

  const {
    levelNames,
    userAnswer,
    idQuestion,
    quizLevel,
    maxQuestions,
    quizEnd,
    actualQuestion,
    actualAnswers,
    storageQuestions,
  } = level;

  const loadQuestions = (arrayQuestions: Question[]) => {
    if (arrayQuestions.length > 0) {
      const fetchedQuestion = arrayQuestions[idQuestion].question;
      const fetchedAnswers = arrayQuestions[idQuestion].options;
      if (arrayQuestions.length >= maxQuestions) {
        setLevel({
          ...level,
          actualQuestion: fetchedQuestion,
          actualAnswers: fetchedAnswers,
          storageQuestions: arrayQuestions,
        });
      } else {
        console.warn('Pas assez de questions !');
      }
    }
  };

  const updateFirestore = async () => {
    const userId = auth.lastNotifiedUid;
    const tropheeRef = doc(db, `users/${userId}/`);
    await updateDoc(tropheeRef, {
      [categoryNameUrl]: hasAlreadyPlayed ? levelFromCategory + 1 : quizLevel + 1,
    });
  };

  const updateUserProgress = async () => {
    try {
      const res = await fetch('/api/update-progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: auth.lastNotifiedUid,
          category: categoryNameUrl,
          level: hasAlreadyPlayed ? levelFromCategory + 1 : quizLevel + 1,
        }),
      });
  
      if (!res.ok) throw new Error('Failed to update progress');
      const data = await res.json();
      console.log('Progress updated:', data);
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  useEffect(() => {
    if (levelFromDataFromCategory !== undefined) {
      levelFromDataFromCategory < quizLevel
        ? setLevelFromCategory(quizLevel)
        : setLevelFromCategory(levelFromDataFromCategory);
      setHasAlreadyPlayed(true);
    } else {
      setHasAlreadyPlayed(false);
    }

    if (questions) {
      let arrayQuestions: Question[] = [];

      const quizData =
        questions[0].quiz.category[categoryNameUrl][
          levelNames[hasAlreadyPlayed ? levelFromCategory : quizLevel]
        ];

      arrayQuestions = quizData;

      const arrayQuestionsData = arrayQuestions.map((question) => question);
      loadQuestions(arrayQuestionsData);
    }
  }, [idQuestion, quizLevel, quizEnd, levelNames, hasAlreadyPlayed]);

  const chooseAnswer = (answer: string) => {
    setActiveBtn(false);
    setLevel({ ...level, userAnswer: answer });
  };

  const nextQuestions = () => {
    const currentLevel = hasAlreadyPlayed ? levelFromCategory : quizLevel;
    const rightAnswer =
      questions[0].quiz.category[categoryNameUrl][levelNames[currentLevel]][idQuestion].answer;

    if (userAnswer === rightAnswer) {
      setScore((prev) => prev + 1);
      setArrayRightAnswers([...arrayRightAnswers, '1']);
    } else {
      setArrayRightAnswers([...arrayRightAnswers, '0']);
    }

    if (idQuestion === maxQuestions - 1) {
      setLevel({ ...level, quizEnd: true });
    } else {
      setLevel((prev) => ({ ...prev, idQuestion: prev.idQuestion + 1 }));
      setActiveBtn(true);
    }
  };

  const loadLevelQuestions = (levelFromQuizOver: number, failed: string) => {
    setLevel({
      ...level,
      quizLevel: levelFromQuizOver,
      quizEnd: false,
      idQuestion: 0,
    });
    setScore(0);
    setLevelFromCategory(levelFromQuizOver);
    setArrayRightAnswers([]);
    if (failed !== 'failed') {
      updateFirestore();
    }
  };

  return (
    <div className="backgroundQuiz">
      {/* <Navbar /> */}
      <Level levelNames={levelNames} quizLevel={hasAlreadyPlayed ? levelFromCategory : quizLevel} />
      <ProgressBar
        maxQuestions={maxQuestions}
        idQuestion={idQuestion}
        quizEnd={quizEnd}
        nameCategory={categoryNameUrl}
      />

      {quizEnd ? (
        <>
            <QuizOver
            score={score}
            maxQuestions={maxQuestions}
            quizLevel={hasAlreadyPlayed ? levelFromCategory : quizLevel}
            loadLevelQuestions={loadLevelQuestions}
            levelNames={levelNames}
            nameCategory={categoryNameUrl}
            storageQuestions={storageQuestions}
            arrayRightAnswers={arrayRightAnswers}
            updateFirestore={updateFirestore}
            />
            <div>Quiz terminé</div>
        </>
      ) : (
        <div className="questionCont">
          <div className="questionFrame">
            <div className="questionBox">
              <p className="question">{idQuestion + 1}. {actualQuestion}</p>
              <ul>
                {actualAnswers.map((answer, index) => (
                  <li
                    onClick={() => chooseAnswer(answer)}
                    key={index}
                    className={`answer ${userAnswer === answer ? 'selected' : ''}`}
                  >
                    {index + 1} - {answer}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button disabled={activeBtn} onClick={nextQuestions} className="validBtn">
            VALIDER
          </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(Quiz);