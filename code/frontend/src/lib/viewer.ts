import { useSession, type Session } from "./session";
import { useDemo } from "./demo";

/**
 * Who the page should draw for.
 *
 * A dashboard, a back office or an account page has nothing on it until
 * somebody has signed in — and the Studio's canvas, the owner's preview and
 * the walk all open it as a visitor who has clicked nothing. useViewer()
 * returns the real session when there is one, and a representative operator
 * while the design is being drawn or walked, so those pages are never
 * approved as an empty gate. The signed-out state is still there: a real
 * visitor with no session sees it, because useDemo() is false for them.
 */
export function useViewer(): Session | null {
  const session = useSession();
  const demo = useDemo();
  if (session) return session;
  if (demo) return { email: "operator@example.jp", name: "Operator" };
  return null;
}
