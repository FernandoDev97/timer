import React, { useEffect } from 'react'
import { CountdownContainer, Separator } from './styles'

export const Countdown = () => {
  const [amountSecundsPassed, setAmoutSecundsPassed] = useState(0)

  const totalSecunds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifferents = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )
        if (secondsDifferents >= totalSecunds) {
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, fineshedDate: new Date() }
              } else {
                return cycle
              }
            }),
          )
          setAmoutSecundsPassed(totalSecunds)
          clearInterval(interval)
        } else {
          setAmoutSecundsPassed(secondsDifferents)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSecunds, activeCycleId])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
