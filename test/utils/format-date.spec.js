import { formatDate } from '../../src/utils'
import { expect } from 'chai'

describe('utils.formatDate', () => {
  it('defaults to local time input and UTC time output when no type passed', () => {
    const date = new Date('2017-07-16T16:22:30');
    const formattedDate = "20170716T162230Z"
    expect(formatDate(date)).to.equal(formattedDate)
  })
})
