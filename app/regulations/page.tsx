export default function RegulationsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="text-xs font-medium tracking-widest text-[var(--accent)] uppercase mb-3">
          Official Document
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          Competition Regulations
        </h1>
        <p className="text-[var(--muted)]">
          2026 FIA Motorsport Games Esports — Assetto Corsa Rally
        </p>
      </div>

      <div className="space-y-10 text-[var(--muted)] leading-relaxed">
        {/* Article 1 */}
        <article className="border border-[var(--border)] rounded-lg bg-[var(--surface)] p-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="text-[var(--accent)] font-mono text-sm">ART. 1</span>
            General Provisions
          </h2>
          <div className="space-y-3 text-sm">
            <p>
              <strong className="text-white">1.1</strong> The 2026 FIA Motorsport Games Esports
              Championship (hereinafter "the Championship") is organized under the authority of the
              Fédération Internationale de l'Automobile (FIA) and its affiliated national sporting
              authorities (ASNs).
            </p>
            <p>
              <strong className="text-white">1.2</strong> The Championship is open to all licensed
              drivers who are registered with a national federation affiliated to the FIA and who
              meet the eligibility criteria set out in these regulations.
            </p>
            <p>
              <strong className="text-white">1.3</strong> By entering the Championship, all
              participants agree to be bound by these regulations, the FIA International Sporting
              Code, and any supplementary regulations issued by the organizers.
            </p>
          </div>
        </article>

        {/* Article 2 */}
        <article className="border border-[var(--border)] rounded-lg bg-[var(--surface)] p-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="text-[var(--accent)] font-mono text-sm">ART. 2</span>
            Eligibility
          </h2>
          <div className="space-y-3 text-sm">
            <p>
              <strong className="text-white">2.1</strong> Competitors must be at least 16 years of
              age at the time of registration.
            </p>
            <p>
              <strong className="text-white">2.2</strong> Each competitor may only represent one
              nation and must be a national of, or ordinarily resident in, the country they
              represent.
            </p>
            <p>
              <strong className="text-white">2.3</strong> A valid Steam account is required to
              participate. The Steam ID provided during registration must be the account used in
              all competition sessions. Any discrepancy may result in disqualification.
            </p>
            <p>
              <strong className="text-white">2.4</strong> One registration per person is permitted.
              Multiple registrations will result in all entries being void.
            </p>
          </div>
        </article>

        {/* Article 3 */}
        <article className="border border-[var(--border)] rounded-lg bg-[var(--surface)] p-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="text-[var(--accent)] font-mono text-sm">ART. 3</span>
            Technical Requirements
          </h2>
          <div className="space-y-3 text-sm">
            <p>
              <strong className="text-white">3.1</strong> The official simulation platform is
              Assetto Corsa Rally (PC). The game must be purchased legitimately through the Steam
              platform.
            </p>
            <p>
              <strong className="text-white">3.2</strong> Any hardware setup is permitted, including
              keyboard, gamepad, and wheel/pedal combinations. There is no minimum hardware
              specification requirement beyond the game's system requirements.
            </p>
            <p>
              <strong className="text-white">3.3</strong> The use of any third-party software that
              modifies game physics, provides unfair performance advantages, or automates driving
              inputs is strictly prohibited and will result in immediate disqualification.
            </p>
            <p>
              <strong className="text-white">3.4</strong> All race sessions will use the official
              game servers. Server settings will be provided prior to each event.
            </p>
          </div>
        </article>

        {/* Article 4 */}
        <article className="border border-[var(--border)] rounded-lg bg-[var(--surface)] p-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="text-[var(--accent)] font-mono text-sm">ART. 4</span>
            Race Categories
          </h2>
          <div className="space-y-3 text-sm">
            <p>
              <strong className="text-white">4.1 Formula 4 (F4)</strong> — All competitors in the
              F4 category will drive the Tatuus F4-T421. Identical machinery ensures competition
              is decided purely on driver skill.
            </p>
            <p>
              <strong className="text-white">4.2 Gran Turismo (GT)</strong> — The GT category
              features a selection of GT3-class vehicles from multiple manufacturers. Vehicle
              selection will be confirmed prior to the season start.
            </p>
            <p>
              <strong className="text-white">4.3</strong> Competitors may register for only one
              category per championship season.
            </p>
          </div>
        </article>

        {/* Article 5 */}
        <article className="border border-[var(--border)] rounded-lg bg-[var(--surface)] p-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="text-[var(--accent)] font-mono text-sm">ART. 5</span>
            Sporting Code &amp; Conduct
          </h2>
          <div className="space-y-3 text-sm">
            <p>
              <strong className="text-white">5.1</strong> All competitors are expected to behave
              with sportsmanship and respect toward other participants, officials, and the
              platform.
            </p>
            <p>
              <strong className="text-white">5.2</strong> Deliberate collisions, unsportsmanlike
              conduct, or any form of cheating will result in penalties up to and including
              permanent exclusion from the championship.
            </p>
            <p>
              <strong className="text-white">5.3</strong> A stewards panel will adjudicate any
              incidents reported during the championship. The stewards' decisions are final.
            </p>
            <p>
              <strong className="text-white">5.4</strong> Competitors are responsible for
              maintaining a stable internet connection. Technical issues on the competitor's side
              are not grounds for a re-run.
            </p>
          </div>
        </article>

        {/* Article 6 */}
        <article className="border border-[var(--border)] rounded-lg bg-[var(--surface)] p-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="text-[var(--accent)] font-mono text-sm">ART. 6</span>
            Scoring &amp; Points System
          </h2>
          <div className="space-y-3 text-sm">
            <p>
              <strong className="text-white">6.1</strong> Points are awarded to the top 10
              finishers in each race event as follows:
            </p>
            <div className="mt-3 grid grid-cols-5 gap-2 text-center text-xs font-mono">
              {[
                ['P1', '25'], ['P2', '18'], ['P3', '15'], ['P4', '12'], ['P5', '10'],
                ['P6', '8'],  ['P7', '6'],  ['P8', '4'],  ['P9', '2'],  ['P10','1'],
              ].map(([pos, pts]) => (
                <div key={pos} className="rounded bg-[var(--surface-2)] p-2">
                  <div className="text-[var(--accent)] font-bold">{pos}</div>
                  <div className="text-white">{pts} pts</div>
                </div>
              ))}
            </div>
            <p className="mt-3">
              <strong className="text-white">6.2</strong> An additional point is awarded for the
              fastest lap, provided the driver finishes in the top 10.
            </p>
          </div>
        </article>

        {/* Article 7 */}
        <article className="border border-[var(--border)] rounded-lg bg-[var(--surface)] p-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="text-[var(--accent)] font-mono text-sm">ART. 7</span>
            Data Protection
          </h2>
          <div className="space-y-3 text-sm">
            <p>
              <strong className="text-white">7.1</strong> Personal data collected during
              registration is processed in accordance with the FIA Privacy Policy and applicable
              data protection legislation.
            </p>
            <p>
              <strong className="text-white">7.2</strong> Competitors may opt-in to receive
              marketing communications and/or have their data used for profiling purposes. These
              consents are optional and do not affect eligibility to participate.
            </p>
            <p>
              <strong className="text-white">7.3</strong> Name and nationality of competitors
              may be published on official leaderboards and results.
            </p>
          </div>
        </article>
      </div>

      {/* Accept CTA */}
      <div className="mt-12 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/5 p-8 text-center">
        <p className="text-white font-medium mb-2">Ready to compete?</p>
        <p className="text-[var(--muted)] text-sm mb-6">
          By registering you confirm you have read and accept these regulations.
        </p>
        <a
          href="/register"
          className="inline-flex items-center gap-2 rounded bg-[var(--accent)] px-8 py-3 text-sm font-bold text-white tracking-wide uppercase hover:bg-[var(--accent-hover)] transition-colors"
        >
          Register Now
        </a>
      </div>
    </div>
  )
}
