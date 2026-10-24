export interface PhotoItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  subtext: string;
}

export interface BirthdayReason {
  id: number;
  title: string;
  description: string;
  category: 'Kindness' | 'Spirit' | 'Grace' | 'Heart' | 'Presence';
}

export interface BirthdayWish {
  id: number;
  title: string;
  text: string;
  theme: string;
}

export interface BirthdayContent {
  recipientName: string;
  birthdayDate: {
    month: number; // 9 for October (0-indexed)
    day: number;   // 30
  };
  themeTitle: string;
  subtitle: string;
  letter: {
    salutation: string;
    paragraphs: string[];
    signoff: string;
    signature: string;
  };
  photos: PhotoItem[];
  reasons: BirthdayReason[];
  wishes: BirthdayWish[];
  music: {
    title: string;
    artist: string;
    localAudioPath: string;
    spotifyTrackUrl: string;
    spotifyEmbedUrl: string;
  };
}

export const BIRTHDAY_CONTENT: BirthdayContent = {
  recipientName: "Neha",
  birthdayDate: {
    month: 9, // October (0-indexed: 9 = October)
    day: 30,
  },
  themeTitle: "For Neha, With All the Love in the World",
  subtitle: "To the girl whose beautiful heart makes the world a little brighter.",
  
  letter: {
    salutation: "Dear Neha,",
    paragraphs: [
      "Happy Birthday to someone who is genuinely beautiful in the ways that matter most.",
      "There is something incredibly special about a person who carries kindness in their heart and makes the world feel a little softer just by being themselves. You deserve all the happiness, peace, love, and beautiful little surprises that life can offer.",
      "May this new chapter bring you countless reasons to smile, the courage to chase every dream close to your heart, and people who appreciate you for exactly who you are.",
      "Never forget that your worth is not only in how beautiful you look, but in the goodness you carry within you. The world needs more hearts like yours.",
      "Keep being your wonderful self. Keep smiling, keep growing, and keep finding magic in the little things.",
      "Wishing you a birthday as lovely and special as you are."
    ],
    signoff: "With lots of warmth and best wishes,",
    signature: "Someone who wishes you nothing but happiness ♡"
  },

  photos: [
    {
      id: "portrait-curly",
      src: "/images/neha-portrait-black.jpg",
      alt: "Neha smiling gently with curly hair in a stylish black top",
      caption: "A smile that makes ordinary moments brighter.",
      subtext: "Warmth that radiates without asking for attention."
    },
    {
      id: "black-dress-dots",
      src: "/images/neha-black-dress.jpg",
      alt: "Neha in a polka dot black dress with playful energy by a soft blush wall",
      caption: "A beauty that feels effortless.",
      subtext: "Graceful, vibrant, and always true to who she is."
    },
    {
      id: "red-dress-full",
      src: "/images/neha-red-dress.jpg",
      alt: "Neha standing gracefully in an elegant crimson lace dress",
      caption: "A little reminder of how lovely you are.",
      subtext: "Carrying poise and quiet charm wherever she goes."
    }
  ],

  reasons: [
    {
      id: 1,
      title: "Your kindness makes a real difference",
      description: "Even in small, quiet gestures, the kindness you offer leaves a lasting warmth with everyone around you.",
      category: "Kindness"
    },
    {
      id: 2,
      title: "You deserve the same warmth you give others",
      description: "You give so much gentle care freely; never forget that you deserve that very same tenderness in return.",
      category: "Heart"
    },
    {
      id: 3,
      title: "You bring your own kind of magic",
      description: "There is an effortless authenticity to you that makes any room feel lighter and more comfortable.",
      category: "Spirit"
    },
    {
      id: 4,
      title: "Your strength matters, even on difficult days",
      description: "The quiet resilience you hold within yourself is one of the most admirable things about you.",
      category: "Grace"
    },
    {
      id: 5,
      title: "Your smile is worth celebrating",
      description: "When you smile genuinely, it has a way of turning an ordinary day into something brighter.",
      category: "Presence"
    },
    {
      id: 6,
      title: "You deserve to feel appreciated",
      description: "Not just on your birthday, but every single day for simply being the genuine person you are.",
      category: "Heart"
    },
    {
      id: 7,
      title: "A heart that remains soft",
      description: "In a noisy and fast world, keeping a gentle, thoughtful heart is your greatest superpower.",
      category: "Kindness"
    },
    {
      id: 8,
      title: "Quiet confidence and poise",
      description: "You carry yourself with a natural grace that requires no pretense or exaggeration.",
      category: "Grace"
    },
    {
      id: 9,
      title: "The joy you bring to simple conversations",
      description: "Talking with you is easy and comforting—you make people feel heard and respected.",
      category: "Presence"
    },
    {
      id: 10,
      title: "Your genuine nature",
      description: "You don't put on facades. You are sincerely, refreshingly yourself, and that is rare.",
      category: "Spirit"
    },
    {
      id: 11,
      title: "A reassuring presence",
      description: "Just knowing someone as kind as you is in the world makes everything feel a little more grounded.",
      category: "Presence"
    },
    {
      id: 12,
      title: "Your dreams are worth pursuing",
      description: "Whatever you quietly hope for in your heart, you have the patience and spirit to reach it.",
      category: "Spirit"
    },
    {
      id: 13,
      title: "Patience and understanding",
      description: "You have an innate ability to look at situations with patience and emotional maturity.",
      category: "Kindness"
    },
    {
      id: 14,
      title: "Beauty from the inside out",
      description: "Your external charm is undeniable, but it's the purity of your intentions that makes you unforgettable.",
      category: "Heart"
    },
    {
      id: 15,
      title: "You light up quiet moments",
      description: "Even without grand gestures, your presence brings comfort and quiet joy to those around you.",
      category: "Presence"
    },
    {
      id: 16,
      title: "The courage to stay gentle",
      description: "Remaining kind when things get busy or chaotic is a testament to who you truly are.",
      category: "Grace"
    },
    {
      id: 17,
      title: "A wonderful listener",
      description: "You listen with your whole attention, without judgment—a gift not many people know how to give.",
      category: "Kindness"
    },
    {
      id: 18,
      title: "You inspire goodness in others",
      description: "Seeing how thoughtful you are naturally motivates others to be a little softer and kinder too.",
      category: "Heart"
    },
    {
      id: 19,
      title: "Honesty and integrity",
      description: "You value truth and treat people with fair-minded respect in everything you do.",
      category: "Spirit"
    },
    {
      id: 20,
      title: "Effortless elegance",
      description: "Whether dressed up or in everyday moments, your natural charm always shines through effortlessly.",
      category: "Grace"
    },
    {
      id: 21,
      title: "A spark of wholesome curiosity",
      description: "The way you appreciate life's little wonders keeps a youthful, lovely spark alive.",
      category: "Spirit"
    },
    {
      id: 22,
      title: "You never boast about the good you do",
      description: "Your kindness is private, sincere, and pure—never done for applause or attention.",
      category: "Kindness"
    },
    {
      id: 23,
      title: "Worthy of unconditional peace",
      description: "May your mind and heart always find tranquility, safe from doubt and unnecessary worry.",
      category: "Heart"
    },
    {
      id: 24,
      title: "Unmatched sincerity",
      description: "When you pay a compliment or share a kind word, one can feel that it comes from the depth of your soul.",
      category: "Kindness"
    },
    {
      id: 25,
      title: "Resilient through every season",
      description: "Like a blooming flower through spring and autumn, your spirit continues to grow and flourish.",
      category: "Grace"
    },
    {
      id: 26,
      title: "A calming influence",
      description: "Your gentle demeanor has an almost therapeutic way of settling tense or rushed moments.",
      category: "Presence"
    },
    {
      id: 27,
      title: "The sparkle in your eyes",
      description: "There is an undeniable warmth and mischief in your eyes that brings an instant smile.",
      category: "Spirit"
    },
    {
      id: 28,
      title: "Generous with encouragement",
      description: "You naturally uplift people and wish them well from the bottom of your heart.",
      category: "Heart"
    },
    {
      id: 29,
      title: "Treasuring what truly matters",
      description: "You know how to value people, peace of mind, and genuine connections over superficial noise.",
      category: "Spirit"
    },
    {
      id: 30,
      title: "One of a kind",
      description: "There is no one quite like Neha—and the world is genuinely better with you in it.",
      category: "Heart"
    },
    {
      id: 31,
      title: "Deserving of wonderful surprises",
      description: "May life frequently surprise you with delightful news, warm hugs, and unexpected blessings.",
      category: "Grace"
    },
    {
      id: 32,
      title: "Your laugh is contagious",
      description: "When something genuinely amuses you, your laughter brings genuine delight to everyone nearby.",
      category: "Spirit"
    }
  ],

  wishes: [
    {
      id: 1,
      title: "A Year of Serenity",
      text: "May this year gift you peaceful mornings, calm evenings, and a heart completely free of heavy burdens.",
      theme: "Peace"
    },
    {
      id: 2,
      title: "Unstoppable Joy",
      text: "May you find unexpected reasons to smile in the simplest daily moments, from warm sunsets to sweet songs.",
      theme: "Happiness"
    },
    {
      id: 3,
      title: "Courage to Soar",
      text: "May you step into every ambition and aspiration with confidence, knowing you are capable of extraordinary things.",
      theme: "Dreams"
    },
    {
      id: 4,
      title: "Beautiful Friendships",
      text: "May you be surrounded by loyal souls who cherish your kindness, match your loyalty, and make you feel safe.",
      theme: "Friendship"
    },
    {
      id: 5,
      title: "New Horizons & Adventures",
      text: "May this chapter open new roads filled with exciting discoveries, breathtaking places, and unforgettable memories.",
      theme: "Adventure"
    },
    {
      id: 6,
      title: "Unwavering Self-Belief",
      text: "May you always remember your innate worth and stand tall, even when the world forgets to be gentle.",
      theme: "Confidence"
    },
    {
      id: 7,
      title: "Little Miracles",
      text: "May the universe conspire in your favor and send sweet, unexpected blessings exactly when you need them most.",
      theme: "Magic"
    },
    {
      id: 8,
      title: "Boundless Success",
      text: "May your hard work, dedication, and intelligence be rewarded with growth, recognition, and fulfilling milestones.",
      theme: "Success"
    },
    {
      id: 9,
      title: "Everlasting Radiance",
      text: "May the light and warmth inside you keep shining as brightly as ever, inspiring everyone fortunate enough to know you.",
      theme: "Warmth"
    },
    {
      id: 10,
      title: "Gentle Healing & Rest",
      text: "May you always have a cozy sanctuary to recharge, breathe deeply, and feel completely at ease with who you are.",
      theme: "Rest"
    },
    {
      id: 11,
      title: "Endless Good Health & Energy",
      text: "May your days be filled with vibrant vitality, good health, and an abundance of enthusiasm for the path ahead.",
      theme: "Vitality"
    },
    {
      id: 12,
      title: "A Heart Full of Love",
      text: "May all the love, appreciation, and goodness you give so selflessly flow back to you a thousand times over.",
      theme: "Love"
    }
  ],

  music: {
    title: "Espresso",
    artist: "Sabrina Carpenter",
    localAudioPath: "/audio/espresso.mp3",
    spotifyTrackUrl: "https://open.spotify.com/track/2HRqTpkrUmQI7z6r640Hvh",
    spotifyEmbedUrl: "https://open.spotify.com/embed/track/2HRqTpkrUmQI7z6r640Hvh?utm_source=generator&theme=0"
  }
};
