import { Suspense } from "react";
import ItemWrapper from "./components";

export default function ItemPage() {
  return (
    <Suspense>
      <ItemWrapper />;
    </Suspense>
  );
}
