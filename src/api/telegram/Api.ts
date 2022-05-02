const API_URL = process.env.VUE_APP_TELEGRAM_API_URL;
const GET_LAST_X_PAGES = parseInt(
  process.env.VUE_APP_TELEGRAM_API_PARSE_PAGES || ""
);

type RegionName = string;

export enum StatusName {
  OK = "Відбій",
  ALERT = "Повітряна тривога",
}

const MESSAGE_DATETIME_PATTERN =
  /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+\d{2}:\d{2})/gm;
const MESSAGE_TITLE_PATTERN = /<a.+>#(.+)<\/a>/gm;
const MESSAGES_PREV_LINK_PATTERN = /\?before=\d+/gm;
export class MessageDTO {
  constructor(
    public regionName: RegionName,
    public statusName: StatusName,
    public datetime: Date
  ) {}
}

function sendRequest(url: string) {
  return fetch(url);
}

function* getMessagesTexts(response: string): Generator<MessageDTO> {
  const div = document.createElement("div");
  div.innerHTML = response;
  const messages = div.getElementsByClassName("tgme_widget_message_bubble");
  for (const msg of messages) {
    try {
      yield parseMessage(msg as HTMLElement);
    } catch {
      // ignore
      console.log("Error parsing message", msg);
    }
  }
}

function parseDatetime(message: string): Date {
  const datetime = [...message.matchAll(MESSAGE_DATETIME_PATTERN)];
  if (!datetime) {
    throw new DatetimeError("Datetime not found");
  }
  return new Date(datetime[0][1]);
}

function parseStatus(message: string): StatusName {
  if (message.indexOf(StatusName.ALERT) !== -1) {
    return StatusName.ALERT;
  }
  return StatusName.OK;
}

function parseMessage(el: HTMLElement): MessageDTO {
  const title = parseRegionTitle(el.innerHTML);
  const statusName = parseStatus(el.innerHTML);

  const datetime = parseDatetime(
    el.getElementsByClassName("tgme_widget_message_date")[0].innerHTML
  );

  return new MessageDTO(title, statusName, datetime);
}

function parseRegionTitle(message: string): RegionName {
  const links = [...message.matchAll(MESSAGE_TITLE_PATTERN)];
  if (links && links[0] && links[0][1]) {
    return links[0][1];
  }
  throw new RegionTitleError("Region title not found");
}

export async function getMessages(): Promise<MessageDTO[]> {
  const list: Record<RegionName, MessageDTO> = {};
  const slugs = ["/"];
  const messagesFromApi = [];
  for (let i = 0; i < slugs.length; ++i) {
    const slug = slugs[i];

    const response = await sendRequest(API_URL + slug);
    const responseText = await response.text();

    if (slugs.length < GET_LAST_X_PAGES) {
      const newLink = responseText.match(MESSAGES_PREV_LINK_PATTERN);
      if (newLink && newLink[0]) {
        slugs.push(newLink[0]);
      }
    }

    messagesFromApi.unshift(getMessagesTexts(responseText));
  }
  for (const messageFromApi of messagesFromApi) {
    for (const message of [...messageFromApi]) {
      list[message.regionName] = message;
    }
  }

  return Object.values(list);
}

class DatetimeError extends Error {}
class RegionTitleError extends Error {}
