import React, { useState, useEffect } from 'react';

const ArchetypeQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);

  // All 60 unique questions - each archetype gets 4-5 questions
  const questions = [
    // Q1-Q14: First round
    "When a crisis arises, I'm usually the first to speak up, even if it's risky.",
    "I tend to heal others emotionally, even when I'm the one hurting.",
    "I instinctively see how systems and structures could be redesigned.",
    "People often say I have a sixth sense about what's coming next.",
    "I find myself translating between different groups, making ideas accessible.",
    "I protect people I care about fiercely, no matter the cost.",
    "I naturally fall into the role of a teacher or mentor.",
    "Stories, history, and language feel sacred to me.",
    "I see patterns others miss and enjoy weaving ideas or people together.",
    "I am most powerful when creating a clear, step-by-step plan.",
    "I've always been a little defiant—rules are made to be challenged.",
    "I feel deeply connected to something larger than myself—spirit, cosmos, etc.",
    "I take pride in providing for others in practical, tangible ways.",
    "I feel compelled to turn emotions and truth into visual or poetic art.",
    
    // Q15-Q28: Second round
    "I'd rather speak an uncomfortable truth than stay silent when something is wrong.",
    "I can sense unspoken pain in others and feel drawn to help them through it.",
    "I prefer to focus on concrete solutions rather than just talking about problems.",
    "I frequently have intuitive insights that prove to be accurate over time.",
    "I'm skilled at helping people from different backgrounds understand each other.",
    "I feel a deep responsibility to shield others from harm.",
    "People seek my guidance when they're facing important life decisions.",
    "I feel responsible for preserving important memories and experiences.",
    "I'm naturally gifted at connecting seemingly unrelated concepts or people.",
    "I can see multiple moves ahead in complex situations.",
    "I question authority and systems that don't serve people's best interests.",
    "I often receive insights through dreams, meditation, or quiet contemplation.",
    "I show my care through actions—cooking, organizing, taking care of details.",
    "I use creative expression to make sense of complex feelings and experiences.",
    
    // Q29-Q42: Third round
    "I often feel compelled to call out injustice, even when others prefer to ignore it.",
    "People often seek me out when they need emotional support or comfort.",
    "I'm naturally good at creating step-by-step plans to achieve long-term goals.",
    "I can sense shifts and changes before they become obvious to others.",
    "I can hold multiple perspectives without losing my own sense of truth.",
    "I will stand between danger and vulnerable people without hesitation.",
    "I have a gift for helping others discover their own inner wisdom.",
    "I believe it's crucial to remember the past to understand the present.",
    "I enjoy creating new combinations and synthesis from existing elements.",
    "I excel at turning chaotic visions into organized, achievable strategies.",
    "I refuse to accept 'that's just how things are' as a valid answer.",
    "I'm sensitive to energies and atmospheres that others don't seem to notice.",
    "I ensure that everyone's basic needs are met before worrying about my own.",
    "I believe beauty and art are essential for human flourishing and healing.",
    
    // Q43-Q56: Fourth round
    "I have a strong urge to wake people up when I see them accepting harmful situations.",
    "I believe that love and compassion are powerful tools for creating change.",
    "I enjoy building sustainable foundations that will benefit future generations.",
    "I trust my inner knowing, even when I can't explain it logically.",
    "I excel at making complex concepts understandable to diverse audiences.",
    "My love often expresses itself through protective action rather than words.",
    "I create a steady, calming presence that helps others feel grounded.",
    "I'm drawn to collecting and sharing meaningful narratives that might otherwise be lost.",
    "I can see the invisible threads that connect all things.",
    "I'm skilled at identifying the most effective path to reach important goals.",
    "I'm willing to be seen as difficult if it means standing up for what's right.",
    "I trust in forces and wisdom that can't be measured or proven scientifically.",
    "I find deep satisfaction in being the reliable support system others can count on.",
    "I can translate what others feel but cannot express into tangible creative forms.",
    
    // Q57-Q60: Fifth round (only for archetypes with 5 questions)
    "I find myself naturally taking the lead when others are hesitant to act on important issues.",
    "I naturally create safe spaces where people feel seen and heard.",
    "When I see something broken, I immediately start thinking about how to rebuild it better.",
    "I often see patterns and connections that others miss completely."
  ];

  // Archetype definitions with emojis and descriptions
  const archetypes = {
    torchbearer: {
      emoji: "🔥",
      name: "Torchbearer",
      tagline: "The Flame That Starts It All",
      description: "You are the fire no one can put out. The one who stands up first, speaks truth before it's safe, and refuses to let the silence win. While others are still checking the temperature, you've already kicked down the door and called the room to attention.",
      affirmation: "I am the spark. I am the call. I was never meant to be quiet.",
      questions: [1, 15, 29, 43, 57]
    },
    healer: {
      emoji: "🌿",
      name: "Healer", 
      tagline: "The Tender Force That Restores",
      description: "You are the soul who stays when others run. The one who senses unspoken pain, who reaches for others even when you're bleeding too. You understand that healing is holy, and you've learned that love is not weakness. It's rebellion.",
      affirmation: "My softness is not a wound — it is a weapon of restoration.",
      questions: [2, 16, 30, 44, 58]
    },
    builder: {
      emoji: "🧱",
      name: "Builder",
      tagline: "The Architect of What's Next", 
      description: "You are the one who doesn't just dream change — you construct it. While others talk, you're already blueprinting. You see cracks in the system and instinctively know how to rebuild it, stronger and more just.",
      affirmation: "I build with vision. I anchor what others can only imagine.",
      questions: [3, 17, 31, 45, 59]
    },
    oracle: {
      emoji: "🔮",
      name: "Oracle",
      tagline: "The Vision That Refuses to Wait",
      description: "You are the one who sees it before it happens. The one who knows when something is off even if no one else can name it. While others need evidence, you have clarity. You've always felt the future humming in your bones.",
      affirmation: "I see what's coming, and I no longer wait for permission to name it.",
      questions: [4, 18, 32, 46, 60]
    },
    bridge: {
      emoji: "🌉",
      name: "Bridge", 
      tagline: "The Translator Between Worlds",
      description: "You are the one who walks between languages, cultures, experiences — and somehow makes everyone feel seen. You can hold multiple truths at once without flinching. You've always been a connector, a translator, a living intersection of complexity and clarity.",
      affirmation: "I am the space between. I speak both fire and water, and I do not lose myself.",
      questions: [5, 19, 33, 47]
    },
    protector: {
      emoji: "🛡️",
      name: "Protector",
      tagline: "The Fierce Guardian of What Matters Most",
      description: "You are the one who stands between danger and the vulnerable. You don't hesitate. Your love is action, your loyalty is legendary, and your instinct to shield others is sacred. When someone is hurting, you feel it in your bones.",
      affirmation: "My strength is sacred. My care is a boundary. I guard what matters.",
      questions: [6, 20, 34, 48]
    },
    guide: {
      emoji: "🧭",
      name: "Guide",
      tagline: "The One Who Lights the Way Home",
      description: "You are the steady hand on the shoulder. The voice that calms the storm. The one people naturally turn to — not because you know everything, but because you hold space like it's oxygen.",
      affirmation: "My presence is permission. My truth is a compass. I walk with power and invite others in.",
      questions: [7, 21, 35, 49]
    },
    storykeeper: {
      emoji: "📜",
      name: "Storykeeper",
      tagline: "The Guardian of Meaning",
      description: "You are the one who remembers. Who holds language like a spell. Who protects stories from erasure and ensures that the past is not rewritten by those who caused the harm.",
      affirmation: "I remember. I record. I restore meaning where silence once lived.",
      questions: [8, 22, 36, 50]
    },
    weaver: {
      emoji: "🕸️",
      name: "Weaver",
      tagline: "The Pattern-Breaker, the Pattern-Maker",
      description: "You are the one who sees what others miss. The way it all connects. The threads between people, ideas, stories, causes — it all comes alive in your presence.",
      affirmation: "I see the threads. I follow the truth. I weave the way forward.",
      questions: [9, 23, 37, 51]
    },
    strategist: {
      emoji: "🧠",
      name: "Strategist",
      tagline: "The Architect of Liberation",
      description: "You are the one who sees ten steps ahead. Who notices what others miss. Who can take a massive, chaotic vision and sculpt it into something possible.",
      affirmation: "I choose my moves. I claim my outcomes. I play for liberation.",
      questions: [10, 24, 38, 52]
    },
    rebel: {
      emoji: "⚡",
      name: "Rebel",
      tagline: "The Sacred Disruptor",
      description: "You are the one who won't play along. The one who questions everything. The one who knew something was wrong long before anyone said it out loud.",
      affirmation: "I don't need permission to disrupt what harms. I was born to break the spell.",
      questions: [11, 25, 39, 53]
    },
    mystic: {
      emoji: "🌌",
      name: "Mystic",
      tagline: "The Channel Between Worlds",
      description: "You are the one who feels what others cannot name. Who dreams in symbols, speaks in frequencies, and knows — without knowing how. Your life has always been laced with the unexplainable.",
      affirmation: "I speak the unspeakable. I move with the mystery. I trust what I feel.",
      questions: [12, 26, 40, 54]
    },
    provider: {
      emoji: "🍞",
      name: "Provider",
      tagline: "The Sacred Source of Sustenance",
      description: "You are the one who shows up — again and again. The one who fills the fridge, pays the bill, keeps the lights on. You bring reality into revolution. You make care tangible.",
      affirmation: "My giving is sacred. My care is currency. I am the quiet force that keeps us alive.",
      questions: [13, 27, 41, 55]
    },
    artist: {
      emoji: "🎨",
      name: "Artist",
      tagline: "The Transmuter of Truth",
      description: "You are the one who feels it all and turns it into something others can hold. While the world fragments, you create beauty — not as a distraction, but as a declaration.",
      affirmation: "My art is sacred. My truth is transmission. I create what others only dare to feel.",
      questions: [14, 28, 42, 56]
    }
  };

  const handleAnswer = (questionIndex, rating) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: rating
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    const scores = {};
    
    // Initialize scores
    Object.keys(archetypes).forEach(key => {
      scores[key] = 0;
    });

    // Calculate scores based on question mapping
    Object.entries(answers).forEach(([questionIndex, rating]) => {
      const questionNum = parseInt(questionIndex) + 1;
      
      Object.entries(archetypes).forEach(([key, archetype]) => {
        if (archetype.questions.includes(questionNum)) {
          scores[key] += rating;
        }
      });
    });

    // Sort by highest scores and get top 3
    const sortedResults = Object.entries(scores)
      .map(([key, score]) => ({
        key,
        score,
        ...archetypes[key]
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    setResults(sortedResults);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setResults([]);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #FFF8FD 0%, #E6CFF3 100%)' }}>
        <div className="max-w-4xl mx-auto p-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4" style={{ color: '#2B1D5E' }}>
              🌟 Your Revolutionary Archetypes 🌟
            </h1>
            <p className="text-lg" style={{ color: '#9D6BBA' }}>
              Your top 3 sacred roles in the revolution
            </p>
          </div>

          {/* Results */}
          <div className="space-y-8">
            {results.map((result, index) => (
              <div key={result.key} 
                   className="rounded-xl p-8 shadow-lg" 
                   style={{ 
                     backgroundColor: index === 0 ? '#D6A7F5' : '#E6CFF3',
                     border: index === 0 ? '3px solid #C939FF' : '2px solid #D6A7F5'
                   }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-6xl">{result.emoji}</div>
                  <div>
                    <h2 className="text-3xl font-bold" style={{ color: '#2B1D5E' }}>
                      {index === 0 && '👑 '}{result.name}
                    </h2>
                    <p className="text-xl font-medium" style={{ color: '#9D6BBA' }}>
                      {result.tagline}
                    </p>
                    <p className="text-lg" style={{ color: '#2B1D5E' }}>
                      Score: {result.score}/25
                    </p>
                  </div>
                </div>
                
                <p className="text-lg leading-relaxed mb-4" style={{ color: '#1C1C1C' }}>
                  {result.description}
                </p>
                
                <div className="p-4 rounded-lg" style={{ backgroundColor: '#FFF8FD' }}>
                  <p className="font-bold text-lg" style={{ color: '#2B1D5E' }}>
                    Your Affirmation:
                  </p>
                  <p className="text-lg italic" style={{ color: '#9D6BBA' }}>
                    "{result.affirmation}"
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center p-8 rounded-xl" style={{ backgroundColor: '#D6A7F5' }}>
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#2B1D5E' }}>
              Ready to Step Into Your Power?
            </h3>
            <p className="text-lg mb-6" style={{ color: '#1C1C1C' }}>
              Discover the full depths of your revolutionary role and get personalized guidance for your journey.
            </p>
            <a href="https://stan.store/juliahub" 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-block px-8 py-4 text-white font-bold text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
               style={{ background: 'linear-gradient(45deg, #C939FF, #FF66B2)' }}>
              Explore Your Full Archetype Profile →
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center mt-8">
            <button onClick={resetQuiz}
                    className="px-6 py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
                    style={{ backgroundColor: '#E6CFF3', color: '#2B1D5E' }}>
              Take Quiz Again
            </button>
            <button onClick={() => {
              const resultsText = results.map(r => `${r.emoji} ${r.name}: ${r.tagline}`).join('\n');
              navigator.clipboard.writeText(`My Revolutionary Archetypes:\n\n${resultsText}\n\nDiscover yours: [quiz link]`);
              alert('Results copied to clipboard!');
            }}
                    className="px-6 py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
                    style={{ backgroundColor: '#2B1D5E', color: 'white' }}>
              Share Results
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #FFF8FD 0%, #E6CFF3 100%)' }}>
      <div className="max-w-3xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#2B1D5E' }}>
            🔥 Who Are You in the Revolution? 🔥
          </h1>
          <p className="text-lg" style={{ color: '#9D6BBA' }}>
            Discover your sacred role in creating change
          </p>
        </div>

        {/* Rating Instructions */}
        <div className="p-4 mb-6 rounded-xl text-center" style={{ backgroundColor: '#D6A7F5' }}>
          <p className="font-semibold" style={{ color: '#2B1D5E' }}>
            Rate each statement from 1 to 5 • 5 = completely true for me
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium" style={{ color: '#9D6BBA' }}>
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium" style={{ color: '#9D6BBA' }}>
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full rounded-full h-3" style={{ backgroundColor: '#FFF8FD' }}>
            <div className="h-3 rounded-full transition-all duration-300" 
                 style={{ 
                   width: `${progress}%`,
                   background: 'linear-gradient(45deg, #C939FF, #FF66B2)'
                 }}>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="p-8 rounded-xl shadow-lg mb-8" style={{ backgroundColor: 'white' }}>
          <p className="text-xl leading-relaxed mb-8 text-center" style={{ color: '#1C1C1C' }}>
            {questions[currentQuestion]}
          </p>

          {/* Rating Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleAnswer(currentQuestion, rating)}
                className={`w-16 h-16 rounded-full font-bold text-lg shadow-lg transform hover:scale-110 transition-all duration-200 ${
                  answers[currentQuestion] === rating ? 'ring-4' : ''
                }`}
                style={{
                  backgroundColor: answers[currentQuestion] === rating ? '#C939FF' : '#E6CFF3',
                  color: answers[currentQuestion] === rating ? 'white' : '#2B1D5E',
                  ringColor: '#FF66B2'
                }}
              >
                {rating}
              </button>
            ))}
          </div>

          {/* Rating Labels */}
          <div className="flex justify-between text-sm mb-8" style={{ color: '#9D6BBA' }}>
            <span>Not at all like me</span>
            <span>Completely true for me</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="px-6 py-3 rounded-full font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200"
            style={{ backgroundColor: '#E6CFF3', color: '#2B1D5E' }}
          >
            ← Previous
          </button>
          
          <button
            onClick={nextQuestion}
            disabled={!answers.hasOwnProperty(currentQuestion)}
            className="px-6 py-3 rounded-full font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200"
            style={{ 
              background: answers.hasOwnProperty(currentQuestion) 
                ? 'linear-gradient(45deg, #C939FF, #FF66B2)' 
                : '#9D6BBA',
              color: 'white'
            }}
          >
            {currentQuestion === questions.length - 1 ? 'See My Results ✨' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArchetypeQuiz;