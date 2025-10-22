import { Link as RRDLink, type LinkProps } from "react-router";
import React from "react";

export function Link({ to, children, ...props }: LinkProps) {
  return (
    <RRDLink viewTransition to={to} {...props}>
      {children}
    </RRDLink>
  );
}
