"use client";

import { useEffect, useState } from "react";

interface TypewriterTextProps {
    text: string;
    className?: string;
    speed?: number;
}

export default function TypewriterText({ text, className = "", speed = 32 }: TypewriterTextProps) {
    const [visibleText, setVisibleText] = useState("");
    const [skipTyping, setSkipTyping] = useState(false);
    const isComplete = visibleText.length >= text.length;

    useEffect(() => {
        setSkipTyping(false);
    }, [text]);

    useEffect(() => {
        if (skipTyping) {
            return;
        }

        const revealFullTextAnywhere = () => {
            setSkipTyping(true);
            setVisibleText(text);
        };

        window.addEventListener("pointerdown", revealFullTextAnywhere);

        return () => {
            window.removeEventListener("pointerdown", revealFullTextAnywhere);
        };
    }, [skipTyping, text]);

    useEffect(() => {
        let currentIndex = 0;
        let timeoutId: number | undefined;

        if (skipTyping) {
            setVisibleText(text);
            return;
        }

        setVisibleText("");

        const typeNextCharacter = () => {
            const nextChar = text[currentIndex + 1];
            const delay = nextChar === "\n" ? speed * 6 : speed;

            currentIndex += 1;
            setVisibleText(text.slice(0, currentIndex));

            if (currentIndex >= text.length) {
                return;
            }

            timeoutId = window.setTimeout(typeNextCharacter, delay);
        };

        timeoutId = window.setTimeout(typeNextCharacter, speed);

        return () => {
            if (timeoutId !== undefined) {
                window.clearTimeout(timeoutId);
            }
        };
    }, [skipTyping, speed, text]);

    return (
        <p className={className}>
            {visibleText}
            <span
                className="inline-block w-[0.6ch] align-baseline"
                style={isComplete ? { animation: "blink 1.2s ease-in-out infinite" } : undefined}
            >|</span>
        </p>
    );
}