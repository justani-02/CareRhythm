  # CareRhythm

> *A mirror, not a monitor.*

An ambient home device for intentional care — built in one day at the UCD HCI Hackathon 2026.

**🏆 Runner-Up — Most Innovative Idea**

---

## What is CareRhythm?

CareRhythm is a screenless ambient home device that reflects the health of your care rhythms through light. No notifications. No alerts. No data leaves your home.

It sits on your shelf and slowly changes colour based on how recently you've been connecting with the people you love. When the light dims, you notice. You decide what to do next.

| Colour | Meaning |
|--------|---------|
| 🔵 Blue | Connection is fading |
| 🟡 Yellow | Rhythms are healthy |
| 🟠 Orange | Something has gone quiet too long |

---

## The Problem

When you relocate, the small daily acts of care — a call, a check-in, a shared photo — are the first things to slip. There is no signal. Life fills up. Weeks pass. The guilt arrives later, bigger than it needed to be.

We don't need more notifications. We need a quiet, honest mirror.

---

## The User

**Jone Doe — 24 — Graduate student, Dublin**

Moved to a new city for a graduate programme. Family 1–5 hours behind in a different time zone. Not disconnected by choice — just by life filling up. Calls pushed to "later." Weeks passing quietly.

---

## The Challenge

> *"How might we design intelligent systems for intentional, human engagement in the fostering of care in everyday life?"*

UCD MSc HCI Hackathon — in collaboration with UCD Innovation Academy, IBM Design Studios, and DesignBrew.

---

## What We Built

In one day:

- **Physical prototype** — 3D-printed shell with RGB LED showing three working colour states, built in the MakerSpace
- **App prototype** — End-to-end Figma clickable flow (onboarding → logging a care act → device response)
- **Storyboard** — Full illustrated user journey from arrival to drift to reconnection
- **App icon** — Designed to represent the device's ambient, warm character

---

## Repository Structure

```
carerhythm/
├── firmware/               # Arduino / Raspberry Pi code for the physical device
│   ├── main.ino            # Main loop — reads care score, drives LED colour
│   ├── led_controller.ino  # RGB LED colour mapping (blue / yellow / orange)
│   └── rhythm_score.ino    # Care score calculation from log timestamps
│
├── app/                    # Mobile app (logging interface)
│   ├── index.html          # Entry point
│   ├── log.js              # Care act logging — timestamps to local storage
│   ├── score.js            # Rhythm score engine
│   └── styles.css          # App styles
│
├── prototype/              # Figma prototype exports and assets
│   ├── screens/            # All 11 screen exports (PNG)
│   ├── icon/               # App icon assets
│   └── storyboard/         # Storyboard frames
│
├── hardware/               # Physical build files
│   ├── shell.stl           # 3D print file — device shell
│   └── wiring_diagram.png  # LED + servo wiring schematic
│
├── docs/                   # Project documentation
│   ├── persona.md          # Jone Doe persona
│   ├── care_outcome.md     # Design rationale and care outcomes
│   └── privacy.md          # Privacy design decisions
│
└── README.md
```

---

## How It Works

### 1. Logging a care act
The companion app provides a single-tap interface. Select what you did and who it was for. Three taps. Ten seconds. Stored locally on device — no cloud, no account.

```
Care acts tracked:
  - Called someone
  - Sent a voice note
  - Shared a photo
  - Checked in by text
  - Spent time together
```

### 2. Rhythm score calculation
For each person in your care network, the system calculates a score based on recency and regularity of acts relative to your expected rhythm (set during onboarding).

```
score = f(days_since_last_act, expected_frequency)

100  →  rhythm is healthy
50   →  rhythm is fading
0    →  rhythm has gone quiet
```

### 3. Device output
The score maps directly to LED colour and — in the full version — servo-driven surface movement.

```
score 70–100  →  Yellow  (thriving)
score 30–69   →  Blue    (fading)
score 0–29    →  Orange  (dormant)
```

The device updates gradually over hours, not instantly. The shift is noticed, not alarmed.

---

## Hardware

| Component | Purpose |
|-----------|---------|
| Raspberry Pi Zero W / Arduino Uno | Main controller |
| RGB LED (common cathode) | Colour output |
| Translucent white PLA shell | Light diffusion |
| Servo motor (optional) | Surface petal movement |
| USB power supply | Power |

The shell was 3D-printed in translucent white PLA. The LED sits inside the cavity and light diffuses through the material, softening the colour output into something ambient rather than harsh.

---

  # CareRhythm mobile app prototype

  This is a code bundle for CareRhythm mobile app prototype. The original project is available at https://www.figma.com/design/qC0jo0LoplQlSWpawYZl6U/CareRhythm-mobile-app-prototype.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

## App Prototype (Figma)

The app prototype covers 11 screens:

| Screen | Purpose |
|--------|---------|
| S1 | Splash |
| S2 | Onboarding — welcome |
| S3 | Onboarding — who matters to you |
| S4 | Onboarding — set rhythms |
| S5 | Onboarding — place your device |
| S6 | Home — thriving state |
| S7 | Home — fading state |
| S8 | Log a care moment (bottom sheet) |
| S9 | Confirmation — device response |
| S10 | Rhythm detail view |
| S11 | Settings |

**Demo flow** (for presentations):
Start on S7 (fading) → tap card → S10 (gap in timeline) → tap "Do something now" → S8 → log act → S9 (device warms) → S6 (thriving). Six taps. Under 45 seconds.

---

## Privacy Design

CareRhythm was designed around a single principle:

> All data stays on the device. Nothing is uploaded. Nothing is shared. Nothing is monitored.

- No cloud storage
- No user accounts
- No data shared between people
- No comparative scores
- The device belongs to one person only — no shared views
- Logs record *your acts*, not other people — "I called" not "mum was called"

---

## Care Outcome

CareRhythm addresses four outcomes:

**Relational maintenance** — Keeps family connections alive through consistent small acts. Prevents physical distance from becoming emotional distance.

**Proactive awareness** — Catches drift at day five, not day twenty. A soft signal is easier to respond to than a heavy one.

**Intentional engagement** — The technology makes care visible. The human decides what to do. No act is automated. No care is performed on your behalf.

**Ambient presence** — The home environment itself becomes a caring presence — without demands, without alerts, without surveillance.

---
Built at the UCD HCI Hackathon 2026
MSc in Human-Computer Interaction — UCD School of Information and Communication Studies

---

## Mentors

Huge thanks to our mentors from **IBM Design** and **DesignBrew** whose questions made this work sharper.

---

## Event

Hosted by the MSc in HCI programme at UCD School of Information and Communication Studies, in collaboration with:

- UCD Innovation Academy
- IBM Design Studios
- DesignBrew — MSc HCI alumni community working across Ireland's tech industry

---

## Licence

This project was built as a hackathon prototype for educational and research purposes.

---

*"A mirror, not a monitor."*
  
