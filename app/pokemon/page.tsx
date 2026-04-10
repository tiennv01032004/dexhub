import { Suspense } from "react";
import PokemonWrapper from "./components";

export default function Pokemon() {
  return (
    <Suspense>
      <PokemonWrapper />;
    </Suspense>
  );
}
