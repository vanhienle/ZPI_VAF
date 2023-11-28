import documentsImage from "../assets/images/documents.jpg";
import mapImage from "../assets/images/map.jpg";
import accommodationImage from "../assets/images/accommodation.webp";

export const APP_TITLE = "Intelligent Assistant For Foreigners";

export const APP_DESCRIPTION =
  "Welcome to an Intelligent Assistant For Foreigners (IAFF). Here, you can find information that will help you get a temporary or permanent residency or even citizenship. We collected all the necessary information to save you time from mindless scrolling through the Internet searching for solutions. Please, enjoy your residency with our Intelligent Assistant For Foreigners.";

export const ASSISTANT_TITLE = "Intelligent Assistant";

export const ASSISTANT_DESCRIPTION =
  "Hello. I am your Intelligent Assistant. If you haven't found the information you were searching for on your own, I can help you with that. Just ask a question here and I will answer you.\n\nYours truly,\nIntelligent Assistant";

export const ASSISTANT_BUTTON = "Ask me";

export const Q_A_TITLE = "Q&A Module";

export const Q_A = [
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

export const MODULES_TITLE = "Modules";

export const MODULES_BUTTON = "Try It!";

export const MODULES = [
  {
    id: 1,
    title: "Documents",
    description:
      "Are you in search of valuable information? Our expansive module is a treasure trove of knowledge covering a wide array of topics. If you haven't discovered precisely what you're seeking, don't hesitate to reach out to our Intelligent Assistant for help.",
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
      "Everyone requires a place to call home. Through our collaboration with Booking.com, you can utilize this module to discover both temporary respites and permanent abodes tailored to your needs and preferences. Your perfect living space awaits!",
    image: accommodationImage,
    color: "secondary-300",
    link: "/accommodation",
  },
];

export const SIGN_IN_TITLE = "Join Us";

export const SIGN_IN_DESCRIPTION =
  "Want information that is relatable to you and your purposes? Join us and get even easier way to find information.";

export const SURVEY_TITLE = "Survey";

export const SURVEY_DESCRIPTION =
  "Take a quick survey so we could build personal recommendations based on your targets, age and family status.";

export const SURVEY_BUTTON = "Fill Survey";
