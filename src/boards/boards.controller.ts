import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.model';

@Controller('boards')
export class BoardsController {
    /**
     * 여기서 dependency injection이 일어난다
     * typescript의 영향으로 아래와 같은 코드가 가능한데
     * 본래는 boardsService 프로퍼티를 따로 생성하고
     * 생성자 인자를 그 프로퍼티에 할당해주는 모양으로 만들어진다.
     * 
     * EX)
     * boardsService: BoardsService;
     * 
     * constructor(boardsService:BoardsService){
     *  this.boardsService = boardsService;
     * }
     * 
     * private 접근제한자가 생성자 안에서 사용되므로 인해서 해당 프로퍼티가 생성된다.
     * @param boardsService 
     */
    constructor(private boardsService: BoardsService) { }

    @Get()
    getAllBoard(): Board[] {
        return this.boardsService.getAllBoards();
    }

    @Post()
    createBoard(
        @Body('title') title: string,
        @Body('description') description: string
    ): Board {
        return this.boardsService.createBoard(title, description);
    }
}
