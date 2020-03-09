import { v1 } from 'uuid';
import { formatDate } from './utils'

const defaults = {
  title: 'Untitled event',
  productId: 'the0neyouseek/ics',
  method: 'PUBLISH',
  uid: v1(),
  timestamp: formatDate(),
  start: Date.now()
}

export default defaults
