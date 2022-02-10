/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
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
import { InputType, NormalisedInputType, PreAPIHookContext, RecipeInterface } from "./types";

export function normaliseUserInput(config: InputType): NormalisedInputType {
    const override: any = {
        functions: (originalImplementation: RecipeInterface) => originalImplementation,
        ...config.override,
    };

    let preAPIHook = config.preAPIHook;

    if (preAPIHook === undefined) {
        preAPIHook = async (context: PreAPIHookContext) => context;
    }

    let postAPIHook = config.postAPIHook;

    if (postAPIHook === undefined) {
        postAPIHook = async () => {};
    }

    return {
        recipeId: config.recipeId,
        appInfo: config.appInfo,
        preAPIHook,
        postAPIHook,
        override,
    };
}