import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import type { DayContent } from './AdventDayModal';

interface DailyQuizProps {
  dayContent: DayContent;
  onComplete: () => void;
}

// More engaging quiz questions that test understanding, not just repetition
const getQuizQuestion = (dayContent: DayContent): { question: string; options: string[]; correct: number; explanation?: string } | null => {
  const learnText = dayContent.learn.toLowerCase();
  const culture = dayContent.culture;
  
  // Create more engaging questions based on content
  const questions: Array<{ question: string; options: string[]; correct: number; explanation?: string }> = [];

  // Question 1: Test understanding of the main concept
  if (learnText.includes('christmas tree') || learnText.includes('tree')) {
    questions.push({
      question: "Why do people bring evergreen trees inside for Christmas?",
      options: [
        "They stay green all winter, symbolizing life",
        "They smell nice",
        "They're easy to decorate",
        "They're free in the forest"
      ],
      correct: 0,
      explanation: "Evergreen trees stay green even in winter, which symbolizes life and hope during the dark winter months!"
    });
  } else if (learnText.includes('santa') || learnText.includes('claus')) {
    questions.push({
      question: "Why does Santa have different names in different countries?",
      options: [
        "Each culture has its own traditions and stories",
        "He speaks different languages",
        "He changes his name every year",
        "It's a secret code"
      ],
      correct: 0,
      explanation: "Different cultures have their own gift-bringers and traditions, which is why Santa has many names!"
    });
  } else if (learnText.includes('star') || learnText.includes('bethlehem')) {
    questions.push({
      question: "What did the Christmas star guide?",
      options: [
        "The Three Wise Men to find baby Jesus",
        "Santa's sleigh",
        "People to church",
        "The sun in the sky"
      ],
      correct: 0,
      explanation: "The Star of Bethlehem guided the Three Wise Men to find the baby Jesus!"
    });
  } else if (learnText.includes('carol') || learnText.includes('song')) {
    questions.push({
      question: "What were Christmas carolers originally doing?",
      options: [
        "Going door-to-door singing for treats",
        "Performing in theaters",
        "Singing only in churches",
        "Recording music"
      ],
      correct: 0,
      explanation: "Carolers used to go door-to-door singing and were given treats or drinks as thanks!"
    });
  } else if (learnText.includes('reindeer') || learnText.includes('sleigh')) {
    questions.push({
      question: "Why are reindeer perfect for pulling Santa's sleigh?",
      options: [
        "They're strong and can live in cold places",
        "They can fly",
        "They're very fast runners",
        "They're magical creatures"
      ],
      correct: 0,
      explanation: "Reindeer are strong animals that live in cold places like the North Pole, making them perfect helpers!"
    });
  } else if (learnText.includes('cookie') || learnText.includes('baking')) {
    questions.push({
      question: "Why do families bake special cookies at Christmas?",
      options: [
        "It's a fun tradition to share with family",
        "Cookies are cheaper than cake",
        "They need to use up flour",
        "Cookies last longer"
      ],
      correct: 0,
      explanation: "Baking Christmas cookies is a special tradition that brings families together to create and share treats!"
    });
  } else if (learnText.includes('light') || learnText.includes('candle')) {
    questions.push({
      question: "Why did people switch from candles to electric lights on trees?",
      options: [
        "Electric lights are much safer",
        "Candles were too expensive",
        "Electric lights are brighter",
        "Candles smelled bad"
      ],
      correct: 0,
      explanation: "Candles on trees were very dangerous and could start fires, so electric lights made trees much safer!"
    });
  } else if (learnText.includes('wreath')) {
    questions.push({
      question: "Why are Christmas wreaths shaped in a circle?",
      options: [
        "Circles have no end, symbolizing eternal life",
        "It's easier to hang",
        "It looks prettier",
        "It's the traditional shape"
      ],
      correct: 0,
      explanation: "The circle shape has no beginning or end, which symbolizes eternal life and the everlasting nature of Christmas!"
    });
  } else if (learnText.includes('stocking')) {
    questions.push({
      question: "Why do children hang stockings by the fireplace?",
      options: [
        "Legend says Saint Nicholas put gold in stockings",
        "They need to dry their socks",
        "It's a decoration",
        "To keep them warm"
      ],
      correct: 0,
      explanation: "The tradition comes from a story about Saint Nicholas putting gold coins in stockings that were hung to dry!"
    });
  } else if (learnText.includes('mistletoe')) {
    questions.push({
      question: "What happens when you stand under mistletoe?",
      options: [
        "People might give you a friendly kiss",
        "You get good luck",
        "You have to sing a song",
        "Nothing special"
      ],
      correct: 0,
      explanation: "The tradition says that if you stand under mistletoe, you might get a friendly kiss!"
    });
  }

  // Question 2: Culture-specific questions
  if (culture) {
    if (culture.country.toLowerCase().includes('japan')) {
      questions.push({
        question: "What makes Christmas in Japan unique?",
        options: [
          "Many families eat KFC for Christmas dinner",
          "They celebrate in July",
          "They don't use decorations",
          "Santa doesn't visit"
        ],
        correct: 0,
        explanation: "In Japan, eating KFC for Christmas has become a popular tradition since the 1970s!"
      });
    } else if (culture.country.toLowerCase().includes('australia') || culture.country.toLowerCase().includes('south africa') || culture.country.toLowerCase().includes('brazil')) {
      questions.push({
        question: "What's different about Christmas in this country?",
        options: [
          "It's summer there, so people celebrate at the beach",
          "They celebrate in January",
          "They don't give gifts",
          "They celebrate for only one day"
        ],
        correct: 0,
        explanation: "In the Southern Hemisphere, December is summer, so people celebrate Christmas with beach parties and barbecues!"
      });
    } else if (culture.country.toLowerCase().includes('iceland')) {
      questions.push({
        question: "How many gift-bringers visit children in Iceland?",
        options: [
          "13 Yule Lads (trolls)",
          "Just Santa",
          "Three Wise Men",
          "No one"
        ],
        correct: 0,
        explanation: "Iceland has 13 mischievous Yule Lads who visit children, one each night for 13 days!"
      });
    } else if (culture.country.toLowerCase().includes('mexico')) {
      questions.push({
        question: "What special tradition happens for 9 nights in Mexico?",
        options: [
          "Las Posadas - reenacting Mary and Joseph's journey",
          "Nine days of gift-giving",
          "Nine days of feasting",
          "Nine days of caroling"
        ],
        correct: 0,
        explanation: "Las Posadas is a 9-night celebration where families reenact Mary and Joseph searching for a place to stay!"
      });
    } else if (culture.country.toLowerCase().includes('italy')) {
      questions.push({
        question: "Who brings gifts to Italian children besides Santa?",
        options: [
          "La Befana - a friendly witch",
          "The Three Wise Men",
          "Elves",
          "Reindeer"
        ],
        correct: 0,
        explanation: "La Befana is a kind old witch who flies on a broomstick and brings gifts to Italian children on January 6th!"
      });
    } else if (culture.country.toLowerCase().includes('spain')) {
      questions.push({
        question: "When do Spanish children receive most of their gifts?",
        options: [
          "January 6th - Three Kings Day",
          "Christmas Eve",
          "Christmas Day",
          "New Year's Day"
        ],
        correct: 0,
        explanation: "In Spain, children receive most gifts on January 6th, called Three Kings Day or Epiphany!"
      });
    } else if (culture.country.toLowerCase().includes('sweden')) {
      questions.push({
        question: "What special day happens on December 13th in Sweden?",
        options: [
          "St. Lucia's Day - girls wear candle crowns",
          "The first day of winter",
          "Gift-giving day",
          "Cookie baking day"
        ],
        correct: 0,
        explanation: "St. Lucia's Day is when the oldest daughter dresses in white with a crown of candles and serves special buns!"
      });
    } else if (culture.country.toLowerCase().includes('norway')) {
      questions.push({
        question: "What do Norwegian families hide on Christmas Eve?",
        options: [
          "All their brooms",
          "Their gifts",
          "Their decorations",
          "Their food"
        ],
        correct: 0,
        explanation: "Norwegians hide brooms because of an old belief that witches come out on Christmas Eve looking for brooms to ride!"
      });
    } else if (culture.country.toLowerCase().includes('poland')) {
      questions.push({
        question: "What do Polish families wait for before starting Christmas dinner?",
        options: [
          "The first star in the sky",
          "Midnight",
          "Santa to arrive",
          "All family members"
        ],
        correct: 0,
        explanation: "Polish families wait until they see the first star before starting their special Wigilia dinner!"
      });
    } else if (culture.country.toLowerCase().includes('ukraine')) {
      questions.push({
        question: "Why do Ukrainian families decorate trees with spider webs?",
        options: [
          "A legend about a kind spider bringing good fortune",
          "They like spiders",
          "It's easier than ornaments",
          "Spiders are lucky"
        ],
        correct: 0,
        explanation: "A legend says a poor family's tree was decorated by a kind spider, and the webs turned to silver and gold!"
      });
    } else if (culture.country.toLowerCase().includes('greece')) {
      questions.push({
        question: "When do Greek children receive most of their gifts?",
        options: [
          "New Year's Day from St. Basil",
          "Christmas Day from Santa",
          "December 6th from St. Nicholas",
          "January 6th from the Three Kings"
        ],
        correct: 0,
        explanation: "In Greece, St. Basil brings gifts on New Year's Day, though some children also get gifts on St. Nicholas Day!"
      });
    } else if (culture.country.toLowerCase().includes('ethiopia')) {
      questions.push({
        question: "When is Christmas celebrated in Ethiopia?",
        options: [
          "January 7th",
          "December 25th",
          "December 24th",
          "January 1st"
        ],
        correct: 0,
        explanation: "Ethiopia uses a different calendar, so Christmas (called Ganna) is celebrated on January 7th!"
      });
    } else if (culture.country.toLowerCase().includes('philippines')) {
      questions.push({
        question: "How long is the Christmas season in the Philippines?",
        options: [
          "Months - starting in September",
          "Just December",
          "Two weeks",
          "One week"
        ],
        correct: 0,
        explanation: "The Philippines has the longest Christmas season, with celebrations starting in September and lasting for months!"
      });
    } else if (culture.country.toLowerCase().includes('netherlands')) {
      questions.push({
        question: "What do Dutch children leave out for Sinterklaas's horse?",
        options: [
          "Carrots in their shoes",
          "Cookies and milk",
          "Hay and water",
          "Nothing"
        ],
        correct: 0,
        explanation: "Dutch children leave carrots in their shoes for Sinterklaas's horse, and find treats in the morning!"
      });
    } else if (culture.country.toLowerCase().includes('france')) {
      questions.push({
        question: "What special cake do French families eat at Christmas?",
        options: [
          "Bûche de Noël (Yule log cake)",
          "Gingerbread cake",
          "Fruitcake",
          "Chocolate cake"
        ],
        correct: 0,
        explanation: "Bûche de Noël is a delicious Yule log-shaped cake that French families enjoy during Christmas!"
      });
    } else if (culture.country.toLowerCase().includes('russia')) {
      questions.push({
        question: "Who brings gifts to Russian children?",
        options: [
          "Grandfather Frost and Snow Maiden",
          "Just Santa",
          "The Three Wise Men",
          "Elves"
        ],
        correct: 0,
        explanation: "Grandfather Frost (Ded Moroz) and his granddaughter Snow Maiden (Snegurochka) bring gifts in Russia!"
      });
    } else if (culture.country.toLowerCase().includes('finland')) {
      questions.push({
        question: "Where do people believe Santa's official home is?",
        options: [
          "Lapland, Finland",
          "The North Pole",
          "Alaska",
          "Greenland"
        ],
        correct: 0,
        explanation: "Finland claims to be Santa's official home, with a special Santa's Village in Lapland!"
      });
    } else {
      // Generic culture question
      questions.push({
        question: `What makes Christmas in ${culture.country} special?`,
        options: [
          culture.tradition,
          "They celebrate longer",
          "They give more gifts",
          "They have better decorations"
        ],
        correct: 0,
        explanation: `In ${culture.country}, ${culture.tradition.toLowerCase()} makes their celebration unique!`
      });
    }
  }

  // Question 3: Fun fact or general Christmas knowledge
  if (dayContent.funFact) {
    if (dayContent.funFact.toLowerCase().includes('card')) {
      questions.push({
        question: "When was the first Christmas card created?",
        options: [
          "1843 in England",
          "1900 in America",
          "1920 in Germany",
          "1800 in France"
        ],
        correct: 0,
        explanation: "The first Christmas card was created in England in 1843!"
      });
    } else if (dayContent.funFact.toLowerCase().includes('cookie') || dayContent.funFact.toLowerCase().includes('billion')) {
      questions.push({
        question: "About how many cookies do Americans bake during Christmas?",
        options: [
          "Over 2 billion cookies",
          "About 100 million",
          "Around 50 million",
          "Just a few thousand"
        ],
        correct: 0,
        explanation: "Americans bake over 2 billion cookies during the Christmas season - that's enough for everyone on Earth!"
      });
    } else if (dayContent.funFact.toLowerCase().includes('candy cane')) {
      questions.push({
        question: "How many candy canes are made each year?",
        options: [
          "Over 1.76 billion",
          "About 100 million",
          "Around 50 million",
          "Just a few thousand"
        ],
        correct: 0,
        explanation: "Over 1.76 billion candy canes are made each year - enough to reach from the North Pole to the South Pole and back!"
      });
    } else if (dayContent.funFact.toLowerCase().includes('ornament')) {
      questions.push({
        question: "How big was the world's largest Christmas ornament?",
        options: [
          "30 feet tall",
          "10 feet tall",
          "5 feet tall",
          "2 feet tall"
        ],
        correct: 0,
        explanation: "The world's largest Christmas ornament was 30 feet tall and weighed over 4,000 pounds!"
      });
    } else if (dayContent.funFact.toLowerCase().includes('stocking')) {
      questions.push({
        question: "How long was the world's largest Christmas stocking?",
        options: [
          "106 feet long",
          "50 feet long",
          "20 feet long",
          "10 feet long"
        ],
        correct: 0,
        explanation: "The world's largest Christmas stocking was 106 feet long and could hold 1,000 presents!"
      });
    } else if (dayContent.funFact.toLowerCase().includes('tree')) {
      questions.push({
        question: "How tall was the tallest Christmas tree ever?",
        options: [
          "221 feet tall (20 stories)",
          "100 feet tall",
          "50 feet tall",
          "30 feet tall"
        ],
        correct: 0,
        explanation: "The tallest Christmas tree ever was 221 feet tall - as tall as a 20-story building!"
      });
    } else if (dayContent.funFact.toLowerCase().includes('gingerbread')) {
      questions.push({
        question: "How big was the largest gingerbread house?",
        options: [
          "60 feet long using 1,800 pounds of gingerbread",
          "20 feet using 500 pounds",
          "10 feet using 100 pounds",
          "5 feet using 50 pounds"
        ],
        correct: 0,
        explanation: "The largest gingerbread house was 60 feet long and used over 1,800 pounds of gingerbread!"
      });
    } else if (dayContent.funFact.toLowerCase().includes('twelve days')) {
      questions.push({
        question: "If you add up all the gifts in 'The Twelve Days of Christmas' song, how many total gifts are there?",
        options: [
          "364 gifts (almost one for every day)",
          "12 gifts",
          "24 gifts",
          "100 gifts"
        ],
        correct: 0,
        explanation: "If you count all the gifts in the song (including repeats), you get 364 gifts - almost one for every day of the year!"
      });
    } else if (dayContent.funFact.toLowerCase().includes('2 billion') || dayContent.funFact.toLowerCase().includes('people')) {
      questions.push({
        question: "About how many people around the world celebrate Christmas?",
        options: [
          "Over 2 billion people",
          "About 500 million",
          "Around 100 million",
          "Just a few million"
        ],
        correct: 0,
        explanation: "Over 2 billion people celebrate Christmas - that's almost one-third of all people on Earth!"
      });
    }
  }

  // Fallback: Creative general questions
  if (questions.length === 0) {
    questions.push({
      question: "What makes Christmas special for families around the world?",
      options: [
        "Spending time together and sharing traditions",
        "Getting lots of presents",
        "Eating special food",
        "Decorating the house"
      ],
      correct: 0,
      explanation: "While presents, food, and decorations are fun, what really makes Christmas special is spending time with family and sharing traditions!"
    });
  }

  // Return a random question from the available ones, or the first one
  return questions[Math.floor(Math.random() * questions.length)] || questions[0] || null;
};

export function DailyQuiz({ dayContent, onComplete }: DailyQuizProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quiz, setQuiz] = useState(() => getQuizQuestion(dayContent));

  // If no quiz, show a simple "tap to reveal" interaction
  if (!quiz) {
    return (
      <Card className="border-2 border-yellow-300 dark:border-yellow-700 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            <span>Daily Challenge!</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-base text-gray-700 dark:text-gray-300">
            {dayContent.funFact || "Tap the button below to complete today's challenge!"}
          </p>
          <Button
            onClick={onComplete}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
            size="lg"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Complete Day {dayContent.day}!
          </Button>
        </CardContent>
      </Card>
    );
  }

  const handleAnswer = (index: number) => {
    if (showResult) return;
    
    setSelectedAnswer(index);
    const correct = index === quiz.correct;
    setIsCorrect(correct);
    setShowResult(true);

    // Auto-complete after showing result
    setTimeout(() => {
      if (correct) {
        onComplete();
      }
    }, 2000); // Give time to read explanation
  };

  const handleTryAgain = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
    // Get a new question
    setQuiz(getQuizQuestion(dayContent));
  };

  return (
    <Card className="border-2 border-yellow-300 dark:border-yellow-700 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          <span>Daily Quiz!</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-base font-medium text-gray-900 dark:text-white">
          {quiz.question}
        </p>
        
        <div className="space-y-2">
          {quiz.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectAnswer = index === quiz.correct;
            const showCorrect = showResult && isCorrectAnswer;
            const showWrong = showResult && isSelected && !isCorrectAnswer;

            return (
              <Button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
                variant={isSelected ? "default" : "outline"}
                className={`w-full justify-start text-left h-auto py-3 px-4 transition-all ${
                  showCorrect
                    ? "bg-green-500 hover:bg-green-600 text-white border-green-600"
                    : showWrong
                    ? "bg-red-500 hover:bg-red-600 text-white border-red-600"
                    : isSelected
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3 w-full">
                  {showCorrect && <CheckCircle2 className="w-5 h-5 flex-shrink-0" />}
                  {showWrong && <XCircle className="w-5 h-5 flex-shrink-0" />}
                  <span className="flex-1">{option}</span>
                </div>
              </Button>
            );
          })}
        </div>

        {showResult && (
          <div className={`p-4 rounded-lg ${
            isCorrect 
              ? "bg-green-100 dark:bg-green-900/30 border-2 border-green-500" 
              : "bg-red-100 dark:bg-red-900/30 border-2 border-red-500"
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                  <p className="text-green-800 dark:text-green-200 font-semibold">
                    Great job! 🎉
                  </p>
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  <p className="text-red-800 dark:text-red-200 font-semibold">
                    Not quite! Try again!
                  </p>
                </>
              )}
            </div>
            {quiz.explanation && (
              <p className={`text-sm mt-2 ${
                isCorrect 
                  ? "text-green-700 dark:text-green-300" 
                  : "text-red-700 dark:text-red-300"
              }`}>
                {quiz.explanation}
              </p>
            )}
            {!isCorrect && (
              <Button
                onClick={handleTryAgain}
                variant="outline"
                size="sm"
                className="mt-3"
              >
                Try Again
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
