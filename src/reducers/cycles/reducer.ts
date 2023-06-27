import { produce } from 'immer'
import { Cycle } from '../../contexts/CyclesContexts'
import { ActionTypes } from './actions'

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export const cyclesReducer = (state: CyclesState, action: any) => {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      }
    // return produce(state, (draft) => {
    //   draft.cycles.push(action.payload.newCycle)
    //   draft.activeCycleId = action.payload.newCycle.id
    // })
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex((cycles) => {
        return cycles.id === state.activeCycleId
      })

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
      })
    }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      return {
        ...state,
        cycles: [
          state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, fineshedDate: new Date() }
            } else {
              return cycle
            }
          }),
        ],
      }
    default:
      return state
  }
}
