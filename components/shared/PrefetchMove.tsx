// Components/shared/PrefetchMove.tsx
import { useGetMoveDetailQuery } from "@/store/services/pokeApi";

export default function PrefetchMove({ name }: { name: string }) {
  useGetMoveDetailQuery(name);
  return null;
}
