import type { ComponentType } from "react";
import type { SceneProps } from "../kit";
import Anpr from "./Anpr";
import Asha from "./Asha";
import AtsAi from "./AtsAi";
import CadVisualizer from "./CadVisualizer";
import Carbonseed from "./Carbonseed";
import Cctv from "./Cctv";
import ChronicAi from "./ChronicAi";
import CommentingAgent from "./CommentingAgent";
import Digistamp from "./Digistamp";
import Discom from "./Discom";
import HealthClaim from "./HealthClaim";
import JobAgent from "./JobAgent";
import MaterialReconciliation from "./MaterialReconciliation";
import Mdrs from "./Mdrs";
import Pulse from "./Pulse";
import ReceiptNote from "./ReceiptNote";
import Retail from "./Retail";
import Sahayak from "./Sahayak";
import TallyBookkeeping from "./TallyBookkeeping";
import TruckToTally from "./TruckToTally";
import Unicharge from "./Unicharge";

/** The animated walkthrough for each project, by slug. */
export const SCENES: Record<string, ComponentType<SceneProps>> = {
  "tally-bookkeeping-automation": TallyBookkeeping,
  "truck-inward-to-tally": TruckToTally,
  "asha-ai": Asha,
  "pulse-ai": Pulse,
  "ai-commenting-agent": CommentingAgent,
  "ai-job-hunting-agent": JobAgent,
  mdrs: Mdrs,
  "anpr-weighbridge-autofill": Anpr,
  digistamp: Digistamp,
  "health-claim-form-automation": HealthClaim,
  "receipt-note-portal": ReceiptNote,
  "cctv-security-intelligence": Cctv,
  "retail-video-intelligence": Retail,
  "material-reconciliation": MaterialReconciliation,
  discom: Discom,
  unicharge: Unicharge,
  sahayak: Sahayak,
  "ats-ai": AtsAi,
  "cad-visualizer": CadVisualizer,
  carbonseed: Carbonseed,
  "chronic-ai": ChronicAi,
};
