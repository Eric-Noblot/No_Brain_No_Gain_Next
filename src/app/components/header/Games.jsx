"use-client"

import {questions} from "../../data/questions.js"
import Link from "next/link"

import { useState, useEffect} from "react"
import { GiTrophyCup } from "react-icons/gi";
import { getDoc, doc, deleteField, updateDoc } from "firebase/firestore"
import { db, auth } from "../Firebase/firebase.js"
import { useMediaQuery } from "react-responsive"

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

const Category = ({userData}) => {
    const {pseudo} = userData
    const games = questions[0]

    const [isSelected, setIsSelected] = useState({
        game: false,
        category: false
    })

    const [gameName, setgameName] = useState("")
    const [categoryName, setCategoryName] = useState("")
    const [dataFromFirestore, setDataFromFirestore] = useState("")
    const [levelCategory, setLevelCategory] = useState(0)
    const [isSmallScreen, setIsSmallScreen] = useState(false)

    const getPicture = (category) => {

        switch (category) {
            case "quiz" : 
            return quizPicture
            case "jeux" : 
            return jeuxPicture
            case "test" : 
            return testPicture

            case "anglais" : 
            return anglaisPicture
            case "animaux" : 
            return animauxPicture
            case "book" : 
            return bookPicture
            case "cartoon" : 
            return cartoonPicture
            case "cinema" : 
            return cinemaPicture
            case "dbz" : 
            return dbzPicture
            case "espace" : 
            return espacePicture
            case "français" : 
            return francaisPicture
            case "jeux-vidéo" : 
            return jeuxvideoPicture
            case "marvel" : 
            return marvelPicture
            case "maths" : 
            return mathsPicture
            case "musique" : 
            return musiquePicture
            case "nature" : 
            return naturePicture
            case "planète" : 
            return planetePicture
            case "science" : 
            return sciencePicture
            case "simpsons" : 
            return simpsonsPicture
            case "sport" : 
            return sportPicture
            case "voyages" : 
            return voyagesPicture
            case "arts" : 
            return artsPicture
            case "capitales" : 
            return capitalesPicture
            case "insectes" : 
            return insectesPicture
            case "disney" : 
            return disneyPicture
            case "geography" : 
            return geographyPicture
            case "mort" : 
            return mortPicture
            case "rockstar" : 
            return rockstarPicture
            case "humanité" : 
            return humanityPicture

            case "memory" : 
            return logiquePicture
            
            default :
            return "Error"
        }
    }

    const handleGameSelection = (e) => {
        setIsSelected({...isSelected, game: true, category: false}) //ici je remets category à false pour éviter que l'utilisateur choisisse une game puis une catégorie et avant de valider reclique sur un autre game puis valide, ca crée une page qui ne contient pas la category du game choisi
        setgameName(e.target.textContent)
        setCategoryName("")
    }
    const gameSelection = Object.keys(games).map((category, index) => {
    return  <div className = {`box_card_game ${category === gameName.toLowerCase() ? "boxActive_game" : null}`} onClick={handleGameSelection} key={index}>   
                {/* <img className = "game_picture" src={getPicture(category)} alt ="game_picture" /> */}
                {category.toUpperCase()}
            </div>
    })

    const categorySelection = (game) => {
        if (game) {
            const arrayDataFirestore = Object.getOwnPropertyNames(dataFromFirestore) //ici je récupère le lvl sur firestore et je récupère toutes les données (dont les catégories qui m'interessent) dans un tableau afin de pouvoir faire la methode includes et checker si la catégorie (et donc un lvl deja passé) existe dans la db pour gérer si on affiche ou non la cup
            const categoryObject = questions[0][game.toLowerCase()].category

            const categoryDisplay = Object.keys(categoryObject).sort().map((category, index) => {
                return  (
                        <div onClick ={getCategoryName} className = {`box_card_category ${category === categoryName.toLowerCase() ? "boxActive_category" : null}`} key={index}>
                            <img className = "category_picture" src={getPicture(category)} alt ="category_picture" />
                            <div className = "category_title">
                                {category.toUpperCase()}
                                {
                                    arrayDataFirestore.includes(category) ? //on affiche la coupe seulement si un lvl existe déja dans la db
                                        <GiTrophyCup className ="category_trophee" color = {getCupColor(dataFromFirestore[category])}  size = { isSmallScreen ? 23 : 30 }/>
                                    : null
                                } 
                            </div>
                        </div>
                )
            })
            return categoryDisplay
        }
    }

    const getCategoryName = (e) => {

        setCategoryName(e.target.textContent) 
        setIsSelected({...isSelected, category: true})
    }

    const restartQuiz = async (e) => {
        await deleteDataFromFirestore()
        setCategoryName(e.target.textContent) 
        setIsSelected({...isSelected, category: false})
    }

    const capitalizePseudo = (name) => {
        if (name) {
            const userNameCapital = name[0].toUpperCase() + name.slice(1).toLowerCase()
            return userNameCapital
        }
    }

    const getDataFromFirestore = async () => {
        const userId = auth.lastNotifiedUid

        const docRef = doc(db, `users/${userId}`);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            const userData = docSnap.data()
            setDataFromFirestore(userData)
            setLevelCategory(userData[categoryName.toLowerCase()])
        } else {
            console.log("pas de données !");
        }
    }

    const deleteDataFromFirestore = async () => {
        const userId = auth.lastNotifiedUid
        const docRef = doc(db, `users/${userId}`)
        await updateDoc(docRef, {
            [categoryName.toLowerCase()] : deleteField()
        })
        // await deleteDoc(doc(db, `users/${userId}/${categoryName.toLowerCase()}`));
    }

    const handleLink = () => {

        let rightLink = ""
        if (levelCategory < 3 || levelCategory === undefined) { //undefined est déclenché lorsque le level est inexistant dans la base db, ca veut donc dire que l'utilisateur clique pour la 1ere fois sur une catégorie
            rightLink = (
                <Link state = {{dataFromCategory: dataFromFirestore}} onClick ={getCategoryName} className = "category_link" to={`/game/${gameName.toLocaleLowerCase()}/${categoryName.toLowerCase()}`}>
                {levelCategory === undefined ? "COMMENCER" : "CONTINUER"}
                </Link>)
        } else {
            rightLink = (
                // <Link state = {{dataFromCategory: dataFromFirestore}} onClick ={restartQuiz} className = "category_link" to={`/game/${gameName.toLocaleLowerCase()}/${categoryName.toLowerCase()}`}>
                <>
                <p style={{textAlign: "center", width: "80%"}}>Pour rejouer cette catégorie, tu dois supprimer ta progression actuelle...</p>
                <Link onClick ={restartQuiz} className = "category_link" to={`/home`}>
                SUPPRIMER
                </Link>
                
                </>)
        }
        return rightLink
    }

    const getCupColor = (levelTrophee) => {

        switch(levelTrophee) {
            case 1:return "rgb(201, 114, 60)"
            case 2: return "silver"
            case 3: return "gold"
            default : return "transparent"
        }
    }

    useEffect(() => {
        getDataFromFirestore()
    },[categoryName, gameName,levelCategory])

    const mediaScreen = useMediaQuery({query : "(max-width: 440px)"})

    useEffect(() => {
        if (mediaScreen) {
            setIsSmallScreen(true)
        } else {
            setIsSmallScreen(false)
        }
    },[mediaScreen])

    return (
        <main className="category">
            <p className= "welcome_title">Bienvenue au salon, {capitalizePseudo(pseudo)} ! <br /><br /></p>
            <p className= "game_title">Choisis ton type de jeu :</p>
            <div className = "category_box">
                {gameSelection}

            </div>
            {
                isSelected.game ? (
                <>
                    <div className ="category_rules">
                        <p>
                        Le quiz comporte 3 niveaux de difficulté. Chaque niveau comporte 10 questions. <br />
                        Si tu obtiens au moins 7 bonnes réponses par série, tu peux passer au niveau supérieur! <br/>
                        Ton classement est représenté par une coupe bronze / argent / or, selon le niveau atteint dans chaque catégorie.<br/>
                        </p>
                    </div>
                    <p className= "game_title">À toi de jouer !</p>
                    <div className = "category_box">
                        {categorySelection(gameName)}
                    </div> 
                </>
            )
                : null
            }
            {
                isSelected.category ? (
                    handleLink()
                )
                : null
            }
        </main>
    );
};

export default Category;