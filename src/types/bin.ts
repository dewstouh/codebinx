// import { binSearchParams } from "@/lib/BinSearchParams";
import { Bin, User } from "@prisma/client";

export interface BinWithAuthor extends Bin {
    author: Pick<User, "clerkUserId" | "username" | "avatarUrl">
}