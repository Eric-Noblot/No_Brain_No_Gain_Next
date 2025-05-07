'use client';

import Stepper from 'react-stepper-horizontal'
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

interface LevelProps {
  levelNames: string[];
  quizLevel: number;
}

interface Step {
  title: string;
}

const Level: React.FC<LevelProps> = ({ levelNames, quizLevel }) => {
  const [levels, setLevels] = useState<Step[]>([]);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const [activeLevel, setActiveLevel] = useState<number>(0);

  const mediaScreen = useMediaQuery({ query: '(max-width: 820px)' });

  useEffect(() => {
    const levelsName: Step[] = levelNames.map((levelName) => {
      const firstLetter = levelName[0].toUpperCase() + levelName.slice(1).toLowerCase();
      return { title: firstLetter };
    });
    setLevels(levelsName);
  }, [levelNames]);

  useEffect(() => {
    setIsSmallScreen(mediaScreen);
  }, [mediaScreen]);

  useEffect(() => {
    setActiveLevel(quizLevel);
  }, [quizLevel]);

  return (
    <div className="level">
        <p>STEPPER</p>
      <Stepper
        steps={levels}
        activeStep={activeLevel + 1}
        size={60}
        circleFontSize={25}
        circleTop={10}
        activeColor="rgba(255, 255, 255, 0.400)"
        activeTitleColor="rgba(255, 255, 255, 0.400)"
        defaultColor="rgba(255, 255, 255, 0.400)"
        defaultTitleColor="rgba(255, 255, 255, 0.400)"
        completeColor="rgba(243, 211, 52, 0.650)"
        completeTitleColor="rgba(243, 211, 52, 0.650)"
        titleFontSize={isSmallScreen ? 15 : 25}
        lineMarginOffset={25}
        defaultBarColor="#C0BABA"
        completeBarColor="#C0BABA"
      />
    </div>
  );
};

export default Level;