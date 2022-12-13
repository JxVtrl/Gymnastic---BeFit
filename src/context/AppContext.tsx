import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";

const AppContext = createContext({});

export function AppProvider({ children }: any) {
  const [userAnswers, setUserAnswers] = useState({
    height: undefined,
    weight: undefined,
    workoutTime: undefined,
    biotype: undefined,
    makeAerobyc: undefined,
    smoke: undefined,
    drinks: undefined,
    alergy: undefined,
  });

  useEffect(() => {
    console.log(userAnswers);
  }, [userAnswers]);

    const handleAnswer = (e: any, inputType: string) => {
      console.log(e, inputType);
    switch (inputType) {
      case "height":
        setUserAnswers({ ...userAnswers, height: e.target.value });
        break;
      case "weight":
        setUserAnswers({ ...userAnswers, weight: e.target.value });
        break;
      case "workoutTime":
        setUserAnswers({ ...userAnswers, workoutTime: e.target.value });
        break;
      case "biotype":
        setUserAnswers({ ...userAnswers, biotype: e.target.value });
        break;
      case "makeAerobyc":
        setUserAnswers({ ...userAnswers, makeAerobyc: e.target.value });
        break;
      case "smoke":
        setUserAnswers({ ...userAnswers, smoke: e.target.value });
        break;
      case "drinks":
        setUserAnswers({ ...userAnswers, drinks: e.target.value });
        break;
      case "alergy":
        setUserAnswers({ ...userAnswers, alergy: e.target.value });
        break;
      default:
        break;
    }
  };

  const value = {
    userAnswers,
    setUserAnswers,
    handleAnswer,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
