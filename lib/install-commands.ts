import { Skill } from "./types";

export interface InstallCommand {
  platform: string;
  command: string;
  note?: string;
}

const SUPERPOWERS_SKILLS = new Set([
  "tdd-workflow",
  "systematic-debugging",
  "code-review",
  "brainstorming",
  "plan-writing",
  "git-worktrees",
  "parallel-agents",
  "claude-api",
  "refactoring",
]);

const GSD_SKILL_IDS = new Set(["gsd-workflow"]);

const FRONTEND_DESIGN_IDS = new Set(["frontend-design"]);

const SKILL_CREATOR_IDS = new Set(["skill-creator"]);

export function getInstallCommands(skill: Skill): InstallCommand[] {
  const commands: InstallCommand[] = [];

  if (SUPERPOWERS_SKILLS.has(skill.id)) {
    if (skill.platforms.includes("claude-code")) {
      commands.push({
        platform: "Claude Code",
        command: "claude plugins add superpowers",
        note: `Installs the full Superpowers suite including ${skill.name}`,
      });
    }
    if (skill.platforms.includes("codex")) {
      commands.push({
        platform: "Codex CLI",
        command: "Install via the Superpowers OpenCode plugin",
      });
    }
    if (skill.platforms.includes("gemini-cli")) {
      commands.push({
        platform: "Gemini CLI",
        command: "Install via the Superpowers Gemini extension",
      });
    }
  } else if (GSD_SKILL_IDS.has(skill.id)) {
    commands.push({
      platform: "Claude Code",
      command: "claude plugins add get-stuff-done",
    });
  } else if (FRONTEND_DESIGN_IDS.has(skill.id)) {
    commands.push({
      platform: "Claude Code",
      command: "claude plugins add frontend-design",
    });
  } else if (SKILL_CREATOR_IDS.has(skill.id)) {
    commands.push({
      platform: "Claude Code",
      command: "claude plugins add skill-creator",
    });
  } else if (skill.sourceUrl) {
    // Generic GitHub-based skill
    if (skill.platforms.includes("claude-code")) {
      commands.push({
        platform: "Claude Code",
        command: `claude skills add ${skill.sourceUrl}`,
        note: "Install directly from GitHub",
      });
    }
  }

  return commands;
}
