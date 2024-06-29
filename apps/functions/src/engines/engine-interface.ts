import { Board } from "@/entities/board";

export interface Engine {
  crawl(board: Board): Promise<string[]>;
}
