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

import { getNormalisedUserContext } from "../../utils";
import { RecipeFunctionOptions } from "../emailpassword";
import Recipe from "./recipe";
import {
    PreAndPostAPIHookAction,
    PreAPIHookContext,
    PostAPIHookContext,
    StateObject,
    RecipeInterface,
    UserInput,
    ThirdPartyUserType,
} from "./types";

export default class RecipeWrapper {
    static init(config?: UserInput) {
        return Recipe.init(config);
    }

    static signOut(input?: { userContext?: any }) {
        return Recipe.getInstanceOrThrow().signOut({
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    /**
     * Get the URL that should be opened for third party authentication
     *
     * @param providerId The identifier for the third party provider. The value must match one of the providers configured with the backend SDK
     *
     * @param authorisationURL The URL that should be used for redirection after the third party flow finishes. This is ignored if the backend has a pre-configured redirect_url
     *
     * @param providerClientId (OPTIONAL) Client id to be used for the third party provider
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdparty/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns URL string
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static getAuthorisationURLWithQueryParamsAndSetState(input: {
        providerId: string;
        authorisationURL: string;
        providerClientId?: string;
        userContext?: any;
        options?: RecipeFunctionOptions;
    }): Promise<string> {
        return Recipe.getInstanceOrThrow().recipeImplementation.getAuthorisationURLWithQueryParamsAndSetState({
            ...input,
            userContext: getNormalisedUserContext(input.userContext),
        });
    }

    /**
     * Sign up/Sign in the user, this method uses the login attempt information from storage
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdparty/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: OK, user, createdNewUser: boolean}` if succesful
     *
     * @returns `{status: "NO_EMAIL_GIVEN_BY_PROVIDER"}` if the correct scopes are not configured for the third party provider
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static signInAndUp(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<
        | {
              status: "OK";
              user: ThirdPartyUserType;
              createdNewUser: boolean;
              fetchResponse: Response;
          }
        | {
              status: "NO_EMAIL_GIVEN_BY_PROVIDER";
              fetchResponse: Response;
          }
    > {
        return Recipe.getInstanceOrThrow().recipeImplementation.signInAndUp({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    /**
     * Verify an email
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdparty/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK"}` if successfull
     * @returns `{status: "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR"}` if token is invalid
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static async verifyEmail(input?: { options?: RecipeFunctionOptions; userContext?: any }): Promise<{
        status: "OK" | "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR";
        fetchResponse: Response;
    }> {
        return Recipe.getInstanceOrThrow().emailVerificationRecipe.recipeImplementation.verifyEmail({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    /**
     * Send an email to the user for verification.
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdparty/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK"}` if successfull
     * @returns `{status: "EMAIL_ALREADY_VERIFIED_ERROR"}` if the email has already been verified
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static async sendVerificationEmail(input?: { options?: RecipeFunctionOptions; userContext?: any }): Promise<{
        status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK";
        fetchResponse: Response;
    }> {
        return Recipe.getInstanceOrThrow().emailVerificationRecipe.recipeImplementation.sendVerificationEmail({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }

    /**
     * Check if an email has been verified
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/thirdparty/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", isVerified: boolean}`
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static async isEmailVerified(input?: { options?: RecipeFunctionOptions; userContext?: any }): Promise<{
        status: "OK";
        isVerified: boolean;
        fetchResponse: Response;
    }> {
        return Recipe.getInstanceOrThrow().emailVerificationRecipe.recipeImplementation.isEmailVerified({
            ...input,
            userContext: getNormalisedUserContext(input?.userContext),
        });
    }
}

const init = RecipeWrapper.init;
const getAuthorisationURLWithQueryParamsAndSetState = RecipeWrapper.getAuthorisationURLWithQueryParamsAndSetState;
const signInAndUp = RecipeWrapper.signInAndUp;
const verifyEmail = RecipeWrapper.verifyEmail;
const sendVerificationEmail = RecipeWrapper.sendVerificationEmail;
const isEmailVerified = RecipeWrapper.isEmailVerified;

const signOut = RecipeWrapper.signOut;

export {
    init,
    getAuthorisationURLWithQueryParamsAndSetState,
    signInAndUp,
    verifyEmail,
    sendVerificationEmail,
    isEmailVerified,
    signOut,
    RecipeInterface,
    StateObject,
    PreAPIHookContext,
    PostAPIHookContext,
    PreAndPostAPIHookAction,
    UserInput,
    ThirdPartyUserType,
};
