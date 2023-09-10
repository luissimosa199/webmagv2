import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useMemo } from 'react'
import MainLayout from '@/components/layout/main-layout';

export default function App({ Component, pageProps }: AppProps) {

  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </Hydrate>
    </QueryClientProvider >
  )
}
