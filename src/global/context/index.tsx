"use client";
import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { cartReducer } from "../reducer";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import BASE_PATH_FOR_API from "@/components/shared/BasePath";

export const cartContext = createContext<any>(null);

interface indexForError {
  [key: string]: string;
}

const ContextWrapper = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [userData, setUserData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [errorViaUserCredential, setErrorViaUserCredential] = useState<
    indexForError | ""
  >("");
  const [cartArray, setCartArray] = useState<any>([]);
  const [errorsOfFirebase, setErrorsOfFirebase] = useState({
    key: "",
    errorMessage: "",
  });

  async function fethApiForAllCartItems() {
    let res = await fetch(`${BASE_PATH_FOR_API}/api/cartfunc`);
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    let dataToReturn = await res.json();
    setCartArray(dataToReturn.allCartData);
  }

  useEffect(() => {
    fethApiForAllCartItems();
  }, []);

  async function dispatch(payload: string, data: any) {
    if (payload === "addToCart") {
      await fetch(`${BASE_PATH_FOR_API}/api/cartfunc`, {
        method: "POST",
        body: JSON.stringify(data),
      });
    } else if (payload === "removeFromCart") {
      await fetch(
        `${BASE_PATH_FOR_API}/api/cartfunc?product_id=${data.product_id}&user_id=${data.user_id}`,
        {
          method: "DELETE",
        }
      );
    } else if (payload === "updateCart") {
      setLoading(true);
      await fetch(`${BASE_PATH_FOR_API}/api/cartfunc`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      setLoading(false);
    }
    fethApiForAllCartItems();
  }

  let user = auth.currentUser;
  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setUserData({
          displayName: user.displayName,
          email: user.email,
          uuid: user.uid,
          photoUrl: user.photoURL,
          emailVerified: user.emailVerified,
        });
      } else {
        setUserData(null);
      }
    });
  }, []);

  let provider = new GoogleAuthProvider();

  function signUpViaGoogle() {
    setLoading(true);
    return signInWithPopup(auth, provider).then((userData: any) => {
      if (userData) {
        setUserData({
          displayName: userData.user.displayName,
          email: userData.user.email,
          uuid: userData.user.uid,
          photoUrl: userData.user.photoURL,
          emailVerified: userData.user.emailVerified,
        });
        router.push("/");
      }
      setLoading(false);
    });
  }

  function signUpUser(email: string, password: string) {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((res: any) => {
        setLoading(false);
        router.push("/");
      })
      .catch((res: any) => {
        // setErrorViaUserCredential({
        //   signUpError: "Error occured via Signup with Email and Password",
        // });
        let error = res.code.split("/");
        error = error[error.length - 1];
        setErrorsOfFirebase({
          key: "signup",
          errorMessage: error,
        });
        setLoading(false);
      });
    setLoading(false);
  }

  function signInUser(email: string, password: string) {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then((res: any) => {
        setLoading(false);
        // router.push("/");
      })
      .catch((res: any) => {
        // setErrorViaUserCredential({
        //   signInError: "Error occured via Signin with Email and Password",
        // });
        let error = res.code.split("/");
        error = error[error.length - 1];
        setErrorsOfFirebase({
          key: "signin",
          errorMessage: error,
        });
      });
    setLoading(false);
  }

  function Logout() {
    setLoading(true);
    signOut(auth);
    setLoading(false);
    window.location.reload();
  }

  function sendEmailVarificationCode() {
    setLoading(true);
    if (user) {
      sendEmailVerification(user).then((res: any) => {
        console.log("Email sent");
        window.location.href = "/";
      });
      setLoading(false);
    }
  }

  function updateUsernamePhoto(userName: string, photoURL?: string) {
    setLoading(true);
    if (user) {
      updateProfile(user, {
        displayName: userName,
        photoURL: "https://example.com/jane-q-user/profile.jpg",
      })
        .then(() => {
          setLoading(false);
        })
        .catch((error: any) => {
          setLoading(false);
          console.log(error);
        });
    }
  }

  return (
    <cartContext.Provider
      value={{
        cartArray,
        errorsOfFirebase,
        dispatch,
        signUpUser,
        signUpViaGoogle,
        Logout,
        signInUser,
        sendEmailVarificationCode,
        updateUsernamePhoto,
        loading,
        userData,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default ContextWrapper;
