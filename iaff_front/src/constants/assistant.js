import { getSuggestedQuestions } from "../utils/Assistant/getSuggestedQuestions";
import flagBY from "../assets/images/by.svg";
import flagENG from "../assets/images/gb.svg";
import flagPL from "../assets/images/pl.svg";
import flagUA from "../assets/images/ua.svg";
import flagVN from "../assets/images/vn.svg";

export const message = `Hi, I am your intelligent assistant from Poland, happy to help.\nHere are some suggested questions:`;

export const input = `Send a question...`;

const suggestedQuestionsForGuests = [
  "How can I apply for a Poland visa?",
  "How can I get a PESEL number?",
  "Where can I find accomodation?",
  "Are are any student programs?",
];

const suggestedQuestions = await getSuggestedQuestions();

export const questionList = suggestedQuestions || suggestedQuestionsForGuests;

export const languages = [
  "English",
  "Tiếng Việt",
  "беларускі",
  "українська",
  "Polski",
];

export const flagDict = {
  English: flagENG,
  "Tiếng Việt": flagVN,
  беларускі: flagBY,
  українська: flagUA,
  Polski: flagPL,
};

if (!localStorage.getItem("lang")) {
  localStorage.setItem("lang", languages[0]);
}
