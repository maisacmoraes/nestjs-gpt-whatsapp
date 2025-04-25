export type ISendOPTRequest = {
  phone: string;
  message: string;
  code: string;
  image?: number;
  buttonText?: number;
};

export type ISendSimpleTextRequest = {
  phone: string;
  message: any;
  delayMessage?: number;
  delayTyping?: number;
  editMessageId?: string;
};

export type ISendDocumentRequest = {
  phone: string;
  document: string;
  fileName?: string;
  caption?: string;
  messageId?: string;
  delayMessage?: number;
};

export type ISendLinkRequest = {
  phone: string;
  message: string;
  image: string;
  linkUrl: string;
  title: string;
  linkDescription: string;
  delayMessage?: number;
  delayTyping?: number;
  linkType?: string;
};

export type ISendOptionsListRequest = {
  message: string;
  image: string;
  optionList: IOptionList;
  buttonLabel: string;
  delayMessage?: number;
};

type IOptionList = {
  title: string;
  options: IOption[];
};

type IOption = {
  id?: string;
  description: string;
  title: string;
};

export type IResponse = {
  zaapId: string;
  messageId: string;
  id: string;
};

export type IExists = {
  exists: boolean;
};

export type IQueueSendResponse = {
  _id: string;
  DelayMessage: string;
  Message: string;
  IsTrial: boolean;
  InstanceId: string;
  Phone: string;
  ZaapId: string;
  DelayTyping: string;
  MessageId: string;
  Created: number;
};

export type IBusinessHours = {
  timezone: string;
  mode: 'specificHours' | 'open24h' | 'appointmentOnly';
  days: IBusinessDay[];
};

type IBusinessDay = {
  dayOfWeek:
    | 'SUNDAY'
    | 'MONDAY'
    | 'TUESDAY'
    | 'WEDNESDAY'
    | 'THURSDAY'
    | 'FRIDAY'
    | 'SATURDAY';
  openTime: string; // formato hh:mm
  closeTime: string; // formato hh:mm
};

export type createZapiInstance = {
  name: string;
  sessionName?: string;
  deliveryCallbackUrl: string;
  receivedCallbackUrl: string;
  disconnectedCallbackUrl: string;
  connectedCallbackUrl: string;
  messageStatusCallbackUrl: string;
  isDevice: boolean;
  businessDevice: boolean;
};

export type IInstanceResponse = {
  id: string;
  token: string;
  due: string; // data de validade da instancia
};

export type IGetAllInstancesResponse = {
  total: number;
  totalPage: number;
  pageSize: number;
  page: number;
  content: IInstance[];
};

export type IInstance = {
  receivedAndDeliveryCallbackUrl: string;
  presenceChatCallbackUrl: string;
  initialDataCallbackUrl: string;
  receivedStatusCallbackUrl: string;
  blockCallbackUrl: string;
  created: string; // data de criação
  disconnectedCallbackUrl: string;
  autoReadMessage: string;
  callRejectAuto: string;
  token: string;
  phoneConnected: boolean;
  deliveryCallbackUrl: string;
  due: number;
  whatsappConnected: boolean;
  name: string;
  connectedCallbackUrl: string;
  messageStatusCallbackUrl: string;
  id: string;
  receivedCallbackUrl: string;
  tenant: string;
  paymentStatus: string;
  callRejectMessage: string;
  middleware: string;
};

export type IPhoneExistsBatch = {
  exists: boolean;
  inputPhone: string;
  outputPhone: string;
};

export interface IZapiWebhookPayload {
  isStatusReply: boolean;
  senderLid: string;
  connectedPhone: string;
  waitingMessage: boolean;
  isEdit: boolean;
  isGroup: boolean;
  isNewsletter: boolean;
  instanceId: string;
  messageId: string;
  phone: string;
  fromMe: boolean;
  momment: number;
  status: string;
  chatName: string;
  senderPhoto: string;
  senderName: string;
  participantPhone: string | null;
  participantLid: string | null;
  photo: string;
  broadcast: boolean;
  type: string;
  text: {
    message: string;
    descritpion?: string;
    title?: string;
    url?: string;
    thumbnailUrl?: string;
  };
}
