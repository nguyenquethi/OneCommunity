import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Translator() {
  const [languageFrom, setLanguageFrom] = useState("English");
  const [languageTo, setLanguageTo] = useState("Spanish");
  const [audioFile, setAudioFile] = useState(null);
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");

  const recognition = useRef(null); // Declare a ref to the recognition object

  const handleLanguageFromChange = (event) => {
    setLanguageFrom(event.target.value);
  };

  const handleLanguageToChange = (event) => {
    setLanguageTo(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send POST request to endpoint with form data
    const formData = new FormData();
    formData.append("language_from", languageFrom);
    formData.append("language_to", languageTo);
    formData.append("audio_file", audioFile);

    try {
      console.log(`Language from: ${formData.get("language_from")}`);
      console.log(`Language to: ${formData.get("language_to")}`);
      console.log(`Audio file: ${formData.get("audio_file").name}`);
      const response = await axios.post(
        "http://localhost:5000/translate",
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRecordClick = () => {
    if (!("webkitSpeechRecognition" in window)) {
      console.log("Web Speech API is not supported in this browser");
      return;
    }

    recognition.current = new window.webkitSpeechRecognition();
    recognition.current.continuous = true;
    recognition.current.interimResults = false;
    recognition.current.lang = languageFrom;

    recognition.current.onstart = () => {
      console.log("Microphone is enabled, you can start speaking now.");
      setRecording(true);
    };
    recognition.current.onend = () => {
      console.log("Microphone is disabled.");
      setRecording(false);
    };
    recognition.current.onerror = (event) => {
      console.error("Error while using the microphone:", event.error);
      setRecording(false);
    };
    recognition.current.onresult = (event) => {
      const lastResultIndex = event.results.length - 1;
      const lastResult = event.results[lastResultIndex][0].transcript;
      setTranscript(transcript + lastResult);
    };

    recognition.current.start();
    console.log("Started recording");
    setTimeout(() => {
      handleStopClick();
    }, 10000); // Stop recording after 10 seconds
  };

  const handleStopClick = () => {
    if (recognition.current) {
      recognition.current.stop();
      setRecording(false);
      console.log("Stopped recording");

      // Convert recorded speech to Blob
      const recordedSpeech = transcript.trim();
      const blob = new Blob([recordedSpeech], { type: 'audio/webm' });

      // Append audio file to FormData object
      const formData = new FormData();
      formData.append("language_from", languageFrom);
      formData.append("language_to", languageTo);
      formData.append("audio_file", blob);

      console.log(`Language from: ${languageFrom}`);
      console.log(`Language to: ${languageTo}`);
      console.log(`Audio file: ${blob}`);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="#">
                  Translate
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div id="mainBody" className="container py-5">
        <p className="h3 text-center mb-4">
          Select languages to translate from/to
        </p>
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-center mb-3">
            <label htmlFor="from" className="col-2 col-form-label">
              From:
            </label>
            <div className="col-7">
              <input
                type="text"
                className="form-control"
                id="from"
                value={languageFrom}
                onChange={handleLanguageFromChange}
              />
            </div>
          </div>
          <div className="row justify-content-center mb-3">
            <label htmlFor="to" className="col-2 col-form-label">
              To:
            </label>
            <div className="col-7">
              <input
                type="text"
                className="form-control"
                id="to"
                value={languageTo}
                onChange={handleLanguageToChange}
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <button
              type="button"
              className="btn btn-danger btn-sm mb-3"
              onClick={handleRecordClick}
              style={{ width: "200px" }}
            >
              Record
            </button>
            <button
              type="button"
              className="btn btn-warning btn-sm ms-2"
              onClick={handleStopClick}
              disabled={!recording}
              style={{ width: "200px" }}
            >
              Stop
            </button>
          </div>
          <h2 className="display-6 text-center mt-4 mb-3">
            Translation result
          </h2>
          <div className="row justify-content-center">
            <div className="col-9">
              <textarea
                className="form-control"
                id="result"
                rows="4"
                readOnly
                disabled
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-9">
              <button type="submit" className="btn btn-primary mt-3">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Translator;
