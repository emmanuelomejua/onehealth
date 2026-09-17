import Routes from "./routes/Routes"
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {

  const queryClient = new QueryClient()

  return (
    <main>
      <QueryClientProvider client={queryClient}>
        <Routes/>
        <Toaster position="top-center"/>
      </QueryClientProvider>
    </main>
  )
}

export default App
