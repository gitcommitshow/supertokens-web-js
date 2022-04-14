/* Copyright (c) 2022, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

/**
 * with-typescript allows unused variables. This is because we specifically want to read
 * variables and check for types, for example in post API hooks
 *
 * const url: string = context.url;
 *
 * The above line will make sure that the context object has a `url` property and it is of type string,
 * but building this file would normally fail because of the variable being unused
 *
 * The differences in tsconfig for with-typescript compared to the main project:
 * - noUnusedLocals is set to false
 */
import { SuperTokensConfig, AppInfoUserInput, CreateRecipeFunction } from "../../types";
import SuperTokens from "../../";
import {
    RecipeInterface as EmailVerificationRecipeInterface,
    PreAndPostAPIHookAction as EmailVerificationAction,
    UserInput as EmailVerificationUserInput,
} from "../../recipe/emailverification/types";
import EmailVerification from "../../recipe/emailverification";
import {
    RecipeInterface as EmailPasswordRecipeInterface,
    PreAndPostAPIHookAction as EmailPasswordAction,
    UserInput as EmailPasswordUserInput,
} from "../../recipe/emailpassword/types";
import EmailPassword from "../../recipe/emailpassword";
import {
    RecipeInterface as ThirdPartyRecipeInterface,
    PreAndPostAPIHookAction as ThirdPartyAction,
    UserInput as ThirdPartyUserInput,
} from "../../recipe/thirdparty/types";
import ThirdParty from "../../recipe/thirdparty";
import {
    RecipeInterface as TPEPRecipeInterface,
    PreAndPostAPIHookAction as TPEPPartyAction,
    UserInput as TPEPPartyUserInput,
} from "../../recipe/thirdpartyemailpassword/types";
import ThirdPartyEmailPassword from "../../recipe/thirdpartyemailpassword";
import {
    RecipeInterface as PasswordlessRecipeInterface,
    PreAndPostAPIHookAction as PasswordlessAction,
    UserInput as PasswordlessUserInput,
} from "../../recipe/passwordless/types";
import Passwordless from "../../recipe/passwordless";
import {
    RecipeInterface as TPPRecipeInterface,
    PreAndPostAPIHookAction as TPPlessAction,
    UserInput as TPPUserInput,
} from "../../recipe/thirdpartypasswordless";
import ThirdPartyPasswordless from "../../recipe/thirdpartypasswordless";
import {
    RecipeInterface as SessionRecipeInterface,
    PreAndPostAPIHookAction as SessionAction,
    UserInput as SessionUserInput,
} from "../../recipe/session/types";
import Session from "../../recipe/session";

// Email verification init
function getEmailVerificationFunctions(original: EmailVerificationRecipeInterface): EmailVerificationRecipeInterface {
    return {
        verifyEmail: async function (input) {
            return original.verifyEmail(input);
        },
        sendVerificationEmail: async function (input) {
            return original.sendVerificationEmail(input);
        },
        isEmailVerified: async function (input) {
            return original.isEmailVerified(input);
        },
        getEmailVerificationTokenFromURL: function (input) {
            return original.getEmailVerificationTokenFromURL(input);
        },
    };
}

function getEmailverification(): CreateRecipeFunction<EmailVerificationAction> {
    const config: EmailVerificationUserInput = {
        override: {
            functions: getEmailVerificationFunctions,
        },
        preAPIHook: async function (context) {
            if (context.action === "IS_EMAIL_VERIFIED") {
                //
            } else if (context.action === "SEND_VERIFY_EMAIL") {
                //
            } else if (context.action === "VERIFY_EMAIL") {
                //
            }

            if (context.userContext === undefined) {
                //
            }

            const url: string = context.url;
            const requestInit: RequestInit = context.requestInit;

            return {
                requestInit: context.requestInit,
                url: context.url,
            };
        },
        postAPIHook: async function (context) {
            if (context.action === "IS_EMAIL_VERIFIED") {
                //
            } else if (context.action === "SEND_VERIFY_EMAIL") {
                //
            } else if (context.action === "VERIFY_EMAIL") {
                //
            }

            if (context.userContext === undefined) {
                //
            }

            const url: string = context.url;
            const fetchResponse: Response = context.fetchResponse;
            const requestInit: RequestInit = context.requestInit;
        },
    };

    return EmailVerification.init(config);
}

// Email password init
function getEmailPasswordFunctions(original: EmailPasswordRecipeInterface): EmailPasswordRecipeInterface {
    return {
        doesEmailExist: async function (input) {
            return original.doesEmailExist(input);
        },
        getResetPasswordTokenFromURL: function (input) {
            return original.getResetPasswordTokenFromURL(input);
        },
        sendPasswordResetEmail: async function (input) {
            return original.sendPasswordResetEmail(input);
        },
        submitNewPassword: async function (input) {
            return original.submitNewPassword(input);
        },
        signIn: async function (input) {
            return original.signIn(input);
        },
        signUp: async function (input) {
            return original.signUp(input);
        },
    };
}

function getEmailPassword(): CreateRecipeFunction<EmailPasswordAction> {
    const config: EmailPasswordUserInput = {
        override: {
            emailVerification: {
                functions: getEmailVerificationFunctions,
            },
            functions: getEmailPasswordFunctions,
        },
        preAPIHook: async function (context) {
            if (context.action === "IS_EMAIL_VERIFIED") {
                //
            } else if (context.action === "SEND_VERIFY_EMAIL") {
                //
            } else if (context.action === "VERIFY_EMAIL") {
                //
            } else if (context.action === "EMAIL_EXISTS") {
                //
            } else if (context.action === "EMAIL_PASSWORD_SIGN_IN") {
                //
            } else if (context.action === "EMAIL_PASSWORD_SIGN_UP") {
                //
            } else if (context.action === "SEND_RESET_PASSWORD_EMAIL") {
                //
            } else if (context.action === "SUBMIT_NEW_PASSWORD") {
                //
            }

            if (context.userContext === undefined) {
                //
            }

            const url: string = context.url;
            const requestInit: RequestInit = context.requestInit;

            return {
                requestInit: context.requestInit,
                url: context.url,
            };
        },
        postAPIHook: async function (context) {
            if (context.action === "IS_EMAIL_VERIFIED") {
                //
            } else if (context.action === "SEND_VERIFY_EMAIL") {
                //
            } else if (context.action === "VERIFY_EMAIL") {
                //
            } else if (context.action === "EMAIL_EXISTS") {
                //
            } else if (context.action === "EMAIL_PASSWORD_SIGN_IN") {
                //
            } else if (context.action === "EMAIL_PASSWORD_SIGN_UP") {
                //
            } else if (context.action === "SEND_RESET_PASSWORD_EMAIL") {
                //
            } else if (context.action === "SUBMIT_NEW_PASSWORD") {
                //
            }

            if (context.userContext === undefined) {
                //
            }

            const url: string = context.url;
            const fetchResponse: Response = context.fetchResponse;
            const requestInit: RequestInit = context.requestInit;
        },
    };

    return EmailPassword.init(config);
}

// Thirdparty init

function getThirdPartyFunctions(original: ThirdPartyRecipeInterface): ThirdPartyRecipeInterface {
    return {
        generateStateToSendToOAuthProvider: function (input) {
            return original.generateStateToSendToOAuthProvider(input);
        },
        getAuthCodeFromURL: function (input) {
            return original.getAuthCodeFromURL(input);
        },
        getAuthErrorFromURL: function (input) {
            return original.getAuthErrorFromURL(input);
        },
        getAuthStateFromURL: function (input) {
            return original.getAuthStateFromURL(input);
        },
        getAuthorisationURLFromBackend: async function (input) {
            return original.getAuthorisationURLFromBackend(input);
        },
        getAuthorisationURLWithQueryParamsAndSetState: async function (input) {
            return original.getAuthorisationURLWithQueryParamsAndSetState(input);
        },
        getStateAndOtherInfoFromStorage: function (input) {
            return original.getStateAndOtherInfoFromStorage(input);
        },
        setStateAndOtherInfoToStorage: async function (input) {
            return original.setStateAndOtherInfoToStorage(input);
        },
        signInAndUp: async function (input) {
            return original.signInAndUp(input);
        },
        verifyAndGetStateOrThrowError: function (input) {
            return original.verifyAndGetStateOrThrowError(input);
        },
    };
}

function getThirdParty(): CreateRecipeFunction<ThirdPartyAction> {
    const config: ThirdPartyUserInput = {
        override: {
            emailVerification: {
                functions: getEmailVerificationFunctions,
            },
            functions: getThirdPartyFunctions,
        },
        preAPIHook: async function (context) {
            if (context.action === "IS_EMAIL_VERIFIED") {
                //
            } else if (context.action === "SEND_VERIFY_EMAIL") {
                //
            } else if (context.action === "VERIFY_EMAIL") {
                //
            } else if (context.action === "GET_AUTHORISATION_URL") {
                //
            } else if (context.action === "THIRD_PARTY_SIGN_IN_UP") {
                //
            }

            if (context.userContext === undefined) {
                //
            }

            const url: string = context.url;
            const requestInit: RequestInit = context.requestInit;

            return {
                requestInit: context.requestInit,
                url: context.url,
            };
        },
        postAPIHook: async function (context) {
            if (context.action === "IS_EMAIL_VERIFIED") {
                //
            } else if (context.action === "SEND_VERIFY_EMAIL") {
                //
            } else if (context.action === "VERIFY_EMAIL") {
                //
            } else if (context.action === "GET_AUTHORISATION_URL") {
                //
            } else if (context.action === "THIRD_PARTY_SIGN_IN_UP") {
                //
            }

            if (context.userContext === undefined) {
                //
            }

            const url: string = context.url;
            const fetchResponse: Response = context.fetchResponse;
            const requestInit: RequestInit = context.requestInit;
        },
    };

    return ThirdParty.init(config);
}

// Third party email password init

function getThirdPartyEmailPasswordFunctions(original: TPEPRecipeInterface): TPEPRecipeInterface {
    return {
        doesEmailExist: async function (input) {
            return original.doesEmailExist(input);
        },
        emailPasswordSignIn: async function (input) {
            return original.emailPasswordSignIn(input);
        },
        emailPasswordSignUp: async function (input) {
            return original.emailPasswordSignUp(input);
        },
        generateStateToSendToOAuthProvider: function (input) {
            return original.generateStateToSendToOAuthProvider(input);
        },
        getAuthCodeFromURL: function (input) {
            return original.getAuthCodeFromURL(input);
        },
        getAuthErrorFromURL: function (input) {
            return original.getAuthErrorFromURL(input);
        },
        getAuthStateFromURL: function (input) {
            return original.getAuthStateFromURL(input);
        },
        getAuthorisationURLFromBackend: async function (input) {
            return original.getAuthorisationURLFromBackend(input);
        },
        getAuthorisationURLWithQueryParamsAndSetState: async function (input) {
            return original.getAuthorisationURLWithQueryParamsAndSetState(input);
        },
        getResetPasswordTokenFromURL: function (input) {
            return original.getResetPasswordTokenFromURL(input);
        },
        getStateAndOtherInfoFromStorage: function (input) {
            return original.getStateAndOtherInfoFromStorage(input);
        },
        setStateAndOtherInfoToStorage: async function (input) {
            return original.setStateAndOtherInfoToStorage(input);
        },
        sendPasswordResetEmail: async function (input) {
            return original.sendPasswordResetEmail(input);
        },
        submitNewPassword: async function (input) {
            return original.submitNewPassword(input);
        },
        thirdPartySignInAndUp: async function (input) {
            return original.thirdPartySignInAndUp(input);
        },
        verifyAndGetStateOrThrowError: function (input) {
            return original.verifyAndGetStateOrThrowError(input);
        },
    };
}

function getThirdPartyEmailPassword(): CreateRecipeFunction<TPEPPartyAction> {
    const config: TPEPPartyUserInput = {
        override: {
            emailVerification: {
                functions: getEmailVerificationFunctions,
            },
            functions: getThirdPartyEmailPasswordFunctions,
        },
        preAPIHook: async function (context) {
            if (context.action === "IS_EMAIL_VERIFIED") {
                //
            } else if (context.action === "SEND_VERIFY_EMAIL") {
                //
            } else if (context.action === "VERIFY_EMAIL") {
                //
            } else if (context.action === "GET_AUTHORISATION_URL") {
                //
            } else if (context.action === "THIRD_PARTY_SIGN_IN_UP") {
                //
            } else if (context.action === "EMAIL_EXISTS") {
                //
            } else if (context.action === "EMAIL_PASSWORD_SIGN_IN") {
                //
            } else if (context.action === "EMAIL_PASSWORD_SIGN_UP") {
                //
            } else if (context.action === "SEND_RESET_PASSWORD_EMAIL") {
                //
            } else if (context.action === "SUBMIT_NEW_PASSWORD") {
                //
            }

            if (context.userContext === undefined) {
                //
            }

            const url: string = context.url;
            const requestInit: RequestInit = context.requestInit;

            return {
                requestInit: context.requestInit,
                url: context.url,
            };
        },
        postAPIHook: async function (context) {
            if (context.action === "IS_EMAIL_VERIFIED") {
                //
            } else if (context.action === "SEND_VERIFY_EMAIL") {
                //
            } else if (context.action === "VERIFY_EMAIL") {
                //
            } else if (context.action === "GET_AUTHORISATION_URL") {
                //
            } else if (context.action === "THIRD_PARTY_SIGN_IN_UP") {
                //
            } else if (context.action === "EMAIL_EXISTS") {
                //
            } else if (context.action === "EMAIL_PASSWORD_SIGN_IN") {
                //
            } else if (context.action === "EMAIL_PASSWORD_SIGN_UP") {
                //
            } else if (context.action === "SEND_RESET_PASSWORD_EMAIL") {
                //
            } else if (context.action === "SUBMIT_NEW_PASSWORD") {
                //
            }

            if (context.userContext === undefined) {
                //
            }

            const url: string = context.url;
            const fetchResponse: Response = context.fetchResponse;
            const requestInit: RequestInit = context.requestInit;
        },
    };

    return ThirdPartyEmailPassword.init(config);
}

// Passwordless Init

function getPasswordlessFunctions(original: PasswordlessRecipeInterface): PasswordlessRecipeInterface {
    return {
        createCode: async function (input) {
            return original.createCode(input);
        },
        resendCode: async function (input) {
            return original.resendCode(input);
        },
        consumeCode: async function (input) {
            return original.consumeCode(input);
        },
        doesEmailExist: async function (input) {
            return original.doesEmailExist(input);
        },
        doesPhoneNumberExist: async function (input) {
            return original.doesPhoneNumberExist(input);
        },
        getLoginAttemptInfo: async function (input) {
            return original.getLoginAttemptInfo(input);
        },
        setLoginAttemptInfo: async function (input) {
            return original.setLoginAttemptInfo(input);
        },
        clearLoginAttemptInfo: async function (input) {
            return original.clearLoginAttemptInfo(input);
        },
        getLinkCodeFromURL: function (input) {
            return original.getLinkCodeFromURL(input);
        },
        getPreAuthSessionIdFromURL: function (input) {
            return original.getPreAuthSessionIdFromURL(input);
        },
    };
}

function getPasswordless(): CreateRecipeFunction<PasswordlessAction> {
    const config: PasswordlessUserInput = {
        override: {
            functions: getPasswordlessFunctions,
        },
        preAPIHook: async function (context) {
            if (context.action === "EMAIL_EXISTS") {
                //
            } else if (context.action === "PASSWORDLESS_CONSUME_CODE") {
                //
            } else if (context.action === "PASSWORDLESS_CREATE_CODE") {
                //
            } else if (context.action === "PASSWORDLESS_RESEND_CODE") {
                //
            } else if (context.action === "PHONE_NUMBER_EXISTS") {
                //
            }

            if (context.userContext === undefined) {
                //
            }

            const url: string = context.url;
            const requestInit: RequestInit = context.requestInit;

            return {
                requestInit: context.requestInit,
                url: context.url,
            };
        },
        postAPIHook: async function (context) {
            if (context.action === "EMAIL_EXISTS") {
                //
            } else if (context.action === "PASSWORDLESS_CONSUME_CODE") {
                //
            } else if (context.action === "PASSWORDLESS_CREATE_CODE") {
                //
            } else if (context.action === "PASSWORDLESS_RESEND_CODE") {
                //
            } else if (context.action === "PHONE_NUMBER_EXISTS") {
                //
            }

            if (context.userContext === undefined) {
                //
            }

            const url: string = context.url;
            const fetchResponse: Response = context.fetchResponse;
            const requestInit: RequestInit = context.requestInit;
        },
    };

    return Passwordless.init(config);
}

// Third party passwordless init

function getThirdPartyPasswordlessFunctions(original: TPPRecipeInterface): TPPRecipeInterface {
    return {
        createPasswordlessCode: async function (input) {
            return original.createPasswordlessCode(input);
        },
        resendPasswordlessCode: async function (input) {
            return original.resendPasswordlessCode(input);
        },
        consumePasswordlessCode: async function (input) {
            return original.consumePasswordlessCode(input);
        },
        getPasswordlessLoginAttemptInfo: async function (input) {
            return original.getPasswordlessLoginAttemptInfo(input);
        },
        setPasswordlessLoginAttemptInfo: async function (input) {
            return original.setPasswordlessLoginAttemptInfo(input);
        },
        clearPasswordlessLoginAttemptInfo: async function (input) {
            return original.clearPasswordlessLoginAttemptInfo(input);
        },
        doesPasswordlessUserEmailExist: async function (input) {
            return original.doesPasswordlessUserEmailExist(input);
        },
        doesPasswordlessUserPhoneNumberExist: async function (input) {
            return original.doesPasswordlessUserPhoneNumberExist(input);
        },
        generateThirdPartyStateToSendToOAuthProvider: function (input) {
            return original.generateThirdPartyStateToSendToOAuthProvider(input);
        },
        verifyAndGetThirdPartyStateOrThrowError: function (input) {
            return original.verifyAndGetThirdPartyStateOrThrowError(input);
        },
        getAuthorisationURLFromBackend: async function (input) {
            return original.getAuthorisationURLFromBackend(input);
        },
        getThirdPartyAuthorisationURLWithQueryParamsAndSetState: async function (input) {
            return original.getThirdPartyAuthorisationURLWithQueryParamsAndSetState(input);
        },
        setThirdPartyStateAndOtherInfoToStorage: async function (input) {
            return original.setThirdPartyStateAndOtherInfoToStorage(input);
        },
        thirdPartySignInAndUp: async function (input) {
            return original.thirdPartySignInAndUp(input);
        },
        getPasswordlessLinkCodeFromURL: function (input) {
            return original.getPasswordlessLinkCodeFromURL(input);
        },
        getPasswordlessPreAuthSessionIdFromURL: function (input) {
            return original.getPasswordlessPreAuthSessionIdFromURL(input);
        },
        getThirdPartyAuthCodeFromURL: function (input) {
            return original.getThirdPartyAuthCodeFromURL(input);
        },
        getThirdPartyAuthErrorFromURL: function (input) {
            return original.getThirdPartyAuthErrorFromURL(input);
        },
        getThirdPartyAuthStateFromURL: function (input) {
            return original.getThirdPartyAuthStateFromURL(input);
        },
        getThirdPartyStateAndOtherInfoFromStorage: function (input) {
            return original.getThirdPartyStateAndOtherInfoFromStorage(input);
        },
    };
}

function getThirdPartyPasswordless(): CreateRecipeFunction<TPPlessAction> {
    const config: TPPUserInput = {
        override: {
            emailVerification: {
                functions: getEmailVerificationFunctions,
            },
            functions: getThirdPartyPasswordlessFunctions,
        },
        preAPIHook: async function (context) {
            if (context.action === "EMAIL_EXISTS") {
                //
            } else if (context.action === "PASSWORDLESS_CONSUME_CODE") {
                //
            } else if (context.action === "PASSWORDLESS_CREATE_CODE") {
                //
            } else if (context.action === "PASSWORDLESS_RESEND_CODE") {
                //
            } else if (context.action === "PHONE_NUMBER_EXISTS") {
                //
            } else if (context.action === "GET_AUTHORISATION_URL") {
                //
            } else if (context.action === "THIRD_PARTY_SIGN_IN_UP") {
                //
            } else if (context.action === "IS_EMAIL_VERIFIED") {
                //
            } else if (context.action === "SEND_VERIFY_EMAIL") {
                //
            } else if (context.action === "VERIFY_EMAIL") {
                //
            }

            if (context.userContext === undefined) {
                //
            }

            const url: string = context.url;
            const requestInit: RequestInit = context.requestInit;

            return {
                requestInit: context.requestInit,
                url: context.url,
            };
        },
        postAPIHook: async function (context) {
            if (context.action === "EMAIL_EXISTS") {
                //
            } else if (context.action === "PASSWORDLESS_CONSUME_CODE") {
                //
            } else if (context.action === "PASSWORDLESS_CREATE_CODE") {
                //
            } else if (context.action === "PASSWORDLESS_RESEND_CODE") {
                //
            } else if (context.action === "PHONE_NUMBER_EXISTS") {
                //
            } else if (context.action === "GET_AUTHORISATION_URL") {
                //
            } else if (context.action === "THIRD_PARTY_SIGN_IN_UP") {
                //
            } else if (context.action === "IS_EMAIL_VERIFIED") {
                //
            } else if (context.action === "SEND_VERIFY_EMAIL") {
                //
            } else if (context.action === "VERIFY_EMAIL") {
                //
            }

            if (context.userContext === undefined) {
                //
            }

            const url: string = context.url;
            const fetchResponse: Response = context.fetchResponse;
            const requestInit: RequestInit = context.requestInit;
        },
    };

    return ThirdPartyPasswordless.init(config);
}

// Session init

function getSessionFunctions(original: SessionRecipeInterface): SessionRecipeInterface {
    return {
        signOut: async function (input) {
            return original.signOut(input);
        },
        addAxiosInterceptors: function (input) {
            return original.addAxiosInterceptors(input);
        },
        addFetchInterceptorsAndReturnModifiedFetch: function (input) {
            return original.addFetchInterceptorsAndReturnModifiedFetch(input);
        },
        doesSessionExist: async function (input) {
            return original.doesSessionExist(input);
        },
        getAccessTokenPayloadSecurely: async function (input) {
            return original.getAccessTokenPayloadSecurely(input);
        },
        getUserId: async function (input) {
            return original.getUserId(input);
        },
    };
}

function getSession(): CreateRecipeFunction<SessionAction> {
    const config: SessionUserInput = {
        apiDomain: "",
        apiBasePath: "",
        autoAddCredentials: true,
        cookieDomain: "",
        isInIframe: false,
        sessionExpiredStatusCode: 440,
        sessionScope: "",
        onHandleEvent: function (event) {
            if (event.action === "REFRESH_SESSION") {
                //
            } else if (event.action === "SESSION_CREATED") {
                //
            } else if (event.action === "SIGN_OUT") {
                //
            } else if (event.action === "UNAUTHORISED") {
                //
            }

            if (event.userContext === undefined) {
                //
            }
        },
        override: {
            functions: getSessionFunctions,
        },
        preAPIHook: async function (context) {
            if (context.action === "REFRESH_SESSION") {
                //
            } else if (context.action === "SIGN_OUT") {
                //
            }

            if (context.userContext === undefined) {
                //
            }

            const url: string = context.url;
            const requestInit: RequestInit = context.requestInit;

            return {
                requestInit: context.requestInit,
                url: context.url,
            };
        },
        postAPIHook: async function (context) {
            if (context.action === "REFRESH_SESSION") {
                //
            } else if (context.action === "SIGN_OUT") {
                //
            }

            if (context.userContext === undefined) {
                //
            }

            const url: string = context.url;
            const fetchResponse: Response = context.fetchResponse;
            const requestInit: RequestInit = context.requestInit;
        },
    };

    return Session.init(config);
}

// SuperTokens init
const appInfo: AppInfoUserInput = {
    apiDomain: "http://localhost:8080",
    appName: "SuperTokens",
    apiBasePath: "/auth",
    apiGatewayPath: "/",
};

const recipeList: CreateRecipeFunction<any>[] = [
    getEmailverification(),
    getEmailPassword(),
    getThirdParty(),
    getThirdPartyEmailPassword(),
    getPasswordless(),
    getThirdPartyPasswordless(),
    getSession(),
];

const config: SuperTokensConfig = {
    appInfo,
    recipeList,
};

SuperTokens.init(config);