import { Audio } from "expo";

export async function playSoundAsync() {
  const soundObject = new Audio.Sound();
  try {
    await soundObject.loadAsync(require("../assets/audios/audio_01.wav"));
    await soundObject.playAsync();
  } catch (error) {
    console.log(error);
  }
}
