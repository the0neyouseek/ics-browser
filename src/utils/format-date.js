import { format } from 'date-fns-tz';

export default function formatDate(date = Date.now()) {
  return format(date, "yyyyMMdd'T'HHmmssX", { timeZone: 'UTC' });
}