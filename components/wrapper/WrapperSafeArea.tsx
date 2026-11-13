import type { ComponentType, JSX } from "react";

import { Screen } from "@/components/ui/Screen";

/** @deprecated Wrap the screen in `<Screen>` from `@/components/ui` instead. */
export default function withSafeArea<T>(WrapperComponent: ComponentType<T>) {
  return function SafeAreaScreen(props: T & JSX.IntrinsicAttributes) {
    return (
      <Screen mode="safe">
        <WrapperComponent {...props} />
      </Screen>
    );
  };
}
