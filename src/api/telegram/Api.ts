import { Status } from "../../types/Status";

// TODO Get class with interface
const API_URL = process.env.VUE_APP_TELEGRAM_API_URL;
const GET_LAST_X_PAGES = parseInt(
  process.env.VUE_APP_TELEGRAM_API_PARSE_PAGES || ""
);
type RegionId = string;
const MESSAGE_WITH_WARNING_PATTERN = "F09F9FA1";
const MESSAGE_WITH_ALERT_PATTERN = "F09F94B4";

function sendRequest(url: string) {
  return fetch(url);
}

function* getMessagesTexts(response: string): Generator<string> {
  const div = document.createElement("div");
  div.innerHTML = response;
  const messages = div.getElementsByClassName("js-message_text");
  for (const msg of messages) {
    const message = (msg as HTMLElement).innerHTML;

    yield message;
  }
}

export async function getStatuses(): Promise<Record<RegionId, Status>> {
  const list: Record<RegionId, Status> = {};
  const slugs = ["/"];
  for (let i = 0; i < slugs.length; ++i) {
    const slug = slugs[i];

    const response = await sendRequest(API_URL + slug);
    const responseText = await response.text();

    if (slugs.length < GET_LAST_X_PAGES) {
      const newLink = responseText.match(/\?before=\d+/gm);
      if (newLink && newLink[0]) {
        slugs.push(newLink[0]);
      }
    }
    const messagesFromApi = getMessagesTexts(responseText);
    for (const message of [...messagesFromApi].reverse()) {
      const links = [...message.matchAll(/<a.+>(.+)<\/a>/gm)];
      let status = Status.OK;
      if (message.match(MESSAGE_WITH_WARNING_PATTERN)) {
        status = Status.WARNING;
      } else if (message.match(MESSAGE_WITH_ALERT_PATTERN)) {
        status = Status.ALERT;
      }
      if (
        links &&
        links[0] &&
        links[0][1] &&
        typeof list[links[0][1]] === "undefined"
      ) {
        list[links[0][1]] = status;
      }
    }
  }

  return list;
}
