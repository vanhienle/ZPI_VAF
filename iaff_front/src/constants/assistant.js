import { getSuggestedQuestions } from "../utils/Assistant/getSuggestedQuestions";
import flagBY from "../assets/images/by.svg";
import flagENG from "../assets/images/gb.svg";
import flagPL from "../assets/images/pl.svg";
import flagUA from "../assets/images/ua.svg";
import flagVN from "../assets/images/vn.svg";
import flagRU from "../assets/images/ru.svg";

export const message = `Hi, I am your intelligent assistant, happy to help.\nHere are some suggested questions:`;

export const input = `Send a question...`;

export const source_ = `Learn more: `;

const suggestedQuestionsForGuests = [
  "How can I apply for a Poland visa?",
  "How can I get a PESEL number?",
  "Where can I find accomodation?",
  "Are there any student programs?",
];

const suggestedQuestions = await getSuggestedQuestions();

export const questionList = suggestedQuestions || suggestedQuestionsForGuests;

export const languages = [
  "English",
  "Vietnamese",
  "Belarusian",
  "Ukrainian",
  "Polish",
  "Russian",
];

export const langDict = {
  English: [flagENG, "English"],
  Vietnamese: [flagVN, "Tiếng Việt"],
  Belarusian: [flagBY, "беларускі"],
  Ukrainian: [flagUA, "українська"],
  Polish: [flagPL, "Polski"],
  Russian: [flagRU, "Русский"],
};

if (
  !localStorage.getItem("lang") ||
  languages.indexOf(localStorage.getItem("lang")) === -1
) {
  localStorage.setItem("lang", languages[0]);
}
