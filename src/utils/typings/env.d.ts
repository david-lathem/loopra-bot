declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      FORUM_CHANNEL_ID: string;
      TICKET_CATEGORY_ID: string;
    }
  }
}

// // If this file has no import/export statements (i.e. is a script)
// // convert it into a module by adding an empty export statement.
export {};
