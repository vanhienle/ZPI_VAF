export async function getTranscription(audioBlob) {
  try {
    const formData = new FormData();
    formData.append("file", audioBlob, "recording.wav");
    try {
      const response = await fetch(
        process.env.REACT_APP_BACK_END_URL + "assistant/transcribe",
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();
      return result.text;
    } catch (error) {
      console.error("Error sending audio:", error);
    }
  } catch (error) {
    //throw error;
  }
}
