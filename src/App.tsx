import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen bg-gray-900 text-white">
        <p className="m-auto text-gray-400">Loading bus tracker…</p>
      </div>
    </QueryClientProvider>
  )
}
