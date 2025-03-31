
export interface QuizQuestion {
  id: string;
  question: string;
  description?: string;
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId: string;
  explanation: string;
  category: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "Which technique can help reduce anxiety before public speaking?",
    options: [
      { id: "a", text: "Drinking caffeinated beverages" },
      { id: "b", text: "Visualizing failure scenarios" },
      { id: "c", text: "Deep breathing exercises" },
      { id: "d", text: "Staying up late to practice" }
    ],
    correctOptionId: "c",
    explanation: "Deep breathing exercises activate your parasympathetic nervous system, which helps calm your body's stress response and reduce anxiety before speaking.",
    category: "confidence"
  },
  {
    id: "q2",
    question: "What is one effective way to build confidence over time?",
    options: [
      { id: "a", text: "Avoiding challenging situations" },
      { id: "b", text: "Setting and achieving small goals" },
      { id: "c", text: "Comparing yourself to others" },
      { id: "d", text: "Focusing only on your weaknesses" }
    ],
    correctOptionId: "b",
    explanation: "Setting and achieving small goals builds confidence through progressive success experiences. Each achievement reinforces your belief in your abilities.",
    category: "confidence"
  },
  {
    id: "q3",
    question: "Which statement about self-talk is most accurate?",
    options: [
      { id: "a", text: "Self-talk has no real impact on how you feel" },
      { id: "b", text: "Negative self-talk helps motivate improvement" },
      { id: "c", text: "How you talk to yourself influences your emotions and confidence" },
      { id: "d", text: "Self-talk patterns cannot be changed" }
    ],
    correctOptionId: "c",
    explanation: "How you talk to yourself significantly impacts your emotions, confidence, and performance. Positive, realistic self-talk can boost confidence while negative self-talk undermines it.",
    category: "mindset"
  },
  {
    id: "q4",
    question: "Which is a healthy coping mechanism for stress?",
    options: [
      { id: "a", text: "Ignoring your feelings" },
      { id: "b", text: "Physical exercise" },
      { id: "c", text: "Isolating yourself" },
      { id: "d", text: "Working more hours" }
    ],
    correctOptionId: "b",
    explanation: "Physical exercise releases endorphins (natural mood elevators), reduces stress hormones, and provides a healthy outlet for emotional energy.",
    category: "wellbeing"
  },
  {
    id: "q5",
    question: "What is the 'growth mindset' concept developed by psychologist Carol Dweck?",
    options: [
      { id: "a", text: "The belief that intelligence and talents are fixed traits" },
      { id: "b", text: "The idea that only some people can develop new skills" },
      { id: "c", text: "The belief that abilities can be developed through dedication and hard work" },
      { id: "d", text: "The concept that growth only happens during childhood" }
    ],
    correctOptionId: "c",
    explanation: "A growth mindset is the belief that abilities can be developed through dedication, hard work, and learning from failure. This mindset leads to greater resilience and achievement.",
    category: "mindset"
  },
  {
    id: "q6",
    question: "Which practice has been scientifically shown to increase happiness?",
    options: [
      { id: "a", text: "Regularly expressing gratitude" },
      { id: "b", text: "Focusing on material possessions" },
      { id: "c", text: "Avoiding all negative emotions" },
      { id: "d", text: "Comparing your achievements to others" }
    ],
    correctOptionId: "a",
    explanation: "Regular gratitude practice has been consistently linked to greater happiness, positive emotions, and improved well-being in numerous scientific studies.",
    category: "wellbeing"
  }
];

export const getRandomQuiz = (category?: string): QuizQuestion => {
  let filteredQuestions = quizQuestions;
  
  if (category) {
    filteredQuestions = quizQuestions.filter(q => q.category === category);
  }
  
  const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
  return filteredQuestions[randomIndex];
};
