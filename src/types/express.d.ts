// src/types/custom.d.ts or anywhere in your type declarations
import { User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: User | null;
    }
  }
}