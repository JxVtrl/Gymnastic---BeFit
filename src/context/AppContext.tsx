import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { iUserQuiz } from "../interfaces/userQuiz.interface";
import { db } from "../services";
import { useAuth } from "./AuthContext";

const AppContext = createContext({});

export function AppProvider({ children }: any) {
  const [userPersonalInfoModal, setUserPersonalInfoModal] =
    useState<boolean>(false);
  const [diets, setDiets] = useState<any>([]);
  const [trainings, setTrainings] = useState<any>([]);

  const { newUserFlag, setNewUserFlag, user }: any = useAuth();

  useEffect(() => {
    if (newUserFlag) setUserPersonalInfoModal(true);
  }, [newUserFlag]);

  const [userAnswers, setUserAnswers] = useState<iUserQuiz>({
    height: undefined,
    weight: undefined,
    workoutTime: undefined,
    biotype: undefined,
    makeAerobyc: undefined,
    smoke: undefined,
    drinks: undefined,
    alergy: undefined,
  });

  const usersCollection = collection(db, "users");
  const dietCollection = collection(db, "diet");
  const trainingCollection = collection(db, "training");

  const getUserAnswers = async () => {
    const userRef = doc(db, "users", user?.uid);

    const userDoc = await getDoc(userRef).then((doc) => {
      if (doc.exists()) {
        return doc.data();
      } else {
        return null;
      }
    });

    if (userDoc) {
      setUserAnswers({
        height: userDoc.height,
        weight: userDoc.weight,
        workoutTime: userDoc.workoutTime,
        biotype: userDoc.biotype,
        makeAerobyc: userDoc.makeAerobyc,
        smoke: userDoc.smoke,
        drinks: userDoc.drinks,
        alergy: userDoc.alergy,
      });
    } else {
      setUserPersonalInfoModal(true);
      setNewUserFlag(true);
    }
  };

  useEffect(() => {
    if(user?.uid)
      getUserAnswers();
  }, [user]);

  const handleAnswer = (e: any, inputType: string) => {
    if (inputType)
      setUserAnswers({ ...userAnswers, [inputType]: e.target.value });
  };

  const saveUserPersonalInfo = async () => {
    // Criando referencia para o arquivo
    const userRef = doc(usersCollection, user?.uid);

    // fazer update do documento do usuario
    await setDoc(
      userRef,
      {
        ...userAnswers,
      },
      { merge: true }
    );
  };

  // Pegando todos as dietas do user logado
  const getDiets = async () => {
    if (user) {
      // Criando referencia para o arquivo
      const dietRef = doc(dietCollection, user.uid);
      await getDoc(dietRef)
        .then((doc) => {
          if (doc.exists()) {
            const diets = doc.data().chats;
            console.log(diets);
            setDiets(diets);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  // Pegando todos os treinos do user logado
  const getTrainings = async () => {
    if (user) {
      // Criando referencia para o arquivo
      const trainRef = doc(trainingCollection, user.uid);
      await getDoc(trainRef)
        .then((doc) => {
          if (doc.exists()) {
            const trainees = doc.data().chats;
            console.log(trainees);
            setTrainings(trainees);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const value = {
    userAnswers,
    setUserAnswers,
    handleAnswer,
    saveUserPersonalInfo,
    userPersonalInfoModal,
    setUserPersonalInfoModal,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
