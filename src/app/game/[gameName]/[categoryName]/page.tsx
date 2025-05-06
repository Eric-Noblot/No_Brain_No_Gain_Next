"use client"

import { useParams } from 'next/navigation';
import Quiz from '@/app/components/games/quiz/Quiz';

type Props = {
  params: {
    gameName: string;
    categoryName: string;
  };
};

const GamePage = () => {
  const params = useParams();
  const { gameName, categoryName } = params;

  return (
    <main>
      <h1>Jeu : {gameName}</h1>
      <h2>Catégorie : {categoryName}</h2>
      <Quiz />
    </main>
  );
};

export default GamePage;