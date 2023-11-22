import React, { useState, useEffect } from "react";
import { HiMicrophone, HiPause } from "react-icons/hi";
import { getTranscription } from "../../utils/Assistant/getTranscription";

const AudioRecorder = ({ handleQuerySubmit, setIsRecognizing }) => {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioURL, setAudioURL] = useState("");
  const [audioBlob, setAudioBlob] = useState(null);

  useEffect(() => {
    return () => {
      if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();
      }
      mediaRecorder?.stream?.getTracks().forEach((track) => track.stop());
    };
  }, [mediaRecorder]);

  const startRecording = async () => {
    if (!recording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        recorder.ondataavailable = (e) => {
          const url = URL.createObjectURL(e.data);
          setAudioURL(url);
          setAudioBlob(e.data);
          const transcription = getTranscription(e.data);
          transcription.then((result) => {
            setIsRecognizing(false);
            handleQuerySubmit(result);
          });
        };

        recorder.start();
        setRecording(true);
        console.log("Recording started");
      } catch (err) {
        console.error("Error accessing media devices:", err);
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      setRecording(false);
      setIsRecognizing(true);
      console.log("Recording stopped");
    }
  };

  return (
    <div className="m-auto">
      {!recording ? (
        <HiMicrophone
          className="cursor-pointer text-primary-900 hover:text-primary-700 transition-all duration-200 ease-in-out animate-fade-in"
          size={25}
          onClick={() => {
            startRecording();
          }}
        />
      ) : (
        <HiPause
          className="cursor-pointer text-primary-900 hover:text-primary-700 transition-all duration-200 ease-in-out animate-fade-in"
          size={25}
          onClick={() => {
            stopRecording();
          }}
        />
      )}
    </div>
  );
};

export default AudioRecorder;
