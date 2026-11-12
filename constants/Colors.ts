import { colors } from "@/theme";

/**
 * @deprecated Legacy color map. Values now come from `theme/colors.ts`.
 * New code: `import { colors } from "@/theme"`. Existing usages are migrated
 * file by file in Phase 2 (see PROJECT.md D-019).
 *
 * Removed (unused): `ColorsBarber.light`, `ColorsHairSalon` — app is dark-only (D-004).
 */
export const ColorsBarber = {
  dark: {
    priceColor: colors.gold,
    starColor: colors.gold,
    personIcon: colors.gold,
    locationIcon: colors.danger,
    arrowIcon: colors.iconMuted,
    text: colors.textDark,
    selectedDayBackgroundColor: colors.white,
    background: colors.background,
    backgroundModal: colors.surfaceModal,
    btnContent: colors.surface,
    inputField: colors.white,
    item: colors.surface,
    icon: colors.icon,
    tabIconDefault: colors.icon,
    textColor: colors.text,
    cardReservationPast: colors.surfaceModal,
    textColorDeactivated: colors.textDeactivated,
    textColorInput: colors.textOnLight,
    textColorInputDisabled: colors.disabled,
    inputDisabled: colors.disabled,
    inputColor: colors.white,
    inActiveTextColor: colors.textInactive,
    tabIconSelected: colors.tint,
    btnBgColor: colors.black,
    btnBgColorDisabled: colors.disabled,
    borderColor: colors.white,
    borderColorDisabeld: colors.disabled,
  },
};
