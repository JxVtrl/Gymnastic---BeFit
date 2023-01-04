import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { iUserInfo } from "../interfaces/User.interface";
import { db } from "../services";
import { useAuth } from "./AuthContext";

const AppContext = createContext({});

export function AppProvider({ children }: any) {
  const [userPersonalInfoModal, setPersonalInfoModal] =
    useState<boolean>(false);
  const [diets, setDiets] = useState<any>([]);
  const [trainings, setTrainings] = useState<any>([]);
  const [userGoal, setUserGoal] = useState<string>("");
  const [userAnswers, setUserAnswers] = useState<iUserInfo | object>({});

  const { newUserFlag, setNewUserFlag, user }: any = useAuth();

  const usersCollection = collection(db, "users");
  const dietCollection = collection(db, "diet");
  const trainingCollection = collection(db, "training");

  useEffect(() => {
    if (newUserFlag) {
      setPersonalInfoModal(true);
      console.log("new user");
    }
  }, [newUserFlag]);

  const getUserAnswers = async () => {
    const userRef = doc(db, "users", user?.uid);

    const userDoc = await getDoc(userRef).then((doc) => {
      if (doc.exists()) return doc.data();
      else return null;
    });

    if (userDoc) {
      const {
        height,
        weight,
        workoutTime,
        biotype,
        makeAerobyc,
        smoke,
        drinks,
        alergy,
      } = userDoc;

      setUserAnswers({
        height,
        weight,
        workoutTime,
        biotype,
        makeAerobyc,
        smoke,
        drinks,
        alergy,
      });
    } else setPersonalInfoModal(true);
  };

  const getUserGoals = async () => {
    const userRef = doc(db, "users", user?.uid);

    const userDoc = await getDoc(userRef).then((doc) => {
      if (doc.exists()) return doc.data();
      else return null;
    });

    if (userDoc) {
      setUserGoal(userDoc?.goal);
    }
  };

  useEffect(() => {
    if (user?.uid) {
      getUserAnswers();
      getUserGoals();
    }
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
        infos: { ...userAnswers },
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
            setTrainings(trainees);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleProfileGoal = async (goal: string) => {
    // Criando referencia para o arquivo
    const userRef = doc(usersCollection, user?.uid);

    // fazer update do documento do usuario
    await setDoc(
      userRef,
      {
        goal,
      },
      { merge: true }
    );

    // update do user no context
    getUserGoals();
  };

  const value = {
    userAnswers,
    setUserAnswers,
    handleAnswer,
    saveUserPersonalInfo,
    userPersonalInfoModal,
    setPersonalInfoModal,
    handleProfileGoal,
    userGoal,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
