import { surpriseMePrompts } from "../constants/index";
import FileSaver from "file-saver";
export function getRandomPrompt(prompt) {
  //this line will chose the random line from the array
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  // this line will return the that indexed line

  const randomPrompt = surpriseMePrompts[randomIndex];
  //this line will ensure that the selected indexed line will not repeat
  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  //here we are returning the line to use in other component
  return randomPrompt;
}

export async function downloadImage(_id, photo) {
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
}
