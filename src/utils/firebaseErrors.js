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

export {getAuthErrorMessage};