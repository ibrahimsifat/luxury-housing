import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutUsPage } from "@/components/about-us-page"

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AboutUsPage />
      <Footer />
    </div>
  )
}
