import teamMembersData from "../data/team-members.json";

export type TeamDepartment =
  | "electric-hv"
  | "electric-lv"
  | "mech-vd"
  | "mech-design"
  | "mech-aero"
  | "management"
  | "business"
  | "professori";

export type TeamCardSize = "lead" | "standard";

export interface TeamMember {
  id: string;
  department: TeamDepartment;
  name: string;
  role: string;
  imageUrl: string;
  github: string;
  linkedinUrl: string;
  cardSize: TeamCardSize;
  order?: number;
}

interface DecapMemberRaw {
  name?: string;
  role?: string;
  dept?: string;
  unit?: string;
  bio?: string;
  linkedin?: string;
  special?: boolean;
  photo?: string;
  visible?: boolean;
  order?: number;
}

const STORAGE_KEY = "fsc-team-members-v1";
const SOURCE_KEY = "fsc-team-members-source-v1";
const SOURCE_UPDATED_AT_KEY = "fsc-team-members-source-updated-at-v1";
const BASE_URL = import.meta.env.BASE_URL;
const MANUAL_OVERRIDE_TTL_MS = 5 * 60 * 1000;

type TeamMembersSource = "seed" | "remote" | "manual";

function normalizePublicUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }

  if (/^(?:[a-z]+:)?\/\//i.test(trimmed) || trimmed.startsWith("data:") || trimmed.startsWith("blob:")) {
    return trimmed;
  }

  if (trimmed.startsWith(BASE_URL)) {
    return trimmed;
  }

  const baseNoTrailingSlash = BASE_URL.replace(/\/+$/, "");
  if (baseNoTrailingSlash && trimmed.startsWith(`${baseNoTrailingSlash}/`)) {
    return trimmed;
  }

  return `${BASE_URL}${trimmed.replace(/^\/+/, "")}`;
}

export const TEAM_DEPARTMENT_OPTIONS: { value: TeamDepartment; label: string }[] = [
  { value: "electric-hv", label: "Elettrica — High Voltage" },
  { value: "electric-lv", label: "Elettrica — Low Voltage" },
  { value: "mech-vd", label: "Meccanica — Vehicle Dynamics" },
  { value: "mech-design", label: "Meccanica — Mechanical Design" },
  { value: "mech-aero", label: "Meccanica — Aerodynamics" },
  { value: "management", label: "Management" },
  { value: "business", label: "Business" },
  { value: "professori", label: "Professori" }
];

const defaultMembers: TeamMember[] = (teamMembersData.members || []) as TeamMember[];

function isBrowser() {
  return typeof window !== "undefined";
}

function emitMembersUpdate() {
  if (!isBrowser()) {
    return;
  }
  window.dispatchEvent(new CustomEvent("fsc-members-updated"));
}

function safeParseMembers(value: string | null): TeamMember[] | null {
  if (!value) {
    return null;
  }
  try {
    const parsed = JSON.parse(value) as TeamMember[];
    if (!Array.isArray(parsed)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function getTeamMembers(): TeamMember[] {
  if (!isBrowser()) {
    return defaultMembers;
  }

  const parsed = safeParseMembers(window.localStorage.getItem(STORAGE_KEY));
  if (parsed && parsed.length > 0) {
    return parsed;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultMembers));
  if (!window.localStorage.getItem(SOURCE_KEY)) {
    window.localStorage.setItem(SOURCE_KEY, "seed");
  }
  return defaultMembers;
}

function readMembersSource(): TeamMembersSource {
  if (!isBrowser()) {
    return "seed";
  }

  const value = (window.localStorage.getItem(SOURCE_KEY) || "").trim().toLowerCase();
  if (value === "manual" || value === "remote" || value === "seed") {
    return value;
  }

  return "seed";
}

function readSourceUpdatedAt(): number {
  if (!isBrowser()) {
    return 0;
  }

  const raw = window.localStorage.getItem(SOURCE_UPDATED_AT_KEY) || "0";
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function hasManualMembersOverride(): boolean {
  if (readMembersSource() !== "manual") {
    return false;
  }

  const updatedAt = readSourceUpdatedAt();
  if (!updatedAt) {
    return false;
  }

  return Date.now() - updatedAt < MANUAL_OVERRIDE_TTL_MS;
}

export function saveTeamMembers(members: TeamMember[], source: TeamMembersSource = "manual") {
  if (!isBrowser()) {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  window.localStorage.setItem(SOURCE_KEY, source);
  window.localStorage.setItem(SOURCE_UPDATED_AT_KEY, `${Date.now()}`);
  emitMembersUpdate();
}

export function syncTeamMembersFromRemote(members: TeamMember[]): boolean {
  if (!isBrowser() || members.length === 0) {
    return false;
  }

  if (hasManualMembersOverride()) {
    return false;
  }

  const current = getTeamMembers();
  const currentJson = JSON.stringify(current);
  const nextJson = JSON.stringify(members);
  if (currentJson === nextJson) {
    return false;
  }

  saveTeamMembers(members, "remote");
  return true;
}

export function addTeamMember(member: TeamMember) {
  const members = getTeamMembers();
  members.push(member);
  saveTeamMembers(members);
}

export function removeTeamMember(memberId: string) {
  const members = getTeamMembers().filter((member) => member.id !== memberId);
  saveTeamMembers(members);
}

export function getMembersByDepartment(department: TeamDepartment): TeamMember[] {
  return getTeamMembers()
    .filter((member) => member.department === department)
    .sort((first, second) => {
      if (first.cardSize === second.cardSize) {
        const firstOrder = first.order ?? 0;
        const secondOrder = second.order ?? 0;
        if (firstOrder !== secondOrder) {
          return firstOrder - secondOrder;
        }
        return first.name.localeCompare(second.name);
      }
      return first.cardSize === "lead" ? -1 : 1;
    });
}

function mapDepartmentFromDecap(raw: DecapMemberRaw): TeamDepartment | null {
  const dept = (raw.dept || "").toLowerCase().trim();
  const unit = (raw.unit || "").toLowerCase().trim();

  if (dept === "management") {
    if (unit === "business") {
      return "business";
    }
    if (unit === "professori") {
      return "professori";
    }
    return "management";
  }

  if (dept === "elettrica") {
    if (unit === "high_voltage") {
      return "electric-hv";
    }
    if (unit === "low_voltage") {
      return "electric-lv";
    }
    return null;
  }

  if (dept === "meccanica") {
    if (unit === "vehicle_dynamics") {
      return "mech-vd";
    }
    if (unit === "mechanical_design") {
      return "mech-design";
    }
    if (unit === "aerodynamics") {
      return "mech-aero";
    }
    return null;
  }

  return null;
}

function toTeamMember(raw: DecapMemberRaw, index: number): TeamMember | null {
  const department = mapDepartmentFromDecap(raw);
  const name = (raw.name || "").trim();
  const role = (raw.role || "").trim();
  if (!department || !name || !role) {
    return null;
  }

  const safeUnit = (raw.unit || "member").replace(/[^a-z0-9_\-]+/gi, "-");
  return {
    id: `${department}-${safeUnit}-${index}`,
    department,
    name,
    role,
    imageUrl: normalizePublicUrl(raw.photo || ""),
    github: "",
    linkedinUrl: (raw.linkedin || "").trim(),
    cardSize: raw.special ? "lead" : "standard",
    order: typeof raw.order === "number" ? raw.order : 0
  };
}

export async function loadMembersFromDecapFile(): Promise<TeamMember[] | null> {
  if (!isBrowser()) {
    return null;
  }

  try {
    const membersUrl = `${import.meta.env.BASE_URL}dev/data/members.json?t=${Date.now()}`;
    const response = await fetch(membersUrl, { cache: "no-store" });
    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as { members?: DecapMemberRaw[] };
    const rawMembers = Array.isArray(payload.members) ? payload.members : [];

    const mapped = rawMembers
      .filter((member) => member.visible !== false)
      .map((member, index) => toTeamMember(member, index))
      .filter((member): member is TeamMember => Boolean(member));

    if (mapped.length === 0) {
      return null;
    }

    return mapped;
  } catch {
    return null;
  }
}
