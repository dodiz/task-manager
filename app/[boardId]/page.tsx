import { Board } from "@/components/board";

export default function Page({
  params: { boardId },
}: {
  params: { boardId: string };
}) {
  return <Board boardId={+boardId} />;
}
