import { Board } from "@/components/board";

export default async function Page({
  params,
}: {
  params: Promise<{ boardId: string }>;
}) {
  const { boardId } = await params;
  return <Board boardId={+boardId} />;
}
