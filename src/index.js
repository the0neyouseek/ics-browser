import { v4 } from 'uuid'
import { formatEvent, buildEvent } from './pipeline'

function assignUniqueId(event) {
  event.uid = event.uid || v4()
  return event
}

function applyInitialFormatting({ error, value }) {
  if (error) {
    return { error, value: null }
  }

  return { error: null, value: formatEvent(value) }
}

function reformatEventsByPosition({ error, value }, idx, list) {
  if (error) return { error, value }

  if (idx === 0) {
    // beginning of list
    return { value: value.slice(0, value.indexOf('END:VCALENDAR')), error: null }
  }

  if (idx === list.length - 1) {
    // end of list
    return { value: value.slice(value.indexOf('BEGIN:VEVENT')), error: null}
  }

  return { error: null, value: value.slice(value.indexOf('BEGIN:VEVENT'), value.indexOf('END:VEVENT') + 12) }
}

function catenateEvents(accumulator, { error, value }, idx) {
  if (error) {
    accumulator.error = error
    accumulator.value = null
    return accumulator
  }

  if (accumulator.value) {
    accumulator.value = accumulator.value.concat(value)
    return accumulator
  }

  accumulator.value = value
  return accumulator
}

export function createEvent (attributes, cb) {
  if (!attributes) { Error('Attributes argument is required') }

  assignUniqueId(attributes)

  const value = buildEvent(attributes)
  let event = ''

  if (!cb) {
    // No callback, so return error or value in an object
    try {
      event = formatEvent(value)
    } catch(error) {
      return { error, value: null }
    }

    return { error: null, value: event }
  }

  try {
    event = formatEvent(value)
  } catch(error) {
    return cb(error)
  }

  return cb(null, event)
}

export function createEvents (events, cb) {
  if (!events) {
    return { error: Error('one argument is required'), value: null }
  }

  if (events.length === 1) {
    return createEvent(events[0], cb)
  }

  const { error, value } = events.map(assignUniqueId)
    .map(buildEvent)
    .map(applyInitialFormatting)
    .map(reformatEventsByPosition)
    .reduce(catenateEvents, { error: null, value: null })

  if (!cb) {
    return { error, value }
  }

  return cb(error, value)
}