import { Suspense, ReactNode } from "react";
import LoadingSpinner from "@/frontend-resourses/components/Tables/TablaExpansible/components/LoadingSpinner";

export function LazyPage(node: ReactNode) {
  return <Suspense fallback={<LoadingSpinner />}>{node}</Suspense>;
}

export function lazyNamed<T extends object, K extends keyof T>(
  importer: () => Promise<T>,
  key: K
) {
  return () =>
    importer().then((m) => ({
      default: m[key] as unknown as React.ComponentType<any>,
    }));
}
