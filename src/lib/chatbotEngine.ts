import {
  intents,
  fallbackAnswer,
  type ChatIntent,
} from "@/data/chatbotKnowledge";

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s+/&-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Score how well a message matches an intent */
function scoreIntent(message: string, intent: ChatIntent): number {
  const msg = normalize(message);
  let score = 0;
  for (const pattern of intent.patterns) {
    const p = pattern.toLowerCase();
    if (msg === p) score += 10;
    else if (msg.includes(p)) score += 3 + Math.min(p.length / 10, 2);
    // word-boundary-ish: pattern as whole word
    const re = new RegExp(
      `(?:^|\\s)${p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:\\s|$)`,
    );
    if (re.test(msg)) score += 2;
  }
  return score;
}

export function getBotReply(userMessage: string): string {
  const trimmed = userMessage.trim();
  if (!trimmed) {
    return "Please type a question — for example: “Where is your office?” or “What services do you offer?”";
  }

  let best: ChatIntent | null = null;
  let bestScore = 0;

  for (const intent of intents) {
    const s = scoreIntent(trimmed, intent);
    if (s > bestScore) {
      bestScore = s;
      best = intent;
    }
  }

  // Require a minimum score so random text falls through to fallback
  if (best && bestScore >= 3) {
    return best.answer;
  }

  return fallbackAnswer;
}
