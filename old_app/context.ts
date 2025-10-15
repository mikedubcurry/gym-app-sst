import { createContext } from "react";
import type { Member as User } from "db/types";

export const userContext = createContext<User | null>(null);
