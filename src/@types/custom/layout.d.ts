import type { ReactElement } from "react";

type LayoutProps<T> = ({
  children,
  props,
}: {
  children: ReactElement;
  props?: T;
}) => ReactElement;
