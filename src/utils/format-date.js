import { format } from 'date-fns';

export default function formatDate(date = Date.now()) {
  return format(date, "yyyyMMdd'T'HHmm'00'") + 'Z';
}