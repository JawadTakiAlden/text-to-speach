"use client";
// components/TextToSpeech.js
import { useState, useEffect } from "react";

const TextToSpeech = () => {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceSelctedIndex, setVoiceSelectedIndex] = useState<number>(0);

  useEffect(() => {
    const synth = window.speechSynthesis;
    setVoices(synth.getVoices());
  }, []);

  const detectLanguageAndSetVoice = (text: string) => {
    const arabicPattern = /[\u0600-\u06FF]/;
    const englishPattern = /[a-zA-Z]/;

    if (arabicPattern.test(text)) {
        console.log('ar')
      const arabicVoice = voices.findIndex((voice) =>
        voice.lang.startsWith("ar")
      );
      setVoiceSelectedIndex(arabicVoice);
    } else if (englishPattern.test(text)) {
        console.log('en')
      const arabicVoice = voices.findIndex((voice) =>
        voice.lang.startsWith("en")
      );
      setVoiceSelectedIndex(arabicVoice);
    }
  };

  const speak = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ar-SA";
      utterance.voice = voices[voiceSelctedIndex];
      speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-Speech not supported in this browser.");
    }
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          detectLanguageAndSetVoice(e.target.value);
        }}
        rows={4}
        cols={50}
        placeholder="Enter text to speak..."
      ></textarea>
      <select
        value={voices[0].name}
    
      >
        {
            voices.map((voice) => (
                <option value={voice.name}>
                    {`${voice.name} ${voice.lang}`}
                </option>
            ))
        }
      </select>
      <button onClick={speak}>Speak</button>
    </div>
  );
};

export default TextToSpeech;
