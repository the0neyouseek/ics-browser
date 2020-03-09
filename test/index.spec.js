import { expect } from 'chai'
import { createEvent, createEvents } from '../src'

const validAttributes = { title: 'Hello world', start: new Date('2000-10-05T05:00:00'), duration: { hours: 1 } }
const validAttributes2 = { start: new Date('2001-10-05T05:00:00'), duration: { hours: 1 } }
const validAttributes3 = { start: new Date('2002-10-05T05:00:00'), duration: { hours: 1 } }

describe('ics', () => {
  describe('.createEvent', () => {
    it('returns a node-style callback', (done) => {
      createEvent(validAttributes, (error, success) => {
        expect(error).not.to.exist
        expect(success).to.contain('DTSTART:20001005')
        expect(success).to.contain('SUMMARY:Hello')
        console.log(success, error);
        done()
      })
    })
  })

  describe('.createEvents', () => {
    it('returns an error when no arguments are passed', () => {
      const events = createEvents()
      expect(events.error).to.exist
    })
    it('writes begin and end calendar tags', () => {
      const { error, value } = createEvents([validAttributes])
      expect(error).to.be.null
      expect(value).to.contain('BEGIN:VCALENDAR')
      expect(value).to.contain('END:VCALENDAR')
    })

    describe('when no callback is provided', () => {
      it('returns an iCal string and a null error when passed valid events', () => {
        const { error, value } = createEvents([validAttributes, validAttributes2, validAttributes3])
        expect(error).to.be.null
        expect(value).to.contain('BEGIN:VCALENDAR')
      })
    })
    describe('when a callback is provided', () => {
      it('returns an iCal string as the second argument when passed valid events', (done) => {
        createEvents([validAttributes, validAttributes2, validAttributes3], (error, success) => {
          expect(error).not.to.exist
          expect(success).to.contain('BEGIN:VCALENDAR')
          done()
        })
      })
    })
  })
})