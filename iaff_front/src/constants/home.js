import documentsImage from "../assets/images/documents.jpg";
import mapImage from "../assets/images/map.jpg";
import accommodationImage from "../assets/images/accomodation.jpg";

export const appTitle = "Intelligent Assistant For Foreigners";

export const appDescription =
  "Welcome to an Intelligent Assistant For Foreigners (IAFF). Here, you can find information that will help you get a temporary or permanent residency or even citizenship. We collected all the necessary information to save you time from mindless scrolling through the Internet searching for solutions. Please, enjoy your residency with our Intelligent Assistant For Foreigners.";

export const assistantTitle = "Intelligent Assistant";

export const assistantDescription =
  "Hello. I am your Intelligent Assistant. If you haven't found the information you were searching for on your own, I can help you with that. Just ask a question here and I will answer you.\n\nYours truly,\nIntelligent Assistant";

export const qAndATitle = "Q&A Module";

export const qAndA = [
  { id: 1, question: "How to get PESEL?", image: "HOME" },
  { id: 2, question: "Where can I find accommodation?", image: "DOCUMENTS" },
  { id: 3, question: "What I need to study in Poland?", image: "ASSISTANT" },
  {
    id: 4,
    question: "Are there any student programs?",
    image: "ACCOMMODATION",
  },
  { id: 5, question: "How can I get an health insurance?", image: "MAP" },
  { id: 6, question: "What I need to work", image: "MAP" },
];

export const modulesTitle = "Modules";

export const modulesInfo = [
  {
    id: 1,
    title: "Documents",
    description:
      "You need information? In this module we have all the information that could help you. If you haven't found something you are interested in, ask our Intelligent Assistant.",
    image: documentsImage,
    color: "accent-900",
    link: "/documents",
  },
  {
    id: 2,
    title: "Map",
    description:
      "What do we have here? It's a MAP to help you quickly find everything you need. Accommodation? Here you go. Got injured? Here is the list of hospitals. Want to learn astrophysics? Find a university that will provide you with any knowledge you want.",
    image: mapImage,
    color: "accent-900",
    link: "/map",
  },
  {
    id: 3,
    title: "Accommodation",
    description:
      "Everybody needs a place to live. We partnered up with Booking.com, so use this module to find temporary or permanent accommodation.",
    image: accommodationImage,
    color: "secondary-300",
    link: "/accommodation",
  },
];

export const signInTitle = "Join Us";

export const signInDescription =
  "Want information that is relatable to you and your purposes? Join us and get even easier way to find information.";

export const surveyTitle = "Survey";

export const surveyDescription =
  "Take a quick survey so we could build personal recommendations based on your targets, age and family status.";
