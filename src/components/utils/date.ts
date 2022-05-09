export type DateDiff = ReturnType<typeof getDatesDiff>;

export function getDatesDiff(start: Date, end: Date) {
  if (!start) {
    return {
      d: 0,
      h: 0,
      m: 0,
      s: 0,
    };
  }
  const SEC_IN_MINUTES = 60;
  const SEC_IN_HOURS = SEC_IN_MINUTES * 60;
  const SEC_IN_DAYS = SEC_IN_HOURS * 24;
  const diffInSec = (+end.getTime() - start.getTime()) / 1000;

  const diffDays = Math.floor(diffInSec / SEC_IN_DAYS);
  const diffHours = Math.floor((diffInSec % SEC_IN_DAYS) / SEC_IN_HOURS);
  const diffMinutes = Math.floor((diffInSec % SEC_IN_HOURS) / SEC_IN_MINUTES);
  const diffSeconds = Math.floor(diffInSec / SEC_IN_MINUTES);

  return {
    d: diffDays,
    h: diffHours,
    m: diffMinutes,
    s: diffSeconds,
  };
}
