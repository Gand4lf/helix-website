// utils/amplify-utils.ts
import { cookies } from "next/headers";

import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import { getCurrentUser } from "aws-amplify/auth/server";

const config = {
    Auth: {
        Cognito: {
            
            userPoolId: 'eu-west-2_gPaJfgA4L',
            userPoolClientId: '4as7mn137kbdtd4a6c0ef7pel',
        }
    }
}

export const { runWithAmplifyServerContext } = createServerRunner({
  config: config
});

export const cookiesClient = generateServerClientUsingCookies({
  config: config,
  cookies,
});

export async function AuthGetCurrentUserServer() {
  try {
    const currentUser = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => getCurrentUser(contextSpec),
    });
    return currentUser;
  } catch (error) {
    console.error(error);
  }
}