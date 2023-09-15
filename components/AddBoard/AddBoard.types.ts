export type AddBoardProps = {
  show: boolean;
  onHide: () => void;
};

export type EditBoardProps = AddBoardProps & {
  boardId: number;
};
