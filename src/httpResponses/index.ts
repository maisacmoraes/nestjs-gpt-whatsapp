export const httpResponses = {
  FILES: {
    DELETE_ERROR: 'Error deleting file',
    WRITE_ERROR: 'Error writing file',
  },
  GENERAL: {
    UNKNOWN: 'Unknown error',
    DELETED: 'Record successfully deleted',
    NOT_FOUND: 'Record not found',
    UNAUTHORIZED: 'Unauthorized',
  },
  INSTANCES: {
    INSTANCE_NOT_FOUND: 'Instance not found',
    INSTANCE_DELETED: 'Instance successfully deleted',
    INSTANCE_CANCELED: 'Instance successfully canceled',
    CONFIG_ERROR: 'Error configuring instance',
  },
  SYNC: {
    ERROR: 'Error synchronizing data: ',
    INVALID_DATA: 'Invalid data received in synchronization of ',
    EMPTY_VALUE: 'Duplicates or Operations is null or undefined',
    NO_UPDATES_REQUIRED: 'No updates required',
  },
  MESSAGE: {
    NOT_FOUND: 'Message not found',
  },
  BILLING_RULERS: {
    DELETED: 'Billing rule successfully deleted',
  },
  CREDIT_RESTRICTIONS: {
    ATTRIBUTE_CANNOT_BE_UPDATED:
      'The attributes "Renegotiations" and "control_number" cannot be updated.',
  },
};
