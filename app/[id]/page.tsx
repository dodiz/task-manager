import { Board } from "@/components";

export default function Page({ params: { id } }: { params: { id: string } }) {
  return <Board boardId={+id} />;
}
