import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "./firebase-config";
import { loadUser, writeUser } from "./FirebaseFunctions";
import { User } from "./types";

// eslint-disable-next-line import/prefer-default-export
export async function signUp(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const { user } = userCredential;

    writeUser({ userId: user.uid, email });
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.log(error.code);
      console.log(error.message);
    }
  }
}

export async function signIn(email: string, password: string): Promise<User> {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const { user } = userCredential;
    // console.log(user);
    return await loadUser(user.uid);
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.log(error.code);
      console.log(error.message);
    }
    throw error;
  }
}

export async function signOutFunction() {
  try {
    await signOut(auth);
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.log(error.code);
      console.log(error.message);
    }
    throw error;
  }
}
