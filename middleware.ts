export { default } from "next-auth/middleware";

export const config = { matcher: ["/", "/users", "/users/new", "/leaves"] };
