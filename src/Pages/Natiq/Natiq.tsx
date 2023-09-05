import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";

const Natiq = () => {
    // Define some state variables
    const [text, setText] = useState(""); // The user input
    const [loading, setLoading] = useState(false); // The loading state
    const [error, setError] = useState(null); // The error state
    const [audio, setAudio] = useState<string| null>(null); // The audio data

    // Define a ref for the audio player
    const playerRef = useRef<HTMLAudioElement | null>(null);

    // Define a function to handle text input change
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        // Get the input value
        const value = e.target.value;
        // Set the text state
        setText(value);
        // Reset the error state
        setError(null);
    }, []);

    // Define a function to handle button click
    const handleClick = () => {
        setLoading(true);

        // Split the input text into words
        const words = text.split(" ");

        // Get the last word
        const lastWord = words[words.length - 1];

        // Repeat the last word three times
        const repeatedText = text + " " + lastWord + " " + lastWord;

        axios
            .post("https://echo-6sdzv54itq-uc.a.run.app/natiq", {
                text: repeatedText,
            })
            .then((response) => {
                const wave = response.data.wave;
                const base64 = wave.replace(/-/g, "+").replace(/_/g, "/");
                const padding = "=".repeat((4 - (base64.length % 4)) % 4);
                const paddedBase64 = base64 + padding;
                const audioData: string | null = `data:audio/wav;base64,${paddedBase64}`;
                setAudio(audioData);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Define a function to check if the text is valid Arabic
    const isValidArabic = (text: string) => {
        // Use a regular expression to test if the text contains only Arabic characters and spaces
        const regex = /^[\u0600-\u06FF\s]+$/;
        return regex.test(text);
    };

    // Define an effect to play the audio when it is ready
    useEffect(() => {
        if (audio) {
            // Get the current player instance from the ref
            const player = playerRef.current;
            if (player) {
                // Play the audio using the player instance
                player.play();
            }
        }
    }, [audio]);

    return (
        <div className="natiq">
            <h1>Natiq</h1>
            <p className="my-4">
                Write Arabic text and then speak it with an electronic voice,
                with the last word repeated three times.
            </p>
            <div className="input-container flex justify-center items-center gap-4">
                <input
                    className="text-sm leading-none text-left text-gray-600 px-4 py-3 max-w-full w-[500px] border rounded border-gray-300  outline-none"
                    type="text"
                    value={text}
                    onChange={handleChange}
                    placeholder="Enter Arabic text here"
                />

                <button
                className="px-4 py-2 bg-[#1cbfff] rounded h-full text-lg font-semibold"
                    onClick={handleClick}
                    disabled={!text || !isValidArabic(text)}
                >
                    Echo
                </button>
            </div>
            {loading && (
                <div className="loading-container">
                    <div className="loading-overlay"></div>
                    <div className="loading-indicator">Loading...</div>
                </div>
            )}
            {error && (
                <div className="error-container">
                    <p className="error-message">
                        Something went wrong: {error}
                    </p>
                </div>
            )}
            {audio && (
                <div className="output-container">
                    <p className="output-message">Here is your echo:</p>
                    <audio ref={playerRef} src={audio} />
                </div>
            )}
        </div>
    );
};

export default Natiq;
