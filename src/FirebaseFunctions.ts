import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { database } from "./firebase-config";
import { RepliesList, Reply, Survey, User } from "./types";

export async function loadSurveys(userId: string) {
  try {
    const surveysCollection = collection(database, "surveys");

    // const userIdJson = localStorage.getItem("userId");

    // let userId = "";
    // if (userIdJson) {
    //   userId = JSON.parse(userId);
    // }

    const surveysQuery = query(
      surveysCollection,
      where("userId", "==", userId),
    );

    const surveysSnapshot = await getDocs(surveysQuery);
    // console.log(localStorage.getItem("userId"));
    const surveysList: Survey[] = surveysSnapshot.docs.map((docc) => {
      const data = docc.data();
      return {
        id: data.id,
        userId: data.userId,
        name: data.name,
        questions: data.questions || [],
        published: data.published || false,
      } as Survey;
    });

    console.log("Załadowano ankiety z Firestore:", surveysList);
    return surveysList;
  } catch (error) {
    console.error("Błąd podczas ładowania ankiet z Firestore:", error);
    return [];
  }
}

export async function writeSurvey(newSurvey: Survey) {
  try {
    await addDoc(collection(database, "surveys"), {
      name: newSurvey.name,
      id: newSurvey.id,
      userId: newSurvey.userId,
      published: newSurvey.published,
      questions: newSurvey.questions.map((question) => ({
        description: question.description,
        type: question.type,
        id: question.id,
        options: question.options,
      })),
    });
  } catch (error) {
    console.error("Błąd podczas zapisywania ankiety do Firestore:", error);
  }
}

export async function writeReplies(
  surveyId: string,
  userName: string,
  replies: Reply[],
) {
  const usersCollectionRef = collection(
    database,
    `replies`,
    // `replies-surveyId=${surveyId}`,
  );

  await addDoc(usersCollectionRef, {
    surveyId,
    userName,
    replies: replies.map((reply) => ({
      questionId: reply.questionId,
      type: reply.type,
      answers: reply.answers,
    })),
  });
}

export async function loadReplies(surveyId: string) {
  try {
    const repliesCollection = collection(database, `replies`);
    const repliesSnapshot = await getDocs(repliesCollection);

    const repliesList: RepliesList[] = repliesSnapshot.docs
      .map((docc) => {
        const data = docc.data();
        return {
          surveyId: data.surveyId,
          userName: data.userName,
          replies: data.replies,
        } as RepliesList;
      })
      .filter((reply) => reply.surveyId === surveyId);

    console.log("Załadowano odpowiedzi z Firestore:", repliesList);
    return repliesList;
  } catch (error) {
    console.error("Błąd podczas ładowania odpowiedzi z Firestore:", error);
    return [];
  }
}

export async function updateSurvey(newSurvey: Survey) {
  const surveysCollection = collection(database, "surveys");
  const querySnapshot = await getDocs(surveysCollection);
  querySnapshot.forEach((docc) => {
    if (docc.get("id") === newSurvey.id) {
      updateDoc(doc(database, "surveys", docc.id), {
        id: newSurvey.id,
        userId: newSurvey.userId,
        name: newSurvey.name,
        published: newSurvey.published,
        // questions: newSurvey.questions,
        questions: newSurvey.questions.map((question) => ({
          description: question.description,
          type: question.type,
          id: question.id,
          options: question.options,
        })),
      });
    }
  });
}

export async function writeUser(newUser: User) {
  await addDoc(collection(database, "users"), {
    userId: newUser.userId,
    email: newUser.email,
  });
  console.log("dodano uzytkownka");
}

export async function loadUser(userId: string): Promise<User> {
  try {
    const usersCollection = collection(database, "users");
    const userQuery = query(usersCollection, where("userId", "==", userId));
    const usersSnapshot = await getDocs(userQuery);

    const userDocs = usersSnapshot.docs;

    if (!userDocs.length) {
      throw new Error("user missing");
    }

    const userData = userDocs[0].data();

    if (!userData.userId || !userData.email)
      throw new Error("user data malformed");

    return {
      userId: userData.userId,
      email: userData.email,
    };
  } catch (error) {
    console.error("Błąd podczas ładowania ankiet z Firestore:", error);
    throw error;
  }
}
