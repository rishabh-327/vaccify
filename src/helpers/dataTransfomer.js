import { DateTime } from 'luxon'

const getDatewiseAppointments = centers => {
  const datewiseCenters = {}

  for (let center of centers) {
    const datewiseSessions = {}

    const vaccinationFees = {}
    if (center.vaccine_fees) {
      for (let vaccine of center.vaccine_fees) {
        vaccinationFees[vaccine.vaccine] = vaccine.fee
      }
    }

    for (let session of center.sessions) {
      if (!datewiseSessions[session.date]) datewiseSessions[session.date] = []
      datewiseSessions[session.date].push({
        ...session,
        fee: vaccinationFees[session.vaccine],
      })
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
      date: DateTime.fromFormat(date, 'dd-MM-yyyy').toFormat('d MMM yyyy, ccc'),
      centers: datewiseCenters[date].sort(
        (a, b) => a.sessions.length - b.sessions.length
      ),
    })
  }
  return datewiseCentersList
}

export { getDatewiseAppointments }
