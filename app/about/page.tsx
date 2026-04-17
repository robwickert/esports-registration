export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
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

        {/* About the championship */}
        <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">About the Championship</h2>
          <div className="space-y-3 text-sm text-[var(--muted)] leading-relaxed">
            <p>
              The FIA Esports Global Rally Tour is the official sim racing championship organised under the authority of the Fédération Internationale de l'Automobile (FIA). It brings together the fastest virtual drivers from around the world to compete on equal terms in a globally accessible online qualifying format.
            </p>
            <p>
              The championship is played on <a href="https://store.steampowered.com/app/3917090/Assetto_Corsa_Rally/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">Assetto Corsa Rally</a> and is open to competitors of all skill levels who meet the eligibility criteria. The top performers from each region will be invited to compete at live onsite Regional Shootout events.
            </p>
          </div>
        </section>

        {/* Format */}
        <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Competition Format</h2>
          <div className="space-y-3 text-sm text-[var(--muted)] leading-relaxed">
            <p>
              The championship consists of an online qualifying phase followed by regional onsite finals. During the qualifying window, registered competitors set their best lap times on the official server. Times are logged automatically and displayed on the public leaderboard in real time.
            </p>
            <p>
              At the close of the qualifying window, the fastest drivers in each region — eight per region, sixteen for Europe — will receive an official invitation to their respective Regional Shootout, where they will compete live for the title.
            </p>
          </div>
        </section>

        {/* Schedule */}
        <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">2026 Schedule</h2>
          <div className="space-y-4 text-sm">
            {[
              { phase: 'Registration Opens', date: 'TBC' },
              { phase: 'Online Qualifying Window', date: 'May 12 – May 25, 2026' },
              { phase: 'Regional Shootouts', date: 'TBC' },
              { phase: 'Grand Final', date: 'TBC' },
            ].map(({ phase, date }) => (
              <div key={phase} className="flex items-center justify-between gap-4 py-2 border-b border-[var(--border)] last:border-0">
                <span className="text-[var(--foreground)] font-medium">{phase}</span>
                <span className="text-[var(--muted)] text-right">{date}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Regions */}
        <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Regions</h2>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            {[
              'Europe',
              'Americas',
              'Asia-Pacific',
              'Middle East & Africa',
            ].map((region) => (
              <div key={region} className="flex items-center gap-3 rounded-lg bg-[var(--background)] border border-[var(--border)] px-4 py-3">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)] shrink-0" />
                <span className="text-[var(--foreground)] font-medium">{region}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Platform */}
        <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Platform &amp; Equipment</h2>
          <div className="space-y-3 text-sm text-[var(--muted)] leading-relaxed">
            <p>
              All competitive sessions are held on <a href="https://store.steampowered.com/app/3917090/Assetto_Corsa_Rally/" target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--accent)] hover:underline">Assetto Corsa Rally</a>, available on PC via Steam. Competitors must own a legitimate copy of the game purchased through the Steam platform.
            </p>
            <p>
              Any hardware setup is permitted — keyboard, gamepad, or wheel and pedal combination. There is no minimum hardware specification beyond the game's own system requirements, making the championship accessible to as wide an audience as possible.
            </p>
          </div>
        </section>

      </div>
    </div>
  )
}
