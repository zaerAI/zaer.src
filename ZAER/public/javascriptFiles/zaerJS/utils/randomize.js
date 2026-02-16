// Copyright 2026 - ZAER.
// Licensed over MIT License.

const words = [
  "technology.",
  "artificial intelligence.",
  "machine learning.",
  "web development.",
  "software engineering.",
  "programming.",
  "javascript.",
  "design.",
  "user experience.",
  "user interface.",
  "creativity.",
  "innovation.",
  "startups.",
  "entrepreneurship.",
  "business strategy.",
  "marketing.",
  "branding.",
  "content creation.",
  "copywriting.",
  "storytelling.",
  "productivity.",
  "time management.",
  "goal setting.",
  "personal growth.",
  "self improvement.",
  "learning.",
  "education.",
  "online courses.",
  "career development.",
  "job interviews.",
  "remote work.",
  "freelancing.",
  "team collaboration.",
  "leadership.",
  "management.",
  "problem solving.",
  "critical thinking.",
  "decision making.",
  "logic.",
  "data analysis.",
  "data science.",
  "big data.",
  "databases.",
  "cloud computing.",
  "cybersecurity.",
  "privacy.",
  "ethics.",
  "digital safety.",
  "blockchain.",
  "cryptocurrency.",
  "finance.",
  "investing.",
  "economics.",
  "money management.",
  "budgeting.",
  "science.",
  "physics.",
  "biology.",
  "psychology.",
  "neuroscience.",
  "health.",
  "mental health.",
  "wellbeing.",
  "fitness.",
  "nutrition.",
  "design thinking.",
  "creativity tools.",
  "writing.",
  "editing.",
  "publishing.",
  "gaming.",
  "game development.",
  "virtual reality.",
  "augmented reality.",
  "metaverse.",
  "future trends.",
  "emerging technology.",
  "innovation culture.",
  "sustainability.",
  "climate change.",
];

const element = document.getElementById("randomize");

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingSpeed = 35;
const switchDelay = 1500;

function typeEffect() {
  const currentWord = words[wordIndex];

  if (!isDeleting) {
    element.textContent = currentWord.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      setTimeout(() => (isDeleting = true), switchDelay);
    }
  } else {
    element.textContent = currentWord.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? typingSpeed / 2 : typingSpeed);
}

typeEffect();