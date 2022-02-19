interface Position {
  x: number;
  y: number;
  z: number;
}

type XYPosition = Pick<Position, "x" | "y">;

const position: XYPosition = {
  x: 1,
  y: 2,
};
