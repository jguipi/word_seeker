import { SMS } from "expo";

export async function sendSMS() {
  const isAvailable = await SMS.isAvailableAsync();
  if (isAvailable) {
    await SMS.sendSMSAsync(
      ["Add a number"],
      "Hey try Word seeker it is amazing https://github.com/jguipi/word_seeker"
    );
  }
}
