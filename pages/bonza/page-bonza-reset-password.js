module.exports = {

        main: {
            //emailAddressInput: '~input__account__reset-password__email-address',
            emailAddressInput: '//android.widget.EditText[@content-desc="input__account__reset-password__email-address"]',
            requestCodeButton: '~btn__account-resend-reset-password-code',
            sendSecurityCodeButton: '~popup-modal__primary',
            cancelButton: '~btn__account-reset-password-cancel',
            currentPasswordInput: '~input__account__password-field__password_current-password-password-passwordfield',
            newPasswordInput: '~input__account__password-field__password_new-password-password-passwordfield',
            resetPasswordCodeInput: '~new-password-reset-code-inputfield',
            confirmPasswordInput: '~input__account__password-field__password_new-password-confirm-password-passwordfield',
            resetPasswordButton: '~btn__account-reset-password',
            genericPassword: '//*[@content-desc="input__account__password-field__password"]',
            passwordMismatchHeader: '//android.widget.TextView[@text="Password Mismatch"]',
            unableToSaveNewPasswordHeader: '//android.widget.TextView[@text="Unable to Save New Password"]',
            closePopupButton: '//android.view.ViewGroup[@content-desc="button__click"]',
            passwordSavedText: '//*[@text="Your new password has been saved."]',
            passwordSavedCloseButton: '//*[@text=" Close"]',
        },
};