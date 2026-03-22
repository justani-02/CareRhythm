import { createBrowserRouter } from "react-router";
import { Splash } from "./components/Splash";
import { OnboardingWelcome } from "./components/OnboardingWelcome";
import { OnboardingWho } from "./components/OnboardingWho";
import { OnboardingRhythms } from "./components/OnboardingRhythms";
import { OnboardingDevice } from "./components/OnboardingDevice";
import { HomeScreen } from "./components/HomeScreen";
import { RhythmDetailScreen } from "./components/RhythmDetailScreen";
import { SettingsScreen } from "./components/SettingsScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Splash,
  },
  {
    path: "/welcome",
    Component: OnboardingWelcome,
  },
  {
    path: "/onboarding/who",
    Component: OnboardingWho,
  },
  {
    path: "/onboarding/rhythms",
    Component: OnboardingRhythms,
  },
  {
    path: "/onboarding/device",
    Component: OnboardingDevice,
  },
  {
    path: "/home",
    Component: HomeScreen,
  },
  {
    path: "/rhythm/:id",
    Component: RhythmDetailScreen,
  },
  {
    path: "/settings",
    Component: SettingsScreen,
  },
]);
