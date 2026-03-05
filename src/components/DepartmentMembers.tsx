import { useEffect, useMemo, useState } from "react";
import {
  getMembersByDepartment,
  hasManualMembersOverride,
  loadMembersFromDecapFile,
  syncTeamMembersFromRemote,
  type TeamDepartment,
  type TeamMember
} from "../lib/teamMembers";

interface DepartmentMembersProps {
  title: string;
  department: TeamDepartment;
}

export default function DepartmentMembers({ title, department }: DepartmentMembersProps) {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const onUpdate = () => setVersion((value) => value + 1);
    const onStorage = (event: StorageEvent) => {
      if (event.key?.includes("fsc-team-members")) {
        onUpdate();
      }
    };

    window.addEventListener("fsc-members-updated", onUpdate);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("fsc-members-updated", onUpdate);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  useEffect(() => {
    let active = true;

    const loadRemoteMembers = async () => {
      if (hasManualMembersOverride()) {
        return;
      }

      const members = await loadMembersFromDecapFile();
      if (!active || !members) {
        return;
      }

      if (syncTeamMembersFromRemote(members)) {
        setVersion((value) => value + 1);
      }
    };

    void loadRemoteMembers();
    const timer = window.setInterval(() => {
      void loadRemoteMembers();
    }, 15000);

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  const members = useMemo(() => {
    return getMembersByDepartment(department)
      .sort((first, second) => {
        if (first.cardSize !== second.cardSize) {
          return first.cardSize === "lead" ? -1 : 1;
        }
        const firstOrder = first.order ?? 0;
        const secondOrder = second.order ?? 0;
        if (firstOrder !== secondOrder) {
          return firstOrder - secondOrder;
        }
        return first.name.localeCompare(second.name);
      });
  }, [department, version]);

  const leadMembers = members.filter((member) => member.cardSize === "lead");
  const regularMembers = members.filter((member) => member.cardSize !== "lead");

  const renderMemberCard = (member: TeamMember) => {
    const githubUrl = member.github ? `https://github.com/${member.github}` : "";
    const linkedinUrl = member.linkedinUrl?.trim() ?? "";
    const hasLinkedin = linkedinUrl.length > 0;

    const openLinkedin = () => {
      window.open(linkedinUrl, "_blank", "noopener,noreferrer");
    };

    const avatar = member.imageUrl ? (
      <img className="dept-member-avatar" src={member.imageUrl} alt={member.name} />
    ) : (
      <div className="dept-member-avatar dept-member-avatar--placeholder" />
    );

    return (
      <article
        key={member.id}
        className={`dept-member-card dept-member-card--${member.cardSize}${hasLinkedin ? " dept-member-card--clickable" : ""}`}
        tabIndex={hasLinkedin ? 0 : undefined}
        role={hasLinkedin ? "link" : undefined}
        onClick={hasLinkedin ? openLinkedin : undefined}
        onKeyDown={hasLinkedin ? (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openLinkedin();
          }
        } : undefined}
      >
        <div className="dept-member-avatar-wrap">
          {avatar}
        </div>

        <div className="dept-member-content">
          <div className="dept-member-name">{member.name}</div>
          <div className="dept-member-role">{member.role}</div>

          {githubUrl ? (
            <div className="dept-member-links">
              <a href={githubUrl} target="_blank" rel="noreferrer noopener">GitHub</a>
            </div>
          ) : null}
        </div>
      </article>
    );
  };

  return (
    <section className="dept-members" aria-label={`${title} team members`}>
      <h3 className="dept-members-title">{title}</h3>
      {members.length === 0 ? (
        <p className="dept-members-empty">Nessun membro configurato per questa area.</p>
      ) : (
        <div className={`dept-members-layout${leadMembers.length === 0 ? " dept-members-layout--no-leads" : ""}`}>
          {leadMembers.length > 0 ? (
            <div className="dept-members-leads">
              {leadMembers.map(renderMemberCard)}
            </div>
          ) : null}

          <div className="dept-members-regular">
            {regularMembers.map(renderMemberCard)}
          </div>
        </div>
      )}
    </section>
  );
}
