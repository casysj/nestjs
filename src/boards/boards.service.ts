import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';

/**
 * 종속성 주입이 일어나서 이게 컨트롤러에서 사용할 수 있게된다.
 */
@Injectable()
export class BoardsService {
    // boards의 타입이 배열이어서 Board[] 임
    private boards: Board[] = [];


    getAllBoards(): Board[] {
        return this.boards
    }

    createBoard(title: string, description: string): Board {
        const board: Board = {
            id: uuid(),
            title, // title: title
            description: description,
            status: BoardStatus.PUBLIC
        }

        this.boards.push(board);
        return board;
    }
}
