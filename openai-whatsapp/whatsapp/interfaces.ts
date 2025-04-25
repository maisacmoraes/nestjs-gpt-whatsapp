interface WhatsappMessage {
  from: string;
  id: string;
  type: string;
  text?: {
    body: string;
  };
}

export interface WhatsappWebhookPayload {
  entry: {
    changes: {
      value: {
        messages: WhatsappMessage[];
      };
    }[];
  }[];
}
