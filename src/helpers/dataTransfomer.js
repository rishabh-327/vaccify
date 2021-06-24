import { DateTime } from 'luxon'

const getDatewiseAppointments = centers => {
  const datewiseCenters = {}

  for (let center of centers) {
    const datewiseSessions = {}

    for (let session of center.sessions) {
      if (!datewiseSessions[session.date]) datewiseSessions[session.date] = []
      datewiseSessions[session.date].push(session)
    }

    for (let date in datewiseSessions) {
      if (!datewiseCenters[date]) datewiseCenters[date] = []
      datewiseCenters[date].push({
        ...center,
        sessions: [...datewiseSessions[date]],
      })
    }
  }

  const datewiseCentersList = []
  for (let date in datewiseCenters) {
    datewiseCentersList.push({
      date: DateTime.fromFormat(date, 'dd-mm-yyyy').toFormat('d MMM yyyy, ccc'),
      centers: datewiseCenters[date].sort(
        (a, b) => a.sessions.length - b.sessions.length
      ),
    })
  }
  return datewiseCentersList
}

export { getDatewiseAppointments }
