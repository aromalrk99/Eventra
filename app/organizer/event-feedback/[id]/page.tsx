"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useStore } from "@/lib/store"
import { ArrowLeft, Star } from "lucide-react"

export default function EventFeedbackPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { currentUser, feedback, events } = useStore()
  const event = events.find((e) => e.id === params.id)
  const eventFeedback = feedback.filter((f) => f.eventId === params.id)

  if (!currentUser || currentUser.role !== "organizer") {
    router.push("/login")
    return null
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Event not found</h1>
          <Link href="/organizer/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  const avgRating =
    eventFeedback.length > 0
      ? (eventFeedback.reduce((sum, f) => sum + f.rating, 0) / eventFeedback.length).toFixed(1)
      : 0

  return (
    <div className="min-h-screen bg-muted-light">
      {/* Navigation */}
      <nav className="border-b border-border bg-background sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            Eventra
          </Link>
          <Link href="/organizer/dashboard">
            <Button variant="outline" size="sm">
              Dashboard
            </Button>
          </Link>
        </div>
      </nav>

      <div className="container py-12">
        <Link href="/organizer/dashboard" className="flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(Number(avgRating)) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-bold">{avgRating} / 5</span>
            <span className="text-muted">({eventFeedback.length} reviews)</span>
          </div>
        </div>

        <div className="space-y-4">
          {eventFeedback.length > 0 ? (
            eventFeedback.map((review) => (
              <Card key={review.id} className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-bold">{review.userName}</p>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-muted">{review.date}</span>
                </div>
                <p className="text-muted">{review.comment}</p>
              </Card>
            ))
          ) : (
            <Card className="p-12 text-center">
              <p className="text-muted">No feedback yet for this event</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
