import React, { useEffect, useState } from "react";
import Link from "next/link"
import { useMediaQuery } from "react-responsive";
import { GiTrophyCup } from "react-icons/gi";
import { questions } from "../data/questions";

// import {
//   doc,
//   getDoc,
//   updateDoc,
//   deleteField,
// } from "firebase/firestore";
// import { auth, db } from "@/firebase";


// import quizPicture from "../../img/game/quiz.avif"
// import jeuxPicture from "../../img/game/jeux.png" 
// import testPicture from "../../img/game/test.png"
// import logiquePicture from "../../img/game/logique.jpg"

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


type UserData = {
  pseudo: string;
};

type Props = {
  userData: UserData;
};

type IsSelected = {
  game: boolean;
  category: boolean;
};

const Games: React.FC<Props> = ({ userData }) => {
  // const { name } = userData;
  console.log("HOME: ", userData)
  const games = questions[0];

  const [isSelected, setIsSelected] = useState<IsSelected>({
    game: false,
    category: false,
  });

  const [gameName, setGameName] = useState<string>("");
  const [categoryName, setCategoryName] = useState<string>("");
  const [dataFromFirestore, setDataFromFirestore] = useState<any>(""); // Typage plus strict possible si tu connais la structure
  const [levelCategory, setLevelCategory] = useState<number>(0);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  const getPicture = (category: string): string | any => {
    switch (category) {
//         case "quiz" : 
//         return quizPicture
//         case "jeux" : 
//         return jeuxPicture
//         case "test" : 
//         return testPicture

//         case "anglais" : 
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

//         case "memory" : 
//         return logiquePicture
        
//         default :
//         return "Error"
    }
}

  const handleGameSelection = (e: React.MouseEvent<HTMLDivElement>): void => {
    setIsSelected({ ...isSelected, game: true, category: false });
    setGameName(e.currentTarget.textContent || "");
    setCategoryName("");
  };

  const getCategoryName = (e: React.MouseEvent<HTMLDivElement>): void => {
    setCategoryName(e.currentTarget.textContent || "");
    setIsSelected({ ...isSelected, category: true });
  };

  const restartQuiz = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    await deleteDataFromFirestore();
    setCategoryName(e.currentTarget.textContent || "");
    setIsSelected({ ...isSelected, category: false });
  };

  const getDataFromFirestore = async (): Promise<void> => {
    // const userId = auth.lastNotifiedUid;
    // const docRef = doc(db, `users/${userId}`);
    // const docSnap = await getDoc(docRef);

    // if (docSnap.exists()) {
    //   const userData = docSnap.data();
    //   setDataFromFirestore(userData);
      setLevelCategory(userData[categoryName.toLowerCase()]);
    // } else {
    //   console.log("pas de données !");
    // }
  };

  const deleteDataFromFirestore = async (): Promise<void> => {
    // const userId = auth.lastNotifiedUid;
    // const docRef = doc(db, `users/${userId}`);
    // await updateDoc(docRef, {
    //   [categoryName.toLowerCase()]: deleteField(),
    // });
  };

  const getCupColor = (levelTrophee: number): string => {
    switch (levelTrophee) {
      case 1:
        return "rgb(201, 114, 60)";
      case 2:
        return "silver";
      case 3:
        return "gold";
      default:
        return "transparent";
    }
  };

  const handleLink = () => {
    if (levelCategory < 3 || levelCategory === undefined) {
      return (
        <Link
          state={{ dataFromCategory: dataFromFirestore }}
          onClick={getCategoryName}
          className="category_link"
          href={`/game/${gameName.toLowerCase()}/${categoryName.toLowerCase()}`}
        >
          {levelCategory === undefined ? "COMMENCER" : "CONTINUER"}
        </Link>
      );
    } else {
      return (
        <>
          <p style={{ textAlign: "center", width: "80%" }}>
            Pour rejouer cette catégorie, tu dois supprimer ta progression
            actuelle...
          </p>
          <Link onClick={restartQuiz} className="category_link" href={`/home`}>
            SUPPRIMER
          </Link>
        </>
      );
    }
  };

  const categorySelection = (game: string) => {
    if (game) {
      const arrayDataFirestore = Object.getOwnPropertyNames(
        dataFromFirestore
      );
      const categoryObject = questions[0][game.toLowerCase()].category;

      return Object.keys(categoryObject)
        .sort()
        .map((category, index) => (
          <div
            onClick={getCategoryName}
            className={`box_card_category ${
              category === categoryName.toLowerCase() ? "boxActive_category" : ""
            }`}
            key={index}
          >
            <img
              className="category_picture"
              src={getPicture(category)}
              alt="category_picture"
            />
            <div className="category_title">
              {category.toUpperCase()}
              {arrayDataFirestore.includes(category) && (
                <GiTrophyCup
                  className="category_trophee"
                  color={getCupColor(dataFromFirestore[category])}
                  size={isSmallScreen ? 23 : 30}
                />
              )}
            </div>
          </div>
        ));
    }
  };

  const gameSelection = Object.keys(games).map((category, index) => (
    <div
      className={`box_card_game ${
        category === gameName.toLowerCase() ? "boxActive_game" : ""
      }`}
      onClick={handleGameSelection}
      key={index}
    >
      {category.toUpperCase()}
    </div>
  ));

  const mediaScreen = useMediaQuery({ query: "(max-width: 440px)" });

  useEffect(() => {
    setIsSmallScreen(mediaScreen);
  }, [mediaScreen]);

  useEffect(() => {
    getDataFromFirestore();
  }, [categoryName, gameName, levelCategory]);

  return (
    <main className="category">
      <p className="game_title">Choisis ton type de jeu :</p>
      <div className="category_box">{gameSelection}</div>

      {isSelected.game && (
        <>
          <div className="category_rules">
            <p>
              Le quiz comporte 3 niveaux de difficulté. Chaque niveau comporte
              10 questions. <br />
              Si tu obtiens au moins 7 bonnes réponses par série, tu peux passer
              au niveau supérieur! <br />
              Ton classement est représenté par une coupe bronze / argent / or,
              selon le niveau atteint dans chaque catégorie.
            </p>
          </div>
          <p className="game_title">À toi de jouer !</p>
          <div className="category_box">{categorySelection(gameName)}</div>
        </>
      )}

      {isSelected.category && handleLink()}
    </main>
  );
};

export default Games;