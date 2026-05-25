export interface InquiryIntent {
  label: string;
  subject: string;
  bodyIntro: string;
}

export interface InquiryConfig {
  contactEmail: string;
  calendarUrl: string;
  intents: Record<string, InquiryIntent>;
  defaultIntent: string;
}

export function buildMailto(
  config: InquiryConfig,
  intentKey?: string,
  extraBody?: string
): string {
  const key = intentKey && config.intents[intentKey] ? intentKey : config.defaultIntent;
  const intent = config.intents[key];
  const body = [intent.bodyIntro, extraBody, '', '— Sent via Dubai Mall Sales Deck'].join('\n');
  const params = new URLSearchParams({
    subject: intent.subject,
    body,
  });
  return `mailto:${config.contactEmail}?${params.toString()}`;
}
