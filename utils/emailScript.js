const DayZeroGmail = require('./DayZeroGmail')

const message =
  'This is a test message that hopefully no one but me should see :)'
const mail = new DayZeroGmail()

mail.send('hollism@princeton.edu', 'Account Verification', message)