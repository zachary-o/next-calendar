import { CalendarContainer, Container } from "@/components/shared"
import { Suspense } from "react"

export default function Home() {
  return (
    <Suspense>
      <Container>
        <CalendarContainer />
      </Container>
    </Suspense>
  )
}
