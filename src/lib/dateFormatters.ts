import { ChronoUnit, DateTimeFormatter, ZonedDateTime } from "@js-joda/core";

const timeUnits: Record<number, string> = {
  1: "час",
  2: "часа",
  3: "часа",
  4: "часа",
  5: "часов",
  6: "часов",
  7: "часов",
  8: "часов",
  9: "часов",
  10: "часов",
  11: "часов",
  12: "часов",
};

export const zonedDateTimeToString = (timeStamp: string) => {
  if (!timeStamp) {
    throw new Error("No timestamp provided!");
  }

  const timeNow = ZonedDateTime.now();
  const timePassed = ZonedDateTime.parse(timeStamp);

  const period = ChronoUnit.HOURS.between(timePassed, timeNow);

  if (period > 0 && period < 13) {
    return `${period} ${timeUnits[period]} назад`;
  }

  return ZonedDateTime.parse(timeStamp).format(DateTimeFormatter.ofPattern("dd.MM.yyyy, HH:mm:ss"));
};
