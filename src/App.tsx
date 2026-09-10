import { type FormEvent, type ReactNode, useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Bookmark,
  Check,
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
  Fingerprint,
  Heart,
  LockKeyhole,
  Mail,
  MapPin,
  Quote,
  RotateCcw,
  Sparkles,
  Wifi,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

const queryClient = new QueryClient();

// Duplicate this object to create a keepsake for another MDSL colleague.
const keepsakeContent = {
  accessCode: 'MDSL-26',
  recipient: {
    name: 'Dara',
    fullName: 'Dara Agunbiade',
    role: 'SIWES Intern',
    department: 'Technical Operations',
    location: 'Lagos, Nigeria',
    portrait: '/images/pic0.jpg',
  },
  intro:
    'As I say goodbye for now, I wanted to leave you a small record of what your support meant to me during my time at MDSL. I may be leaving as a student, but I am taking your lessons, patience, and kindness with me.',
  thankYou:
    'Thank you for welcoming me, answering my questions, correcting me with patience, and giving me the room to learn. Your support made my SIWES experience meaningful, and I will carry it with me as I grow.',
  moments: [
    {
      date: '01',
      label: 'My first day',
      title: 'You made a new place feel welcoming.',
      body: 'From my first day, you gave me the patience to settle in, ask questions, and learn without fear of getting things wrong.',
    },
    {
      date: '02',
      label: 'The lessons in between',
      title: 'You helped me see the work differently.',
      body: 'Through your explanations and the way you handled each challenge, I learned that good technical work is built on care, clarity, and teamwork.',
    },
    {
      date: '03',
      label: 'My last day—for now',
      title: 'I am leaving with more than I arrived with.',
      body: 'I am taking home the knowledge you shared, the confidence you helped me build, and the hope that I will return as a graduate intern one day.',
    },
  ],
  lessons: [
    {
      tag: 'Technical',
      number: '01',
      title: 'Understand before you act.',
      body: 'You taught me to slow down, ask the right questions, and understand the system before trying to fix it.',
    },
    {
      tag: 'Professional',
      number: '02',
      title: 'Make the next step clearer.',
      body: 'You showed me how good communication, careful documentation, and teamwork keep the work moving.',
    },
    {
      tag: 'Personal',
      number: '03',
      title: 'Stay teachable. Stay kind.',
      body: 'Your patience and generosity reminded me that the best professionals make room for others to learn.',
    },
  ],
  gallery: [
    {
      src: '/images/pic1.jpg',
      alt: 'Placeholder photo of colleagues collaborating around a table',
      caption: 'The good kind of busy',
    },
    {
      src: '/images/pic2.jpg',
      alt: 'Placeholder photo of a technical workspace',
      caption: 'Curiosity at work',
    },
    {
      src: '/images/pic3.jpg',
      alt: 'Placeholder photo of a team sharing an idea',
      caption: 'Better together',
    },
    {
      src: '/images/pic4.jpg',
      alt: 'Placeholder photo of a person working at a laptop',
      caption: 'The next chapter',
    },
  ],
  closing:
    'Thank you for the support you gave me throughout my six-month SIWES placement. As I bid you farewell for now, I hope you know how much I appreciate the time, knowledge, patience, and encouragement you shared with me. I hope to return in a year or two as a graduate intern, but until then, I will carry these lessons forward.',
  signature: 'With pride,',
  signedBy: 'Victor Utoo',
  sharedByline: 'Specially made by Victor Utoo as a thank-you for your support',
};

type UnlockStatus = 'idle' | 'error' | 'success';

function MDSLMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${compact ? 'scale-[.82] origin-left' : ''}`}>
      <img
        src="/mdsl-logo.png"
        alt="Multidigital Services Limited"
        className="h-11 w-11 object-contain"
        data-testid="img-mdsl-logo"
      />
      <div className="leading-none">
        <p className="font-semibold tracking-[-.03em] text-[hsl(var(--primary))]">MULTIDIGITAL</p>
        <p className="mono mt-1 text-[9px] tracking-[.22em] text-[hsl(var(--muted-foreground))]">
          SERVICES LIMITED
        </p>
      </div>
    </div>
  );
}

function TapMark({ active }: { active: boolean }) {
  return (
    <div className={`relative mx-auto flex h-40 w-40 items-center justify-center ${active ? 'tap-core' : ''}`}>
      <span className="tap-ripple absolute inset-4 rounded-full border border-[hsl(var(--secondary)/.62)]" />
      <span className="tap-ripple tap-ripple-delay absolute inset-4 rounded-full border border-[hsl(var(--secondary)/.48)]" />
      <span className="absolute inset-8 rounded-full border border-[hsl(var(--secondary)/.36)] bg-[hsl(var(--secondary)/.08)]" />
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[hsl(var(--secondary))] text-[hsl(var(--primary))] shadow-[0_12px_38px_rgba(248,157,38,.32)]">
        <Wifi size={32} strokeWidth={1.7} aria-hidden="true" />
        <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[hsl(var(--primary))] bg-[hsl(var(--secondary))]">
          <Fingerprint size={14} aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}

function UnlockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<UnlockStatus>('idle');
  const inputRef = useRef<HTMLInputElement>(null);

  const submitCode = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (code.trim().toUpperCase() === keepsakeContent.accessCode) {
      setStatus('success');
      window.setTimeout(onUnlock, 720);
      return;
    }
    setStatus('error');
  };

  const focusCode = () => inputRef.current?.focus();

  return (
    <main className="paper-grain relative flex min-h-[100dvh] items-center overflow-hidden bg-[hsl(39_44%_94%)] px-5 py-8 text-[hsl(var(--primary))] sm:px-8">
      <div className="pointer-events-none absolute -right-28 -top-32 h-80 w-80 rounded-full border-[28px] border-[hsl(var(--primary)/.1)] sm:h-[30rem] sm:w-[30rem]" />
      <div className="pointer-events-none absolute -bottom-44 -left-36 h-[28rem] w-[28rem] rounded-full border border-[hsl(var(--primary)/.12)]" />
      <div className="relative mx-auto w-full max-w-6xl">
        <header className="reveal flex items-center justify-between">
          <MDSLMark />
          <p className="eyebrow hidden text-[hsl(var(--primary)/.58)] sm:block">Private digital memento</p>
          <span className="flex items-center gap-2 text-[hsl(var(--primary)/.58)] sm:hidden">
            <LockKeyhole size={14} />
            <span className="mono text-[10px]">LOCKED</span>
          </span>
        </header>

        <div className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.05fr_.95fr] lg:gap-24 lg:py-24">
          <section className="reveal reveal-delay-1 max-w-xl">
            <p className="eyebrow mb-5 text-[hsl(var(--secondary))]">For {keepsakeContent.recipient.name} / 2026</p>
            <h1 className="serif max-w-lg text-[clamp(3.6rem,13vw,7.6rem)] leading-[.84] tracking-[-.055em]">
              A little
              <br />
              something
              <br />
              to keep.
            </h1>
            <p className="mt-7 max-w-md text-base leading-7 text-[hsl(var(--primary)/.72)] sm:text-lg">
              A private farewell from Victor Utoo, made especially to thank you for your support. Tap in when you are ready.
            </p>
            <div className="mt-8 flex items-center gap-3 text-[hsl(var(--primary)/.52)]">
              <ArrowDown size={16} />
              <span className="mono text-[10px] uppercase tracking-[.16em]">Your note is waiting below</span>
            </div>
          </section>

          <section className="reveal reveal-delay-2 rounded-[2rem] border border-[hsl(var(--primary)/.14)] bg-white/35 p-6 shadow-[0_18px_55px_rgba(22,43,69,.08)] backdrop-blur-sm sm:p-9">
            <button
              type="button"
              onClick={focusCode}
              className="focus-ring mb-2 block w-full cursor-pointer rounded-2xl"
              aria-label="Focus entry code field"
              data-testid="button-tap-to-unlock"
            >
              <TapMark active={status !== 'success'} />
            </button>
            <div className="text-center">
              <p className="mono text-[10px] uppercase tracking-[.19em] text-[hsl(var(--secondary-foreground))]">
                {status === 'success' ? 'Access granted' : 'Tap to open'}
              </p>
              <h2 className="serif mt-2 text-3xl">This one is just for you.</h2>
            </div>
            <form onSubmit={submitCode} className="mt-7">
              <label htmlFor="entry-code" className="mono mb-2 block text-[10px] uppercase tracking-[.15em] text-[hsl(var(--primary)/.62)]">
                Enter your keepsake code
              </label>
              <div className={`flex overflow-hidden rounded-xl border bg-[hsl(var(--primary)/.07)] transition-colors ${status === 'error' ? 'border-[hsl(var(--destructive))]' : status === 'success' ? 'border-[hsl(var(--secondary-foreground))]' : 'border-[hsl(var(--primary)/.2)] focus-within:border-[hsl(var(--secondary-foreground))]'}`}>
                <input
                  id="entry-code"
                  ref={inputRef}
                  value={code}
                  onChange={(event) => {
                    setCode(event.target.value);
                    if (status !== 'idle') setStatus('idle');
                  }}
                  placeholder="MDSL-24"
                  autoComplete="off"
                  className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-sm tracking-[.14em] text-[hsl(var(--primary))] outline-none placeholder:text-[hsl(var(--primary)/.42)]"
                  data-testid="input-entry-code"
                />
                <button
                  type="submit"
                  className="focus-ring flex items-center gap-2 bg-[hsl(var(--secondary))] px-4 text-sm font-semibold text-[hsl(var(--primary))] transition-transform hover:scale-[1.02] active:scale-[.98]"
                  data-testid="button-unlock-keepsake"
                >
                  Open <ArrowRight size={16} />
                </button>
              </div>
              <div className="mt-3 min-h-6">
                {status === 'error' ? (
                  <p className="flex items-center gap-2 text-xs text-[hsl(var(--destructive))]" role="alert" data-testid="status-unlock-error">
                    <RotateCcw size={13} /> That code did not open this keepsake. Try again.
                  </p>
                ) : status === 'success' ? (
                  <p className="flex items-center gap-2 text-xs font-medium text-[hsl(var(--secondary-foreground))]" role="status" data-testid="status-unlock-success">
                    <Check size={13} /> Welcome in. I made this for you.
                  </p>
                ) : (
                  <p className="flex items-center gap-2 text-xs text-[hsl(var(--primary)/.58)]" data-testid="text-code-hint">
                    <Sparkles size={13} /> Hint: it is printed on the card you received.
                  </p>
                )}
              </div>
            </form>
          </section>
        </div>

        <footer className="reveal reveal-delay-3 flex flex-col gap-3 border-t border-[hsl(var(--primary)/.14)] pt-5 text-[hsl(var(--primary)/.52)] sm:flex-row sm:items-center sm:justify-between">
          <span className="mono text-[9px] uppercase tracking-[.14em]">Victor Utoo / SIWES 2026</span>
          <span className="text-xs">Made to be opened slowly.</span>
        </footer>
      </div>
    </main>
  );
}

function SectionKicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${light ? 'text-[hsl(var(--secondary))]' : 'text-[hsl(var(--primary)/.62)]'}`}>
      <span className="h-px w-8 bg-current" />
      {children}
    </p>
  );
}

function KeepsakePage() {
  const [saved, setSaved] = useState(false);
  const [showFullNote, setShowFullNote] = useState(false);

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('.scroll-reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      }),
      { threshold: 0.12 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const saveKeepsake = () => {
    setSaved(true);
    window.setTimeout(() => window.print(), 180);
  };

  const scrollToStory = () => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <main className="paper-grain min-h-[100dvh] bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <div className="no-print sticky top-0 z-40 border-b border-[hsl(var(--border)/.75)] bg-[hsl(var(--background)/.9)] px-5 py-3 backdrop-blur-md sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <MDSLMark compact />
          <div className="flex items-center gap-2 sm:gap-5">
            <span className="mono hidden text-[9px] uppercase tracking-[.14em] text-[hsl(var(--muted-foreground))] sm:block">A keepsake for {keepsakeContent.recipient.name}</span>
            <button
              type="button"
              onClick={saveKeepsake}
              className="focus-ring flex items-center gap-2 rounded-full border border-[hsl(var(--primary)/.25)] px-3 py-2 text-xs font-semibold text-[hsl(var(--primary))] transition-colors hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] sm:px-4"
              data-testid="button-save-keepsake"
            >
              {saved ? <Check size={14} /> : <Download size={14} />}
              <span>{saved ? 'Print dialog open' : 'Save this keepsake'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <section className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[.82fr_1.18fr] lg:gap-20 lg:py-28">
          <div className="scroll-reveal relative mx-auto w-full max-w-md lg:mx-0">
            <div className="absolute -left-3 top-8 h-[82%] w-[92%] -rotate-6 rounded-[1.7rem] border border-[hsl(var(--secondary)/.62)] bg-[hsl(var(--accent))]" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.7rem] bg-[hsl(var(--muted))] shadow-[18px_22px_0_hsl(var(--primary)/.12)]">
              {/* Placeholder portrait media: replace with recipient photography in the content object. */}
              <img
                src={keepsakeContent.recipient.portrait}
                alt={`Placeholder portrait for ${keepsakeContent.recipient.fullName}`}
                className="h-full w-full object-cover grayscale-[.12]"
                data-testid="img-recipient-portrait"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary)/.72)] via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-[hsl(var(--primary-foreground))]">
                <div>
                  <p className="serif text-3xl">{keepsakeContent.recipient.fullName}</p>
                </div>
                <Heart size={20} fill="currentColor" className="mb-1 text-[hsl(var(--secondary))]" />
              </div>
            </div>
            <div className="absolute -bottom-5 -right-2 rounded-lg bg-[hsl(var(--secondary))] px-3 py-2 text-[hsl(var(--primary))] shadow-lg">
              <p className="mono text-[9px] font-medium uppercase tracking-[.12em]">MDSL / 2026</p>
            </div>
          </div>

          <div className="scroll-reveal reveal-delay-1">
            <SectionKicker>A note kept for you</SectionKicker>
            <h1 className="serif mt-6 text-[clamp(3.4rem,10vw,7.6rem)] leading-[.82] tracking-[-.06em] text-[hsl(var(--primary))]">
              You made
              <br />
              <span className="text-[hsl(var(--secondary-foreground))]">your mark.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-[hsl(var(--muted-foreground))]" data-testid="text-keepsake-intro">
              {keepsakeContent.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[hsl(var(--muted-foreground))]">
              <span className="flex items-center gap-2"><Sparkles size={14} className="text-[hsl(var(--secondary-foreground))]" /> {keepsakeContent.recipient.role}</span>
              <span className="flex items-center gap-2"><MapPin size={14} className="text-[hsl(var(--secondary-foreground))]" /> {keepsakeContent.recipient.location}</span>
              <span className="flex items-center gap-2"><FileText size={14} className="text-[hsl(var(--secondary-foreground))]" /> {keepsakeContent.recipient.department}</span>
            </div>
            <button type="button" onClick={scrollToStory} className="focus-ring group mt-10 flex items-center gap-3 text-sm font-semibold text-[hsl(var(--primary))]" data-testid="button-begin-story">
              Begin the story <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--secondary))] transition-transform group-hover:translate-x-1"><ChevronRight size={17} /></span>
            </button>
          </div>
        </section>

        <section className="scroll-reveal relative mb-16 overflow-hidden rounded-[1.7rem] bg-[hsl(var(--primary))] px-6 py-12 text-[hsl(var(--primary-foreground))] sm:mb-28 sm:px-14 sm:py-16">
          <Quote className="absolute -right-2 -top-3 h-40 w-40 text-[hsl(var(--secondary)/.12)]" strokeWidth={1} />
          <div className="relative max-w-3xl">
            <SectionKicker light>What I want you to know</SectionKicker>
            <blockquote className="serif mt-7 text-[clamp(2rem,5vw,4.1rem)] leading-[.98] tracking-[-.035em]" data-testid="text-thank-you">
              “{keepsakeContent.thankYou}”
            </blockquote>
            <div className="mt-9 flex items-center gap-3">
              <div className="h-px w-10 bg-[hsl(var(--secondary))]" />
              <span className="mono text-[10px] uppercase tracking-[.14em] text-[hsl(var(--primary-foreground)/.54)]">With gratitude, Victor Utoo</span>
            </div>
          </div>
        </section>

        <section id="story" className="scroll-reveal pb-20 sm:pb-32">
          <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
            <div>
              <SectionKicker>The moments I will remember</SectionKicker>
              <h2 className="serif mt-5 max-w-sm text-5xl leading-[.88] tracking-[-.045em] text-[hsl(var(--primary))] sm:text-6xl">A chapter in three beats.</h2>
              <p className="mt-6 max-w-xs text-sm leading-6 text-[hsl(var(--muted-foreground))]">Not everything important made it into a report. These are the moments I will carry with me.</p>
            </div>
            <div className="relative border-l border-[hsl(var(--border))] pl-6 sm:pl-10">
              <div className="absolute bottom-0 left-[-1px] top-0 w-px bg-gradient-to-b from-[hsl(var(--secondary))] to-transparent" />
              {keepsakeContent.moments.map((moment, index) => (
                <article key={moment.date} className="relative mb-10 last:mb-0" data-testid={`card-moment-${index + 1}`}>
                  <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-[hsl(var(--background))] bg-[hsl(var(--secondary))] sm:-left-[47px]" />
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="eyebrow text-[hsl(var(--secondary-foreground))]">{moment.label}</p>
                    <span className="mono text-[11px] text-[hsl(var(--muted-foreground))]">{moment.date} / 03</span>
                  </div>
                  <h3 className="serif mt-2 text-3xl leading-none text-[hsl(var(--primary))] sm:text-4xl">{moment.title}</h3>
                  <p className="mt-3 max-w-lg text-sm leading-6 text-[hsl(var(--muted-foreground))]">{moment.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="scroll-reveal -mx-5 bg-[hsl(var(--accent))] px-5 py-16 sm:-mx-8 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <SectionKicker>Lessons I am taking with me</SectionKicker>
                <h2 className="serif mt-5 text-5xl leading-[.86] tracking-[-.045em] text-[hsl(var(--primary))] sm:text-6xl">Keep these close.</h2>
              </div>
              <p className="max-w-xs text-sm leading-6 text-[hsl(var(--muted-foreground))]">A few lessons I am taking from the desk, the stand-up, and the moments in between.</p>
            </div>
            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              {keepsakeContent.lessons.map((lesson, index) => (
                <article key={lesson.number} className={`group rounded-[1.2rem] border border-[hsl(var(--border)/.8)] bg-[hsl(var(--card)/.8)] p-6 transition-transform duration-300 hover:-translate-y-1 ${index === 1 ? 'lg:translate-y-8' : ''}`} data-testid={`card-lesson-${index + 1}`}>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[hsl(var(--secondary)/.2)] px-3 py-1.5 mono text-[9px] uppercase tracking-[.14em] text-[hsl(var(--secondary-foreground))]">{lesson.tag}</span>
                    <span className="mono text-xs text-[hsl(var(--muted-foreground))]">{lesson.number}</span>
                  </div>
                  <h3 className="serif mt-14 text-3xl leading-[.92] tracking-[-.02em] text-[hsl(var(--primary))]">{lesson.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-[hsl(var(--muted-foreground))]">{lesson.body}</p>
                  <div className="mt-8 h-px w-8 bg-[hsl(var(--secondary))] transition-all duration-300 group-hover:w-16" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="scroll-reveal py-20 sm:py-32">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <SectionKicker>Scenes from the season</SectionKicker>
              <h2 className="serif mt-5 text-5xl leading-[.86] tracking-[-.045em] text-[hsl(var(--primary))] sm:text-6xl">The work between the work.</h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-[hsl(var(--muted-foreground))]">A visual placeholder for the memories I will keep from our time together.</p>
          </div>
          <div className="gallery-scroll mt-10 flex snap-x gap-4 overflow-x-auto pb-4">
            {keepsakeContent.gallery.map((image, index) => (
              <figure key={image.src} className={`group relative min-w-[78vw] snap-start overflow-hidden rounded-[1.25rem] bg-[hsl(var(--muted))] sm:min-w-[310px] ${index % 2 === 1 ? 'mt-8' : ''}`} data-testid={`figure-gallery-${index + 1}`}>
                {/* Placeholder gallery media: replace these Pexels URLs with real MDSL photos. */}
                <img src={image.src} alt={image.alt} className="aspect-[4/5] w-full object-cover grayscale-[.18] transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary)/.78)] via-transparent to-transparent opacity-90" />
                <figcaption className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-sm text-[hsl(var(--primary-foreground))]">
                  <span>{image.caption}</span>
                  <span className="mono text-[10px] text-[hsl(var(--secondary))]">0{index + 1}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="scroll-reveal border-t border-[hsl(var(--border))] py-20 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:gap-24">
            <div>
              <SectionKicker>A note for the road</SectionKicker>
              <h2 className="serif mt-6 max-w-2xl text-[clamp(3rem,7vw,6rem)] leading-[.85] tracking-[-.055em] text-[hsl(var(--primary))]" data-testid="text-closing-note">
                I will carry
                <br />
                <span className="text-[hsl(var(--secondary-foreground))]">this with me.</span>
              </h2>
              <div className={`mt-8 max-w-xl text-base leading-8 text-[hsl(var(--muted-foreground))] ${showFullNote ? '' : 'line-clamp-3'}`}>
                {keepsakeContent.closing}
              </div>
              <button type="button" onClick={() => setShowFullNote(!showFullNote)} className="focus-ring mt-4 text-xs font-semibold text-[hsl(var(--primary))] underline decoration-[hsl(var(--secondary))] decoration-2 underline-offset-4" data-testid="button-toggle-closing-note">
                {showFullNote ? 'Show a little less' : 'Read the full note'}
              </button>
            </div>
            <div className="flex flex-col justify-end lg:pb-2">
              <div className="border-l-2 border-[hsl(var(--secondary))] pl-5">
                <p className="serif text-3xl leading-none text-[hsl(var(--primary))]">{keepsakeContent.signature}</p>
                <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">{keepsakeContent.signedBy}</p>
              </div>
              <div className="mt-10 flex items-center gap-3 text-[hsl(var(--muted-foreground))]">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--secondary)/.18)]"><Bookmark size={16} className="text-[hsl(var(--secondary-foreground))]" /></div>
                <p className="text-xs leading-5">{keepsakeContent.sharedByline}<br /><span className="mono text-[9px] uppercase tracking-[.12em]">MDSL / SIWES 2026</span></p>
              </div>
            </div>
          </div>
        </section>

        <footer className="no-print border-t border-[hsl(var(--border))] py-10">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <MDSLMark />
              <p className="mt-5 max-w-sm text-xs leading-5 text-[hsl(var(--muted-foreground))]">I made this digital memento to thank you for making my time here matter. I will keep the link and the lessons.</p>
            </div>
            <div className="grid gap-4 text-xs text-[hsl(var(--muted-foreground))] sm:grid-cols-3 sm:gap-10">
              <a href="https://wa.me/2349046924649" target="_blank" rel="noreferrer" className="focus-ring text-left transition-colors hover:text-[hsl(var(--primary))]" data-testid="link-whatsapp-contact">
                <span className="mono block text-[9px] uppercase tracking-[.12em] text-[hsl(var(--secondary-foreground))]">WhatsApp</span>
                +234 904 692 4649 <ExternalLink size={12} className="ml-1 inline" />
              </a>
              <a href="https://www.linkedin.com/in/victorutoo" target="_blank" rel="noreferrer" className="focus-ring text-left transition-colors hover:text-[hsl(var(--primary))]" data-testid="link-linkedin">
                <span className="mono block text-[9px] uppercase tracking-[.12em] text-[hsl(var(--secondary-foreground))]">LinkedIn</span>
                victorutoo <ExternalLink size={12} className="ml-1 inline" />
              </a>
              <a href="mailto:victorutoo@gmail.com" className="focus-ring flex items-start gap-2 text-left transition-colors hover:text-[hsl(var(--primary))]" data-testid="link-email">
                <Mail size={14} className="mt-0.5 text-[hsl(var(--secondary-foreground))]" />
                <span><span className="mono block text-[9px] uppercase tracking-[.12em] text-[hsl(var(--secondary-foreground))]">Email</span>victorutoo@gmail.com</span>
              </a>
            </div>
          </div>
          <div className="mt-10 flex flex-col justify-between gap-2 border-t border-[hsl(var(--border)/.7)] pt-5 text-[10px] text-[hsl(var(--muted-foreground))] sm:flex-row">
            <span>© 2026 Multidigital Services Limited</span>
            <span className="mono uppercase tracking-[.12em]">Built to be remembered</span>
          </div>
        </footer>
      </div>
    </main>
  );
}

function Home() {
  const [unlocked, setUnlocked] = useState(false);
  return unlocked ? <KeepsakePage /> : <UnlockScreen onUnlock={() => setUnlocked(true)} />;
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const location = useLocation();
  return <ErrorBoundary resetKey={location.pathname}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;