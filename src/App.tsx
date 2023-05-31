import styled, { ThemeProvider } from "styled-components"
import { defaultTheme } from "./styles/themes/default"
import { useState } from "react"

const Teste = styled.button`
  color: ${props => props.theme.primary};
  text-transform: uppercase;
  font-weight: 700;
  width: 180px;
  height: 40px;
  background-color: ${({ theme }) => theme.secundary};
  border-radius: 4px;
  border: none;
  cursor: pointer;
  margin: 8px;
  outline: none;
  &:hover {
    opacity: .7; 
  }
`

export const App = () => {
  const [count, setCount] = useState(0)

  function add () {
      setCount(count + 2 + 2 * 10 / 2  )
  }

  function sub () {
    if (count > 0) {
      setCount(count - 1)
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Teste onClick={sub}>Subtrair</Teste>
      <span>{count}</span>
      <Teste onClick={add}>Adicionar</Teste>
    </ThemeProvider>
  )
}
