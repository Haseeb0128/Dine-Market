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

export const cartContext = createContext<any>(null);

interface indexForError {
  [key: string]: string;
}

const ContextWrapper = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [userData, setUserData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [ErrorViaUserCredential, setErrorViaUserCredential] = useState<
    indexForError | ""
  >("");
  const initializerOfCart = {
    cart: [
      // {
      //   productID: "",
      //   quantity: 2,
      // },
    ],
  };
  const [state, dispatch] = useReducer(cartReducer, initializerOfCart);
  useEffect(() => {
    let cart = localStorage.getItem("cart") as string;
    if (cart === null) {
      localStorage.setItem("cart", JSON.stringify(state.cart));
    } else {
      initializerOfCart.cart = JSON.parse(cart);
    }
  });
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

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
        setErrorViaUserCredential({
          signUpError: "Error occured via Signup with Email and Password",
        });
        setLoading(false);
      });
    setLoading(false);
  }

  function signInUser(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
      .then((res: any) => {
        setLoading(false);
        // router.push("/");
      })
      .catch((res: any) => {
        setErrorViaUserCredential({
          signInError: "Error occured via Signin with Email and Password",
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
        state,
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
