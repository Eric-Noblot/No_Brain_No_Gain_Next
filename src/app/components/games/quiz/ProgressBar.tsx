'use client';

import React from 'react';

// Décommente et adapte les imports à ton projet (Next.js gère bien les images si tu utilises le `next/image` ou un import statique)
// import anglaisPicture from "../../img/category/anglais.jpg"
// import animauxPicture from "../../img/category/animaux.jpg"
// import bookPicture from "../../img/category/book.avif"
// import cartoonPicture from "../../img/category/cartoon.jpg"
// import cinemaPicture from "../../img/category/cinema.jpg"
// import dbzPicture from "../../img/category/dbz.jpg"
// import espacePicture from "../../img/category/espace.webp"
// import francaisPicture from "../../img/category/francais.jpg"
// import jeuxvideoPicture from "../../img/category/jeuxvideo.avif"
// import marvelPicture from "../../img/category/marvel.webp"
// import mathsPicture from "../../img/category/maths.jpg"
// import musiquePicture from "../../img/category/musique.webp"
// import naturePicture from "../../img/category/nature.jpg"
// import planetePicture from "../../img/category/planete.jpg"
// import sciencePicture from "../../img/category/science.jpg"
// import simpsonsPicture from "../../img/category/simpsons.avif"
// import sportPicture from "../../img/category/sport.jpg"
// import voyagesPicture from "../../img/category/voyages.jpg"
// import artsPicture from "../../img/category/arts.jpg"
// import capitalesPicture from "../../img/category/capitales.webp"
// import insectesPicture from "../../img/category/insectes.jpg"
// import disneyPicture from "../../img/category/disney.jpg"
// import geographyPicture from "../../img/category/geography.jpg"
// import mortPicture from "../../img/category/mort.webp"
// import rockstarPicture from "../../img/category/rockstar.webp"
// import humanityPicture from "../../img/category/humanité.webp"

interface ProgressBarProps {
  maxQuestions: number;
  idQuestion: number;
  quizEnd: boolean;
  nameCategory: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
    maxQuestions,
    idQuestion,
    quizEnd,
    nameCategory,
  }) => {
    const getProgressionPercentage = (
      max: number,
      current: number
    ): number => {
      return quizEnd ? 100 : (current / max) * 100;
    };

  const percentage = getProgressionPercentage(maxQuestions, idQuestion);

  const getPicture = (category: string): string => {
    switch (category) {
    //        case "anglais" : 
    //         return anglaisPicture
    //         case "animaux" : 
    //         return animauxPicture
    //         case "book" : 
    //         return bookPicture
    //         case "cartoon" : 
    //         return cartoonPicture
    //         case "cinema" : 
    //         return cinemaPicture
    //         case "dbz" : 
    //         return dbzPicture
    //         case "espace" : 
    //         return espacePicture
    //         case "français" : 
    //         return francaisPicture
    //         case "jeux-vidéo" : 
    //         return jeuxvideoPicture
    //         case "marvel" : 
    //         return marvelPicture
    //         case "maths" : 
    //         return mathsPicture
    //         case "musique" : 
    //         return musiquePicture
    //         case "nature" : 
    //         return naturePicture
    //         case "planète" : 
    //         return planetePicture
    //         case "science" : 
    //         return sciencePicture
    //         case "simpsons" : 
    //         return simpsonsPicture
    //         case "sport" : 
    //         return sportPicture
    //         case "voyages" : 
    //         return voyagesPicture
    //         case "arts" : 
    //         return artsPicture
    //         case "capitales" : 
    //         return capitalesPicture
    //         case "insectes" : 
    //         return insectesPicture
    //         case "disney" : 
    //         return disneyPicture
    //         case "geography" : 
    //         return geographyPicture
    //         case "mort" : 
    //         return mortPicture
    //         case "rockstar" : 
    //         return rockstarPicture
    //         case "humanité" : 
    //         return humanityPicture
        default :
        return "Error"
    }
  };

  return (
    <div className="progressBar">
      <div className="progress_cont">
        <div className="progress_box progress_quiz">
          {`- ${nameCategory.toUpperCase()} -`}
        </div>
        <div className="progress_box progress_question">
          {`Question: ${idQuestion + 1} / ${maxQuestions}`}
        </div>
      </div>

      <div className="progressBar_cont">
        <div className="progressBar_box">
          <div
            className="progressBarLine"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      <img
        className="progressBar_img"
        src={getPicture(nameCategory)}
        alt="background_img"
      />
      <div className="dark_Background"></div>
    </div>
  );
};

export default React.memo(ProgressBar);