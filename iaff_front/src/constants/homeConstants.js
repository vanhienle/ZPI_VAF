import documentsImage from "../assets/images/documents.jpg";
import mapImage from "../assets/images/map.jpg";
import accommodationImage from "../assets/images/accommodation.webp";

export const INTRODUCTION_TEXT =
  "Welcome to an Intelligent Assistant For Foreigners (IAFF). Here, you can find information that will help you get a temporary or permanent residency or even citizenship. We collected all the necessary information to save you time from mindless scrolling through the Internet searching for solutions. Please, enjoy your residency with our Intelligent Assistant For Foreigners.";

export const ASSISTANT_DESCRIPTION =
  "Hello. I am your Intelligent Assistant. If you haven't found the information you were searching for on your own, I can help you with that. Just ask a question here and I will answer you.\n\nYours truly,\nIntelligent Assistant";

export const SIGN_IN_DESCRIPTION =
  "Join us and experience an even more streamlined way to discover relevant information that aligns perfectly with your goals and preferences.";

export const SURVEY_DESCRIPTION =
  "Participate in our brief survey, and let us tailor personal recommendations based on your unique preferences, age, and family status. Your input will help us customize our offerings to better align with your specific goals and lifestyle.";

export const QUESTIONS = [
  { id: 1, question: "How can I get a PESEL?" },
  { id: 2, question: "Where can I find accommodation?" },
  { id: 3, question: "What do I need to study in Poland?" },
  {
    id: 4,
    question: "Are there any student programs?",
  },
  { id: 5, question: "How can I get health insurance?" },
  { id: 6, question: "What do I need for Permanent Residence?" },
];

export const MODULES = [
  {
    id: 1,
    title: "Documents",
    description:
      "Are you in search of valuable information? Our expansive module is a treasure trove of knowledge covering a wide array of topics. If you haven't discovered precisely what you're seeking, don't hesitate to reach out to our Intelligent Assistant for help.",
    image: documentsImage,
    link: "/documents",
  },
  {
    id: 2,
    title: "Map",
    description:
      "What do we have here? It's a MAP to help you quickly find everything you need. Accommodation? Here you go. Got injured? Here is the list of hospitals. Want to learn astrophysics? Find a university that will provide you with any knowledge you want.",
    image: mapImage,
    link: "/map",
  },
  {
    id: 3,
    title: "Accommodation",
    description:
      "Everyone requires a place to call home. Through our collaboration with Booking.com, you can utilize this module to discover both temporary respites and permanent abodes tailored to your needs and preferences. Your perfect living space awaits!",
    image: accommodationImage,
    link: "/accommodation",
  },
];
