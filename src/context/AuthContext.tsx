import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";

import { auth, storage, db } from "../services/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { iUser, AuthError } from "src/interfaces";

const AuthContext = createContext({});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<iUser | null>(null);
  const [photo, setPhoto] = useState<any>();
  const [userFound, setUserFound] = useState<iUser | null>(null);

  const [logError, setLogError] = useState<AuthError | undefined>(undefined);
  const [newUserFlag, setNewUserFlag] = useState<boolean>(false);

  // Criando a referencia para as coleções do firestore
  const usersCollection = collection(db, "users");
  const dietCollection = collection(db, "diet");
  const trainingCollection = collection(db, "training");

  //  Função para atualizar o estado do usuário
  const updateUser = ({
    uid,
    email,
    name,
    photoURL,
    infos = undefined,
    username,
  }: iUser) => {
    setUser({
      uid,
      name,
      username,
      email,
      photoURL,
      infos,
    });
  };

  // Função para registrar um novo usuário
  const handleRegister = async (values: any, redirect: any) => {
    try {
      // Criando as credenciais do usuario com auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const uid = userCredential.user.uid;

      if (uid) {
        // Criando um documento especifico no db p/ usuario criado
        await setDoc(doc(usersCollection, uid), {
          uid: uid,
          name: values.name,
          username: values.username,
          email: values.email,
          photoURL: "",
        });

        // Criando um documento especifico de dieta p/ usuario criado
        await setDoc(doc(dietCollection, uid), {
          diet: [],
        });

        // Criando um documento especifico de treino p/ usuario criado
        await setDoc(doc(trainingCollection, uid), {
          training: [],
        });

        setNewUserFlag(true);

        // Redirecionando para home
        redirect();
      }
    } catch (error: any) {
      setLogError(error);
    }
  };

  // Função para fazer login
  const handleLogin = async (values: any, redirect: any) => {
    try {
      const { email, password } = values;
      // fazendo login com as credenciais do usuario
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const querySnapshot = await getDocs(
        query(usersCollection, where("uid", "==", userCredential.user.uid))
      );

      const data = querySnapshot.docs[0].data();

      console.log(data);

      const { uid, name, username, photoURL } = data;

      updateUser({
        ...data,
      });

      setUser({
        uid,
        name,
        photoURL,
        username,
        email,
      });

      redirect();
    } catch (error: any) {
      setLogError(error);
    }
  };

  // Criando o state User com as informações do usuario
  const createUserObject = (user: any) => {
    if (user) {
      const userRef = doc(usersCollection, user.uid);
      getDoc(userRef).then((doc) => {
        if (doc.exists()) {
          const userData = doc.data();
          updateUser(userData);
        }
      });
    }
  };

  // Alterar o nome do usuario
  const handleUsername = async (username: string) => {
    if (user) {
      // Criando a referencia para o arquivo
      const userRef = doc(usersCollection, user.uid);

      // Validar disponibilidade do username
      const querySnapshot = await getDocs(
        query(usersCollection, where("username", "==", username))
      );

      if (querySnapshot.docs.length > 0) {
        return;
      }

      // Atualizando o documento do usuario com o novo username
      await setDoc(userRef, { username }, { merge: true });
      // Atualizando o estado do usuario com o novo username
      setUser({ ...user, username });
    }
  };

  // Procurando um usuario pelo username
  const findUser = async (username: string) => {
    const querySnapshot = await getDocs(
      query(usersCollection, where("username", "==", username))
    );

    if (querySnapshot?.docs[0]?.exists()) {
      const data = querySnapshot.docs[0].data();

      const { uid, name, username, photoURL, email } = data;
      setUserFound({
        uid,
        email,
        name,
        username,
        photoURL,
      });
    }
  };

  // Verificar se há disponibilidade de um username
  const usernameAvailable = async (username: string) => {
    const querySnapshot = await getDocs(
      query(usersCollection, where("username", "==", username))
    );
    return querySnapshot.empty;
  };

  // Verificar se há disponibilidade de um email
  const emailAvailable = async (email: string) => {
    const querySnapshot = await getDocs(
      query(usersCollection, where("email", "==", email))
    );
    return querySnapshot.empty;
  };

  // Atualizando a foto do usuario
  const handleUpdateAvatar = async (photoURL: string) => {
    if (user) {
      // Criando a referencia para o arquivo
      const userRef = doc(usersCollection, user.uid);
      // Atualizando o documento do usuario com a nova foto
      await setDoc(userRef, { photoURL }, { merge: true });
      // Atualizando o estado do usuario com a nova foto
      setUser({ ...user, photoURL });
    }
  };

  // Criando URL da foto do usuario
  const getPhotoURL = async (photo: any) => {
    // Criando referencia para o arquivo
    const avatarRef = ref(
      storage,
      `avatars/${user?.uid}.${photo?.type.split("/")[1]}`
    );

    // Pegando o metadata da imagem
    const metadata = {
      contentType: photo?.type,
    };

    // Fazendo upload da imagem
    await uploadBytes(avatarRef, photo, metadata).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        handleUpdateAvatar(url);
      });
    });
  };

  // Verificando o estado do usuario
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        createUserObject(user);
      } else setUser(null);
    });

    return () => {
      unsub();
    };
  }, []);

  const value = {
    user,
    setUser,
    handleRegister,
    handleLogin,
    logError,
    usersCollection,
    handleUpdateAvatar,
    photo,
    setPhoto,
    newUserFlag,
    // getPhotoURL,
    emailAvailable,
    usernameAvailable,
    setNewUserFlag,
    findUser,
    userFound,
    setUserFound,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
