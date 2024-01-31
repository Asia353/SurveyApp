import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { database } from "./firebase-config";
import { RepliesList, Reply, Survey } from "./types";

export async function loadSurveys() {
  try {
    const surveysCollection = collection(database, "surveys");
    const surveysSnapshot = await getDocs(surveysCollection);

    const surveysList: Survey[] = surveysSnapshot.docs.map((docc) => {
      const data = docc.data();
      return {
        id: data.id,
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
  await addDoc(collection(database, "surveys"), {
    name: newSurvey.name,
    id: newSurvey.id,
    published: newSurvey.published,
    questions: newSurvey.questions.map((question) => ({
      description: question.description,
      type: question.type,
      id: question.id,
      options: question.options,
    })),
  });
}

export async function writeAnswers(surveyId: number, replies: Reply[]) {
  const usersCollectionRef = collection(
    database,
    `replies-surveyId=${surveyId}`,
  );

  await addDoc(usersCollectionRef, {
    replies: replies.map((reply) => ({
      questionId: reply.questionId,
      type: reply.type,
      answers: reply.answers,
    })),
  });
}

export async function loadResults(surveyId: number) {
  try {
    const repliesCollection = collection(
      database,
      `replies-surveyId=${surveyId}`,
    );
    const repliesSnapshot = await getDocs(repliesCollection);

    const repliesList: RepliesList[] = repliesSnapshot.docs.map((docc) => {
      const data = docc.data();
      return {
        replies: data.replies,
        sid: data.sid,
      } as RepliesList;
    });

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
