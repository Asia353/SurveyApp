import React from "react";
import {
  DocumentData,
  DocumentSnapshot,
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { database } from "./firebase-config";
import { Survey } from "./types";

export default async function loadSurveysFromFirestore() {
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

export async function writeSurveyToFirestore(newSurvey: Survey) {
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

export async function loadSurveyByIdFromFirestore(
  surveyId: number,
): Promise<Survey | undefined> {
  try {
    const surveysCollection = collection(database, "surveys");

    // Używamy query i where, aby znaleźć dokument o konkretnym indeksie
    const q = query(surveysCollection, where("id", "==", surveyId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Pobieramy pierwszy pasujący dokument
      const surveyDoc: DocumentSnapshot<DocumentData> = querySnapshot.docs[0];
      const surveyData = surveyDoc.data();

      // Sprawdzamy, czy dane istnieją
      if (surveyData) {
        const survey: Survey = {
          id: surveyData.id,
          name: surveyData.name,
          questions: surveyData.questions || [],
          published: surveyData.published || false,
        };

        console.log("Załadowano ankietę z Firestore:", survey);
        return survey;
      }
    }

    console.error("Nie znaleziono ankiety o indeksie:", surveyId);
    return undefined;
  } catch (error) {
    console.error("Błąd podczas ładowania ankiety z Firestore:", error);
    return undefined;
  }
}

// export async function updateSurvey(surveyId: number) {
//   // Używamy query i where, aby znaleźć dokument o konkretnym indeksie
//   try {
//     const surveysCollection = collection(database, "surveys");

//     // Używamy query i where, aby znaleźć dokument o konkretnym indeksie
//     const q = query(surveysCollection, where("id", "==", surveyId));
//     const querySnapshot = await getDocs(q);

//     // Update the timestamp field with the value from the server
//     const updateTimestamp = await updateDoc(querySnapshot, {
//       id: 10,
//     });

//     // if (!querySnapshot.empty) {
//     //   // Pobieramy pierwszy pasujący dokument
//     //   const surveyDoc: DocumentSnapshot<DocumentData> = querySnapshot.docs[0];
//     //   const surveyData = surveyDoc.data();

//     //   // Sprawdzamy, czy dane istnieją
//     //   if (surveyData) {
//     //     const survey: Survey = {
//     //       id: surveyData.id,
//     //       name: surveyData.name,
//     //       questions: surveyData.questions || [],
//     //       published: surveyData.published || false,
//     //     };

//     //     console.log("Załadowano ankietę z Firestore:", survey);
//     //     return survey;
//     //   }
//     // }

//     console.error("Nie znaleziono ankiety o indeksie:", surveyId);
//     return undefined;
//   } catch (error) {
//     console.error("Błąd podczas ładowania ankiety z Firestore:", error);
//     return undefined;
//   }
// }

export async function modifySurveyQuestion(newSurvey: Survey) {
  console.log("asdf");
  try {
    const surveyRef = doc(database, "surveys", newSurvey.id.toString());

    await updateDoc(surveyRef, {
      // id: newSurvey.id,
      name: newSurvey.name,
      published: newSurvey.published,
      questions: newSurvey.questions,
    });

    console.log("Survey question modified successfully");
  } catch (error) {
    console.error("Error modifying survey question:", error);
  }
}
