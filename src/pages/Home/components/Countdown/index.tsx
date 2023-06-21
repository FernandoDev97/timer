import { useContext, useEffect } from 'react'
import { CountdownContainer, Separator } from './styles'
import { CyclesContext } from '../..'
import { differenceInSeconds } from 'date-fns'

export const Countdown = () => {
  const {
    activeCycle,
    activeCycleId,
    amountSecundsPassed,
    handleFineshedCycle,
    setSecondsPassed,
  } = useContext(CyclesContext)

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
          handleFineshedCycle()
          setSecondsPassed(totalSecunds)
          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDifferents)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSecunds,
    activeCycleId,
    setSecondsPassed,
    handleFineshedCycle,
  ])

  const currentSecunds = activeCycle ? totalSecunds - amountSecundsPassed : 0

  const minutesAmount = Math.floor(currentSecunds / 60)
  const secundsAmout = currentSecunds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secundsAmout).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

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
