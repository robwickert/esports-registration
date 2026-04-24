import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background image — right 60% */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 bottom-0 w-[70%]">
          <Image
            src="/fia-acr-rally-car-image-04.jpg"
            alt=""
            fill
            className="object-cover object-left"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, #f4f6f9 0%, rgba(244,246,249,0.7) 30%, rgba(244,246,249,0.2) 60%, rgba(244,246,249,0) 80%)',
            }}
          />
        </div>
      </div>

    <div className="relative mx-auto max-w-4xl px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="text-xs font-medium tracking-widest text-[var(--accent)] uppercase mb-3">
          Overview
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-[var(--foreground)] mb-4">
          Competition Information
        </h1>
        <p className="text-[var(--muted)]">
          Everything you need to know about the FIA Esports Global Rally Tour
        </p>
      </div>

      <div className="space-y-8">

        {/* About the Competition */}
        <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">About the Competition</h2>
          <div className="space-y-3 text-sm text-[var(--muted)] leading-relaxed">
            <p>
              The FIA Esports Global Rally Tour is one of the official sim racing Competitions organised under the authority of the Fédération Internationale de l'Automobile (FIA). It brings together the fastest virtual drivers from around the world to compete on equal terms in a globally accessible online qualifying format.
            </p>
            <p>
              The Competition is played on <a href="https://store.steampowered.com/app/3917090/Assetto_Corsa_Rally/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">Assetto Corsa Rally</a> and is open to competitors of all skill levels who meet the eligibility criteria. The top performers from each region will be invited to compete at live onsite Regional Shootout events. These Shootouts will serve as qualifiers for a Grand Final, featuring the world's top 16 Esports Rally drivers, scheduled to take place from 7 to 12 December 2026 during the FIA General Assemblies and FIA Awards in Shanghai, China.
            </p>
          </div>
        </section>

        {/* Format */}
        <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Competition Format</h2>
          <div className="space-y-3 text-sm text-[var(--muted)] leading-relaxed">
            <p>
              The Competition consists of an online qualifying phase followed by regional onsite finals. During the qualifying window, registered competitors set their best lap times on the official server. Times are logged automatically and displayed on the public leaderboard in real time.
            </p>
            <p>
              At the close of the qualifying window, the fastest drivers in each region — eight per region, sixteen for Europe — will receive an official invitation to their respective Regional Shootout, where they will compete live for the title.
            </p>
          </div>
        </section>

        {/* Schedule */}
        <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">2026 Schedule</h2>
          <div className="text-sm divide-y divide-[var(--border)]">
            {/* Registration Opens */}
            <div className="flex items-center justify-between gap-4 py-3">
              <span className="text-[var(--foreground)] font-medium">Registration Opens</span>
              <span className="text-[var(--muted)] text-right">28 April 2026 <span className="text-xs">(TBC)</span></span>
            </div>
            {/* Online Qualifying */}
            <div className="flex items-center justify-between gap-4 py-3">
              <span className="text-[var(--foreground)] font-medium">Online Qualifying Window</span>
              <span className="text-[var(--muted)] text-right">May 12 – May 25, 2026</span>
            </div>
            {/* Regional Shootouts */}
            <div className="py-3">
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="text-[var(--foreground)] font-medium">Regional Shootouts</span>
                <span className="text-[var(--muted)] text-right">June – October 2026</span>
              </div>
              <div className="ml-4 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                    <span className="text-[var(--foreground)] font-medium">Asia-Pacific</span>
                    <span className="text-[var(--muted)] text-xs">FIA Conference</span>
                  </div>
                  <span className="text-[var(--muted)] text-xs sm:text-right pl-3.5 sm:pl-0">22–24 June 2026 · Macau, SAR China</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-1.5">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                    <span className="text-[var(--foreground)] font-medium">Europe</span>
                    <span className="text-[var(--muted)] text-xs">2026 Simracing Expo</span>
                  </div>
                  <span className="text-[var(--muted)] text-xs sm:text-right pl-3.5 sm:pl-0">16–18 October 2026 · Frankfurt, Germany</span>
                </div>
              </div>
            </div>
            {/* Grand Final */}
            <div className="flex items-center justify-between gap-4 py-3">
              <span className="text-[var(--foreground)] font-medium">Grand Final</span>
              <span className="text-[var(--muted)] text-right">7–12 December 2026 · Shanghai, China</span>
            </div>
          </div>
        </section>

        {/* Regions */}
        <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Regions</h2>
          <div className="grid sm:grid-cols-2 gap-3 text-sm mb-4">
            {[
              'Europe',
              'North America',
              'South America',
              'Asia-Pacific',
              'Middle East and North Africa',
              'Africa',
            ].map((region) => (
              <div key={region} className="flex items-center gap-3 rounded-lg bg-[var(--background)] border border-[var(--border)] px-4 py-3">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)] shrink-0" />
                <span className="text-[var(--foreground)] font-medium">{region}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-[var(--muted)] leading-relaxed">
            The exact composition of each region can be found in Appendix 2 of the official Sporting Regulations.
          </p>
        </section>

        {/* Platform */}
        <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Platform &amp; Equipment</h2>
          <div className="space-y-3 text-sm text-[var(--muted)] leading-relaxed">
            <p>
              All competitive sessions are held on <a href="https://store.steampowered.com/app/3917090/Assetto_Corsa_Rally/" target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--accent)] hover:underline">Assetto Corsa Rally</a>, available on PC via Steam. Competitors must own a legitimate copy of the game purchased through the Steam platform.
            </p>
            <p>
              Any hardware setup is permitted — keyboard, gamepad, or wheel and pedal combination. There is no minimum hardware specification beyond the game's own system requirements, making the Competition accessible to as wide an audience as possible.
            </p>
          </div>
        </section>

      </div>
    </div>
    </div>
  )
}
