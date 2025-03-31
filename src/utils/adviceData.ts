
interface AdviceItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  content?: string;
  moodRelated?: string[];
}

export const adviceData: AdviceItem[] = [
  {
    id: "advice-1",
    title: "3 Steps to Overcome Stage Fright",
    description: "Practical techniques to calm your nerves before a presentation or performance.",
    tags: ["confidence", "public speaking", "anxiety"],
    moodRelated: ["down", "confident"],
    content: "1. Prepare thoroughly - Know your material inside and out.\n2. Practice deep breathing - Take slow, deep breaths before going on stage.\n3. Visualize success - Picture yourself delivering a successful performance."
  },
  {
    id: "advice-2",
    title: "Building Daily Confidence Habits",
    description: "Small daily practices that can help build lasting confidence over time.",
    tags: ["habits", "confidence", "daily practice"],
    moodRelated: ["okay", "down"],
    content: "1. Practice positive self-talk each morning.\n2. Take on one small challenge each day.\n3. Celebrate small wins and progress.\n4. Stand tall with confident posture.\n5. Set boundaries and practice saying no when needed."
  },
  {
    id: "advice-3",
    title: "Finding Calm in Stressful Moments",
    description: "Techniques to ground yourself when feeling overwhelmed or anxious.",
    tags: ["stress", "anxiety", "calm"],
    moodRelated: ["down", "tired"],
    content: "1. Use the 5-4-3-2-1 technique: Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.\n2. Practice square breathing: Inhale for 4 counts, hold for 4, exhale for 4, hold for 4.\n3. Focus on your immediate surroundings, not future worries."
  },
  {
    id: "advice-4",
    title: "The Science of Happy Habits",
    description: "Research-backed habits that can boost your mood and overall happiness.",
    tags: ["happiness", "habits", "positivity"],
    moodRelated: ["happy", "loved"],
    content: "1. Practice gratitude daily by noting three things you're thankful for.\n2. Engage in random acts of kindness.\n3. Spend time in nature regularly.\n4. Maintain social connections with people who uplift you.\n5. Get regular physical activity - even short walks can boost happiness hormones."
  },
  {
    id: "advice-5",
    title: "Recharging Your Energy When Tired",
    description: "Effective strategies to restore your energy beyond just sleeping more.",
    tags: ["energy", "self-care", "rest"],
    moodRelated: ["tired", "okay"],
    content: "1. Take strategic breaks throughout the day.\n2. Hydrate properly - often fatigue is linked to dehydration.\n3. Have a protein-rich snack.\n4. Try a 20-minute power nap.\n5. Get some fresh air and sunlight.\n6. Limit screen time which can drain mental energy."
  },
  {
    id: "advice-6",
    title: "Building Meaningful Connections",
    description: "Ways to deepen your relationships and feel more connected to others.",
    tags: ["relationships", "connection", "social"],
    moodRelated: ["loved", "happy"],
    content: "1. Practice active listening without planning your response.\n2. Share vulnerably when appropriate.\n3. Remember and follow up on important details people share.\n4. Express appreciation specifically rather than generally.\n5. Make regular time for the relationships that matter most to you."
  }
];

export const getAdviceForMood = (mood: string): AdviceItem[] => {
  if (!mood) return adviceData.slice(0, 3);
  
  return adviceData
    .filter(item => item.moodRelated?.includes(mood))
    .slice(0, 3);
};

export const getRandomAdvice = (count: number = 3): AdviceItem[] => {
  const shuffled = [...adviceData].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
