import PublicHeader from "./components/PublicHeader";
import PublicFooter from "./components/PublicFooter";
import heroImage from "./assets/hero-ui.png";
import FeatureImage from "./assets/feature.png"
import ProgressImage from "./assets/progress.png";
import { useState } from "react";
import {
  ListChecks,
  BarChart3,
  Bell,
  Smartphone,
  CheckCircle2,
  Pencil,
  LayoutGrid,
  Activity,
  Check,
  User,
  GraduationCap,
  Users,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";

export default function App() {
  return (
    <div className="bg-neutral-white text-neutral-darkest">
      <PublicHeader />
      <HeroSection />
      <TrustSection />
      <FeaturesSection />
      <FeatureDeepDiveOne />
      <FeatureDeepDiveTwo />
      <WorkflowSection />
      <UseCasesSection />
      <MetricsSection />
      <SecuritySection />
      <FAQSection />
      <CTASection />
      <PublicFooter />
    </div>
  );
}
function HeroSection() {
  return (
    <section className="border-b border-neutral-light">
      <div className="max-w-7xl mx-auto px-6 py-28 grid lg:grid-cols-2 gap-20 items-center">

        <div className="space-y-8">
          <h1 className="font-heading text-5xl lg:text-6xl font-bold leading-[1.1]">
            Task management <br />
            built for <span className="text-primary">real focus</span>
          </h1>

          <p className="font-body text-lg text-neutral-dark max-w-xl leading-relaxed">
            TodoPro helps you plan, prioritize, and finish work without
            distractions. A clean interface, thoughtful interactions, and
            powerful organization — all in one place.
          </p>

          <div className="flex gap-4">
            <a
              href="/signup"
              className="px-7 py-3 rounded-xl bg-primary text-neutral-white font-body font-semibold hover:bg-primary-hover transition"
            >
              Get started free
            </a>

            <a
              href="/login"
              className="px-7 py-3 rounded-xl border border-neutral-light font-body font-medium hover:bg-neutral-light transition"
            >
              Sign in
            </a>
          </div>
        </div>

        {/* Calm visual block */}
        <div className="rounded-3xl border border-neutral-light bg-neutral-light p-8 flex justify-center">
          <img
            src={heroImage}
            alt="TodoPro task management dashboard"
            className="rounded-2xl bg-neutral-white shadow-sm w-full max-w-xl"
          />
        </div>
      </div>
    </section>
  );
}
function TrustSection() {
  return (
    <section className="border-t border-neutral-light">
      <div className="max-w-7xl mx-auto px-6 py-20 text-center space-y-6">
        <p className="font-body text-sm text-neutral-dark  tracking-wide">
          Designed for people who value clarity and focus
        </p>

        <div className="flex flex-wrap justify-center gap-10 font-heading text-neutral-dark/90 font-medium">
          <span>Developers</span>
          <span>Students</span>
          <span>Freelancers</span>
          <span>Remote teams</span>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: "Clear task organization",
      desc: "Group tasks, set priorities, and stay focused on what matters most.",
      icon: ListChecks,
    },
    {
      title: "Built-in progress tracking",
      desc: "See how much you’ve completed and what’s still pending — at a glance.",
      icon: BarChart3,
    },
    {
      title: "Smart reminders",
      desc: "Never miss deadlines with flexible reminders that fit your schedule.",
      icon: Bell,
    },
    {
      title: "Responsive by design",
      desc: "Works beautifully on desktop, tablet, and mobile.",
      icon: Smartphone,
    },
  ];

  return (
    <section className="bg-neutral-light">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="font-heading text-4xl font-bold text-center mb-16">
          Everything you need to stay productive
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl bg-neutral-white border border-neutral-light p-6 space-y-5 transition hover:border-primary/40"

            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 ring-1 ring-primary/10 text-primary flex items-center justify-center">
                <f.icon className="w-5 h-5" />
              </div>

              <h3 className="font-heading font-semibold leading-tight">
                {f.title}
              </h3>

              <p className="font-body text-sm text-neutral-dark leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
function FeatureDeepDiveOne() {
  return (
    <section>
      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h3 className="font-heading text-3xl font-semibold leading-tight">
            Focused task views
          </h3>

          <p className="font-body text-neutral-dark leading-relaxed">
            TodoPro removes visual clutter so you can concentrate on what
            actually needs to be done today.
          </p>

          <ul className="space-y-2 font-body text-neutral-dark">
            {[
              "Clear priorities",
              "Minimal task cards",
              "No unnecessary distractions",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-neutral-light bg-neutral-light p-2 shadow-sm flex justify-center">
          <img
            src={FeatureImage}
            alt="TodoPro task management dashboard"
            className="rounded-2xl bg-neutral-white shadow-sm w-full max-w-2xl"
          />
        </div>
      </div>

    </section>
  );
}

function FeatureDeepDiveTwo() {
  return (
    <section className="bg-neutral-light">
      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        <div className="rounded-3xl border border-neutral-light bg-neutral-white p-2 shadow-sm flex justify-center">
          <img
            src={ProgressImage}
            alt="TodoPro task management dashboard"
            className="rounded-2xl bg-neutral-white shadow-sm w-full max-w-2xl"
          />
        </div>
        <div className="order-1 lg:order-2 space-y-6">
          <h3 className="font-heading text-3xl font-semibold">
            Progress you can actually understand
          </h3>
          <p className="font-body text-neutral-dark leading-relaxed">
            See how much work you’ve completed and what’s still pending,
            without charts that confuse more than they help.
          </p>
        </div>
      </div>
    </section>
  );
}

function WorkflowSection() {
  const steps = [
    { text: "Create tasks with clear priorities", icon: Pencil },
    { text: "Organize your daily work", icon: LayoutGrid },
    { text: "Track progress automatically", icon: Activity },
    { text: "Finish work with confidence", icon: Check },
  ];


  return (
    <section>
      <div className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="font-heading text-4xl font-bold text-center mb-16">
          How TodoPro fits into your day
        </h2>

        <div className="grid md:grid-cols-4 gap-10">
          {steps.map((step) => (
            <div key={step.text} className="text-center space-y-5">
              <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <step.icon className="w-6 h-6" />
              </div>

              <p className="font-body text-neutral-dark">
                {step.text}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  const cases = [
    {
      title: "For personal productivity",
      desc: "Manage daily tasks, habits and personal goals with clarity.",
      icon: User,
    },
    {
      title: "For students",
      desc: "Track assignments, deadlines and study plans effortlessly.",
      icon: GraduationCap,
    },
    {
      title: "For teams",
      desc: "Coordinate work, track progress and stay aligned.",
      icon: Users,
    },
  ];


  return (
    <section className="bg-neutral-light">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="font-heading text-4xl font-bold text-center mb-16">
          Built for every kind of workflow
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {cases.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-neutral-light bg-neutral-white p-6 space-y-4"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <c.icon className="w-5 h-5" />
              </div>

              <h3 className="font-heading font-semibold">
                {c.title}
              </h3>

              <p className="font-body text-neutral-dark">
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricsSection() {
  return (
    <section>
      <div className="max-w-7xl mx-auto px-6 py-24 grid sm:grid-cols-3 gap-12 text-center">

        <div>
          <p className="font-heading text-4xl font-bold text-primary">90%</p>
          <p className="font-body text-neutral-dark mt-2">
            tasks completed on time
          </p>
        </div>

        <div>
          <p className="font-heading text-4xl font-bold text-primary">2×</p>
          <p className="font-body text-neutral-dark mt-2">
            faster daily planning
          </p>
        </div>

        <div>
          <p className="font-heading text-4xl font-bold text-primary">0</p>
          <p className="font-body text-neutral-dark mt-2">
            unnecessary distractions
          </p>
        </div>

      </div>
    </section>
  );
}

function SecuritySection() {
  return (
    <section className="bg-neutral-light">
      <div className="max-w-7xl mx-auto px-6 py-24 text-center space-y-6">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <h2 className="font-heading text-3xl font-bold">
            Secure, reliable and built to last
          </h2>
        </div>


        <p className="font-body text-neutral-dark max-w-2xl mx-auto">
          TodoPro uses modern authentication, secure APIs and best practices
          to keep your data safe.
        </p>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      q: "Is TodoPro free?",
      a: "Yes. You can start using TodoPro for free with all core features available.",
    },
    {
      q: "Can I use it on mobile?",
      a: "Absolutely. TodoPro is fully responsive and works smoothly on mobile, tablet, and desktop.",
    },
    {
      q: "Do I need a credit card to sign up?",
      a: "No. You can create an account and start using TodoPro without providing any payment details.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section>
      <div className="max-w-3xl mx-auto px-6 py-24">
        <h2 className="font-heading text-4xl font-bold mb-12 text-center">
          Frequently asked questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-neutral-light bg-neutral-white"
              >
                {/* Question */}
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-heading font-semibold">
                    {faq.q}
                  </span>

                  <ChevronDown
                    className={`w-5 h-5 text-neutral-dark transition-transform ${isOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                  <p className="font-body text-neutral-dark px-6 pb-6 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


function CTASection() {
  return (
    <section className="bg-neutral-light border-t border-neutral-light">
      <div className="max-w-7xl mx-auto px-6 py-28 text-center space-y-6">

        <h2 className="font-heading text-4xl font-bold">
          Start managing work the right way
        </h2>

        <p className="font-body text-neutral-dark max-w-xl mx-auto">
          TodoPro is free to start. No credit card required.
        </p>

        <a
          href="/signup"
          className="inline-block px-8 py-3 rounded-xl bg-primary text-neutral-white font-body font-semibold hover:bg-primary-hover transition"
        >
          Create your free account
        </a>

      </div>
    </section>
  );
}

