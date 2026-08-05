import { Anchor, Button, ActionIcon, type ButtonProps, type ActionIconProps } from "@mantine/core";
import { createLink } from "@tanstack/react-router";
import type { Ref } from "react";

// #region AnchorLink
/**
 * Mantine's `Anchor`, wired up as a TanStack Router `Link`.
 *
 * @remarks
 * Accepts both `Anchor`'s props and `Link`'s routing props (`to`, `params`, `search`, ...).
 *
 * @example
 * ```tsx
 * <AnchorLink to="/about">About</AnchorLink>
 * ```
 */
export const AnchorLink = createLink(Anchor);
// #endregion AnchorLink

// #region ButtonLink
interface ButtonLinkComponentProps extends Omit<ButtonProps, "component"> {
  ref?: Ref<HTMLAnchorElement>;
}

function ButtonLinkComponent({ ref, ...props }: ButtonLinkComponentProps) {
  return <Button ref={ref} component="a" {...props} />;
}

/**
 * Mantine's `Button` rendered as an anchor, wired up as a TanStack Router `Link`.
 *
 * @remarks
 * Accepts both `Button`'s props and `Link`'s routing props (`to`, `params`, `search`, ...).
 *
 * @example
 * ```tsx
 * <ButtonLink to="/about">About</ButtonLink>
 * ```
 */
export const ButtonLink = createLink(ButtonLinkComponent);
// #endregion ButtonLink

// #region ActionIconLink
interface ActionIconComponentProps extends Omit<ActionIconProps, "component"> {
  ref?: Ref<HTMLAnchorElement>;
}

function ActionIconComponent({ ref, ...props }: ActionIconComponentProps) {
  return <ActionIcon ref={ref} component="a" {...props} />;
}

/**
 * Mantine's `ActionIcon` rendered as an anchor, wired up as a TanStack Router `Link`.
 *
 * @remarks
 * Accepts both `ActionIcon`'s props and `Link`'s routing props (`to`, `params`, `search`, ...).
 *
 * @example
 * ```tsx
 * <ActionIconLink to="/about"><InfoIcon /></ActionIconLink>
 * ```
 */
export const ActionIconLink = createLink(ActionIconComponent);
// #endregion ActionIconLink
