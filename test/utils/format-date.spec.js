import { formatDate } from '../../src/utils'
import { format } from 'date-fns';
import { expect } from 'chai'

describe('utils.formatDate', () => {
  it('defaults to local time input and UTC time output when no type passed', () => {
    const date = new Date('2017-07-16T16:22:30');
    const formattedDate = format(date, "yyyyMMdd'T'HHmm'00'") + 'Z'
    expect(formatDate(date)).to.equal(formattedDate)
  })
})
