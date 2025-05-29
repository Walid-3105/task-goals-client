import { useState, useEffect } from "react";

const MotivationalQuote = () => {
  const [quote, setQuote] = useState({ text: "", author: "" });
  const [loading, setLoading] = useState(true);

  // Collection of motivational quotes
  const quotes = [
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
    },
    {
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill",
    },
    {
      text: "Believe you can and you're halfway there.",
      author: "Theodore Roosevelt",
    },
    {
      text: "Everything you've ever wanted is on the other side of fear.",
      author: "George Addair",
    },
    {
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
    },
    {
      text: "Don't watch the clock; do what it does. Keep going.",
      author: "Sam Levenson",
    },
    {
      text: "The only limit to our realization of tomorrow is our doubts of today.",
      author: "Franklin D. Roosevelt",
    },
    {
      text: "It does not matter how slowly you go as long as you do not stop.",
      author: "Confucius",
    },
    {
      text: "The best way to predict the future is to create it.",
      author: "Peter Drucker",
    },
    {
      text: "Your time is limited, don't waste it living someone else's life.",
      author: "Steve Jobs",
    },
  ];

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  const fetchNewQuote = () => {
    setLoading(true);
    // Simulate a small delay for better UX
    setTimeout(() => {
      setQuote(getRandomQuote());
      setLoading(false);
    }, 300);
  };

  useEffect(() => {
    fetchNewQuote();
  }, []);

  if (loading) {
    return (
      <div className="quote-container p-4 rounded-lg shadow-md">
        <p className="text-white">Loading quote...</p>
      </div>
    );
  }

  return (
    <div className="quote-container p-6 rounded-lg shadow-md absolute top-24">
      <blockquote className="text-xl italic text-white mb-4">
        "{quote.text}"
      </blockquote>
      <p className="text-right text-white">- {quote.author}</p>
    </div>
  );
};

export default MotivationalQuote;
