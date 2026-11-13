import type { ComponentType, JSX } from "react";

import { Screen } from "@/components/ui/Screen";

/** @deprecated Wrap the screen in `<Screen mode="keyboard">` from `@/components/ui` instead. */
export default function withKeyboardAvoid<T>(WrapperComponent: ComponentType<T>) {
  return function KeyboardAvoidScreen(props: T & JSX.IntrinsicAttributes) {
    return (
      <Screen mode="keyboard">
        <WrapperComponent {...props} />
      </Screen>
    );
  };
}
