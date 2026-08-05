import { ActionIcon, type ActionIconProps, Anchor, type AnchorProps } from "@mantine/core";
import { createLink, type LinkComponent } from "@tanstack/react-router";
import type { Ref } from "react";

/**
 * Mantine components wired up as router links.
 *
 * Mantine's polymorphic `component={Link}` prop widens the router to `AnyRouter`, which loses the
 * typed `to`/`params` inference. `createLink` keeps it, so prefer these over `component={Link}`.
 * See https://tanstack.com/router/latest/docs/framework/react/guide/custom-link
 */

function AnchorLinkComponent(props: Omit<AnchorProps, "href"> & { ref?: Ref<HTMLAnchorElement> }) {
  return <Anchor {...props} />;
}

const CreatedAnchorLink = createLink(AnchorLinkComponent);

export const AnchorLink: LinkComponent<typeof AnchorLinkComponent> = (props) => (
  <CreatedAnchorLink {...props} />
);

function ActionIconLinkComponent(
  props: Omit<ActionIconProps, "href"> & { ref?: Ref<HTMLAnchorElement> },
) {
  return <ActionIcon component="a" {...props} />;
}

const CreatedActionIconLink = createLink(ActionIconLinkComponent);

export const ActionIconLink: LinkComponent<typeof ActionIconLinkComponent> = (props) => (
  <CreatedActionIconLink {...props} />
);
