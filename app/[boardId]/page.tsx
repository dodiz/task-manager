import { Board } from "@/components";

export default function Page({
  params: { boardId },
}: {
  params: { boardId: string };
}) {
  return <Board boardId={+boardId} />;
}
