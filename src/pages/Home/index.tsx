import { Play, Stop } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { useContext } from 'react'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import * as zod from 'zod'
import { CyclesContext } from '../../contexts/CyclesContexts'

const newYcleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo deve ser de no máximo 60 minutos'),
})

type NewCyleFormData = zod.infer<typeof newYcleFormValidationSchema>

export const Home = () => {
  const { activeCycle, createNewCycle, interruptedCurrentCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<NewCyleFormData>({
    // formState
    resolver: zodResolver(newYcleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function hnadleCreateNewCycle(data: NewCyleFormData) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(hnadleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />
        {activeCycle ? (
          <StopCountdownButton onClick={interruptedCurrentCycle} type="button">
            <Stop size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
