import { createFileRoute } from '@tanstack/react-router'
import { LandingHeader } from '@/ui/blocks/header/landing-header'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <>
      <LandingHeader />

      <div className="text-center">LANDING PAGE</div>
    </>
  )
}
