import { SMS } from "expo";
import { getSecureItem, setSecureItem, deleteSecureItem } from "./asyncStorage";
const GAME_PLAYED = "gamePlayed";

export async function sendSMS() {
  const isAvailable = await SMS.isAvailableAsync();
  if (isAvailable) {
    await SMS.sendSMSAsync(
      ["Add a number"],
      "Hey try Word seeker it is amazing https://github.com/jguipi/word_seeker"
    );
  }
}

export async function updateGamePlayed() {
  const value = await getSecureItem(GAME_PLAYED);
  if (value) {
    let newValue = value + 1;
    await setSecureItem(GAME_PLAYED, newValue);
  } else {
    await setSecureItem(GAME_PLAYED, 1);
  }
}

export async function getGamePlayed() {
  const value = await getSecureItem(GAME_PLAYED);
  deleteSecureItem(GAME_PLAYED);
  if (value) {
    return value;
  } else {
    return 0;
  }
}
