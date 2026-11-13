import { ReactNode } from "react";

import { Screen } from "@/components/ui/Screen";

/** @deprecated Use `<Screen mode="form">` from `@/components/ui` instead. */
export default function WrapperAuth({ children }: { children: ReactNode }) {
  return <Screen mode="form">{children}</Screen>;
}
