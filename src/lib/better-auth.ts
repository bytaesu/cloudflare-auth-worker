import * as authSchema from '../db/schemas/auth';
import { betterAuth } from 'better-auth';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { openAPI } from 'better-auth/plugins';

/**
 * Creates a Better-Auth instance configured for the current Cloudflare Worker environment.
 * The `env` is sourced from `.dev.vars` (local) or Secrets (production).
 *
 * Configuration Docs: https://www.better-auth.com/docs/reference/options
 */
export const auth = (env: CloudflareBindings) => {
  const sql = neon(env.DATABASE_URL);
  const db = drizzle(sql, { schema: { ...authSchema } });

  return betterAuth({
    // The name of the application.
    appName: 'your-app-name',
    // Base path for Better Auth. This is typically the path where the Better Auth routes are mounted.
    // Default: /api/auth
    basePath: '/',
    // Base URL for Better Auth. This is typically the root URL where your application server is hosted.
    // If not explicitly set, the system will check for the environment variable process.env.BETTER_AUTH_URL
    baseURL: env.BETTER_AUTH_URL,
    // The secret used for encryption, signing, and hashing.
    // Default: process.env.BETTER_AUTH_SECRET
    secret: env.BETTER_AUTH_SECRET,

    /**
     * Database
     * Docs: https://www.better-auth.com/docs/concepts/database
     */
    database: drizzleAdapter(db, {
      provider: 'pg',
      schema: {
        user: authSchema.user,
        session: authSchema.session,
        account: authSchema.account,
        verification: authSchema.verification,
      },
    }),

    /**
     * Better-Auth plugins
     */
    plugins: [openAPI()],

    // /**
    //  * Email verification
    //  */
    // emailVerification: {
    //   // Function to send verification email
    //   sendOnSignUp: true,
    //   // Auto sign in the user after they verify their email
    //   autoSignInAfterVerification: true,
    //   // Number of seconds the verification token is valid for (default: 3600 seconds)
    //   expiresIn: 3600,
    //   // Function to send verification email
    //   sendVerificationEmail: async ({ user, url, token }) => {
    //     // Send verification email to user
    //   },
    // },

    // /**
    //  * Email & password
    //  */
    // emailAndPassword: {
    //   // Enable email and password authentication (default: false)
    //   enabled: false,
    //   // Disable email and password sign up (default: false)
    //   disableSignUp: true,
    //   // Require email verification before a session can be created
    //   requireEmailVerification: true,
    //   // Minimum password length (default: 8)
    //   minPasswordLength: 8,
    //   // Maximum password length (default: 128)
    //   maxPasswordLength: 128,
    //   // Automatically sign in the user after sign up
    //   autoSignIn: true,
    //   // Number of seconds the reset password token is valid for (default: 3600 seconds)
    //   resetPasswordTokenExpiresIn: 3600,
    //   // Function to send reset password email
    //   sendResetPassword: async ({ user, url, token }) => {
    //     // Send reset password email
    //   },
    //   // // Custom password hashing and verification functions
    //   // password: {
    //   //   hash: async (password) => {
    //   //     // Custom password hashing
    //   //     return hashedPassword;
    //   //   },
    //   //   verify: async ({ hash, password }) => {
    //   //     // Custom password verification
    //   //     return isValid;
    //   //   }
    //   // }
    // },

    // /**
    //  * Social login providers
    //  */
    // socialProviders: {
    //   google: {
    //     clientId: 'your-client-id',
    //     clientSecret: 'your-client-secret',
    //     redirectUri: 'https://example.com/api/auth/callback/google',
    //   },
    // },

    /**
     * User configuration options
     */
    // user: {
    //   // The model name for the user (default: "user")
    //   modelName: "users",
    //   // Map fields to different column names
    //   fields: {
    //     email: "emailAddress",
    //     name: "fullName"
    //   },
    //   // Additional fields for the user table
    //   additionalFields: {
    //     customField: {
    //       type: "string",
    //       nullable: true
    //     }
    //   },
    //   // Configuration for changing email
    //   changeEmail: {
    //     enabled: true,
    //     sendChangeEmailVerification: async ({ user, newEmail, url, token }) => {
    //       // Send change email verification
    //     }
    //   },
    //   //  Configuration for user deletion
    //   deleteUser: {
    //     enabled: true,
    //     sendDeleteAccountVerification: async ({ user, url, token }) => {
    //       // Send delete account verification
    //     },
    //     beforeDelete: async (user) => {
    //       // Perform actions before user deletion
    //     },
    //     afterDelete: async (user) => {
    //       // Perform cleanup after user deletion
    //     }
    //   }
    // },

    /**
     * Session configuration options
     */
    // session: {
    //   // The model name for the session (default: "session")
    //   modelName: 'sessions',
    //   // Map fields to different column names
    //   fields: {
    //     userId: 'user_id',
    //   },
    //   // Expiration time for the session token in seconds (default: 604800 - 7 days)
    //   expiresIn: 604800,
    //   // How often the session should be refreshed in seconds (default: 86400 - 1 day)
    //   updateAge: 86400,
    //   disableSessionRefresh: true, // Disable session refresh so that the session is not updated regardless of the `updateAge` option. (default: `false`)
    //   // Additional fields for the session table
    //   additionalFields: {
    //     customField: {
    //       type: 'string',
    //       nullable: true,
    //     },
    //   },
    //   // Store session in database when secondary storage is provided (default: false)
    //   storeSessionInDatabase: true,
    //   // Preserve session records in database when deleted from secondary storage (default: false)
    //   preserveSessionInDatabase: false,
    //   // Enable caching session in cookie
    //   cookieCache: {
    //     // Enable caching session in cookie (default: false)
    //     enabled: true,
    //     // (default: 300 - 5 minutes)
    //     maxAge: 300,
    //   },
    // },

    /**
     * Account configuration options
     */
    // account: {
    //   // The model name for the account
    //   modelName: 'accounts',
    //   // Map fields to different column names
    //   fields: {
    //     userId: 'user_id',
    //   },
    //   // If enabled (true),
    //   // the user account data (accessToken, idToken, refreshToken, etc.)
    //   // will be updated on sign in with the latest data from the provider.
    //   updateAccountOnSignIn: true,
    //   // Configuration for account linking.
    //   // - enabled: Enable account linking (default: false)
    //   // - trustedProviders: List of trusted providers
    //   // - allowDifferentEmails: Allow users to link accounts with different email addresses
    //   // - allowUnlinkingAll: Allow users to unlink all accounts
    //   accountLinking: {
    //     enabled: true,
    //     trustedProviders: ['google', 'github', 'email-password'],
    //     allowDifferentEmails: false,
    //   },
    // },

    /**
     * Verification configuration options
     */
    // verification: {
    //   // The model name for the verification table
    //   modelName: "verifications",
    //   // Map fields to different column names
    //   fields: {
    //     createdAt: "created_at"
    //   },
    //   // Disable cleaning up expired values when a verification value is fetched
    //   disableCleanup: false
    // },

    // /**
    //  * Rate limiting configuration.
    //  */
    // rateLimit: {
    //   // Enable rate limiting (defaults: true in production, false in development)
    //   enabled: true,
    //   // Time window to use for rate limiting. The value should be in seconds. (default: 10)
    //   window: 10,
    //   // The default maximum number of requests allowed within the window. (default: 100)
    //   max: 100,
    //   // Custom rate limit rules to apply to specific paths.
    //   customRules: {
    //     '/example/path': {
    //       window: 10,
    //       max: 100,
    //     },
    //   },
    //   // Storage configuration.
    //   // If you passed a secondary storage, rate limiting will be stored in the secondary storage.
    //   // (options: "memory", "database", "secondary-storage", default: "memory")
    //   storage: 'memory',
    //   // The name of the table to use for rate limiting if database is used as storage. (default: "rateLimit")
    //   modelName: 'rateLimit',
    // },

    // /**
    //  * Advanced configuration options
    //  */
    // advanced: {
    //   // IP address configuration for rate limiting and session tracking
    //   ipAddress: {
    //     ipAddressHeaders: ["x-client-ip", "x-forwarded-for"],
    //     disableIpTracking: false
    //   },
    //   // Use secure cookies (default: false)
    //   useSecureCookies: true,
    //   // Disable trusted origins check (⚠️ security risk)
    //   disableCSRFCheck: false,
    //   // Configure cookies to be shared across subdomains
    //   crossSubDomainCookies: {
    //     enabled: true,
    //     additionalCookies: ["custom_cookie"],
    //     domain: "example.com"
    //   },
    //   // Customize cookie names and attributes
    //   cookies: {
    //     session_token: {
    //       name: "custom_session_token",
    //       attributes: {
    //         httpOnly: true,
    //         secure: true
    //       }
    //     }
    //   },
    //   // Default attributes for all cookies
    //   defaultCookieAttributes: {
    //     httpOnly: true,
    //     secure: true
    //   },
    //   // Prefix for cookies
    //   cookiePrefix: "myapp",
    //   database: {
    //     // If your DB is using auto-incrementing IDs, set this to true.
    //     useNumberId: false,
    //     // Use your own custom ID generator, or disable generating IDs as a whole.
    //     generateId: (((options: {
    //       model: LiteralUnion<Models, string>;
    //       size?: number;
    //     }) => {
    //       return "my-super-unique-id";
    //     })) | false,
    //     defaultFindManyLimit: 100,
    //   }
    // },

    // /**
    //  * Database lifecycle hooks for core operations.
    //  */
    // databaseHooks: {
    //   user: {
    //     create: {
    //       before: async (user) => {
    //         // Modify user data before creation
    //         return { data: { ...user, customField: "value" } };
    //       },
    //       after: async (user) => {
    //         // Perform actions after user creation
    //       }
    //     },
    //     update: {
    //       before: async (userData) => {
    //         // Modify user data before update
    //         return { data: { ...userData, updatedAt: new Date() } };
    //       },
    //       after: async (user) => {
    //         // Perform actions after user update
    //       }
    //     }
    //   },
    //   session: {
    //     // Session hooks
    //   },
    //   account: {
    //     // Account hooks
    //   },
    //   verification: {
    //     // Verification hooks
    //   }
    // },

    // /**
    //  * API error handling configuration
    //  */
    // onAPIError: {
    //   // Throw an error on API error (default: false)
    //   throw: true,
    //   // Custom error handler
    //   onError: (error, ctx) => {
    //     // Custom error handling
    //     console.error("Auth error:", error);
    //   },
    //   // URL to redirect to on error (default: /api/auth/error)
    //   errorURL: "/error"
    // },

    // /**
    //  * Request lifecycle hooks.
    //  */
    // hooks: {
    //   before: async (request, ctx) => {
    //     // Execute before processing the request
    //   },
    //   after: async (request, response, ctx) => {
    //     // Execute after processing the request
    //   }
    // },

    /**
     * Disable specific auth paths.
     */
    // disabledPaths: ["/sign-up/email", "/sign-in/email"],
  });
};
