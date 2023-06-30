function getAuthErrorMessage(errorCode) {
    const errorMessages = {
        "auth/invalid-email": "The provided email address is not valid.",
        "auth/user-disabled": "The user corresponding to the email address has been disabled.",
        "auth/user-not-found": "There is no user corresponding to the given email address.",
        "auth/wrong-password": "The provided password is incorrect.",
        "auth/email-already-in-use": "The email address is already associated with an existing user account.",
        "auth/weak-password": "The provided password is too weak. It should be at least six characters long.",
        "auth/operation-not-allowed": "The requested authentication operation is not allowed.",
        "auth/invalid-credential": "The supplied credential is malformed or has expired.",
        "auth/account-exists-with-different-credential": "An account already exists with the same email address but different sign-in credentials.",
        "auth/invalid-verification-code": "The provided verification code is invalid.",
        "auth/invalid-verification-id": "The provided verification ID is invalid.",
        "auth/captcha-check-failed": "The reCAPTCHA response token provided is either invalid, expired, or has already been used.",
        "auth/requires-recent-login": "This operation is sensitive and requires a recent login. Reauthenticate before retrying.",
        "auth/provider-already-linked": "The user already has an existing external identity linked with the provider.",
        "auth/invalid-recipient-email": "The recipient email is invalid."
      };
      return errorMessages[errorCode] || "Unknown error occurred.";
}

function getFirestoreErrorMessage(errorCode) {
  const errorMessages = {
    'cancelled': 'The operation was cancelled.',
    'unknown': 'An unknown error occurred.',
    'invalid-argument': 'An invalid argument was provided.',
    'deadline-exceeded': 'The request deadline was exceeded.',
    'not-found': 'The requested resource was not found.',
    'already-exists': 'The resource already exists.',
    'permission-denied': 'Permission denied.',
    'unauthenticated': 'Authentication is required.',
    'resource-exhausted': 'The resource has been exhausted.',
    'failed-precondition': 'Precondition failed.',
    'aborted': 'The operation was aborted.',
    'out-of-range': 'The value is out of range.',
    'unimplemented': 'The operation is not implemented.',
    'internal': 'An internal error occurred.',
    'unavailable': 'The service is unavailable.',
    'data-loss': 'Data loss occurred.'
  };
  return errorMessages[errorCode] || 'An unknown error occurred.';
}

function getStorageTaskErrorMessage(errorCode) {
  const errorMessages = {
    'storage/unauthorized': 'The user is not authorized to perform the desired action in Firebase Storage.',
    'storage/canceled': 'The task was canceled.',
    'storage/unknown': 'An unknown error occurred in Firebase Storage.',
    'storage/invalid-checksum': 'The uploaded file failed the integrity check.',
    'storage/invalid-event-name': 'The event name provided is not valid.',
    'storage/invalid-argument': 'An invalid argument was provided.',
    'storage/no-default-bucket': 'No default storage bucket is available.',
    'storage/invalid-url': 'The provided URL is not valid.',
    'storage/invalid-uid': 'The provided uid is not valid.',
    'storage/invalid-claims': 'The provided custom claims object is not valid.',
    'storage/invalid-credential': 'The supplied credential is malformed or has expired.',
    'storage/invalid-protocol': 'The provided protocol is not valid.',
    'storage/quota-exceeded': 'The storage quota has been exceeded.',
    'storage/project-not-found': 'The Firebase project was not found.',
    'storage/bucket-not-found': 'The requested storage bucket was not found.',
    'storage/object-not-found': 'The requested object was not found in Firebase Storage.',
    'storage/unauthenticated': 'Authentication is required for Firebase Storage.',
    'storage/retry-limit-exceeded': 'The maximum number of retries has been exceeded.',
    'storage/non-matching-checksum': 'The uploaded file does not match the provided checksum.',
    'storage/download-size-exceeded': 'The downloaded file exceeds the maximum size allowed.',
    'storage/cannot-slice-blob': 'The provided blob cannot be sliced.',
    'storage/server-file-wrong-size': 'The server file size does not match the expected size.',
    'storage/server-file-wrong-hash': 'The server file hash does not match the expected hash.',
    'storage/unauthorized-continue-uri': 'The continue URL specified in the request is unauthorized.',
    'storage/no-upload-session-uri': 'No upload session URL is available for resumable uploads.',
    'storage/invalid-upload-session-uri': 'The provided upload session URL is not valid.',
    'storage/upload-requires-recent-login': 'This upload request requires a recent login.',
    'storage/upload-session-expired': 'The upload session has expired.',
    'storage/unsupported-redirect': 'The server responded with an unsupported redirect.',
    'storage/user-not-authorized': 'The user is not authorized to perform the desired action in Firebase Storage.',
    'storage/retry-limit-exceeded': 'The maximum number of retries has been exceeded.'
  };
  return errorMessages[errorCode] || 'An unknown error occurred.';
}



export {getAuthErrorMessage,getFirestoreErrorMessage,getStorageTaskErrorMessage};