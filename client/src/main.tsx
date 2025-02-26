import { Provider } from "@/components/ui/provider"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Center, Flex } from "@chakra-ui/react"

// Create a TanStack query client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <Flex width={"100vw"} height={"100vh"} alignContent={"center"} justifyContent={"center"}>
          <Center>
            <App />
          </Center>
        </Flex>
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
)
