import { DataSource, DeleteResult, EntityRepository, Repository } from "typeorm";
import { Board } from "./board.entity";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatus } from "./board-status.enum";
import { User } from "src/auth/user.entity";

@EntityRepository(Board)
export class BoardRepository extends Repository<Board>{
    constructor(private dataSource: DataSource) {
        super(Board, dataSource.createEntityManager());
    }

    async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        const { title, description } = createBoardDto;

        const board = this.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
            user
        })

        await this.save(board);

        return board;
    }

    async deleteBoard (id: number, user:User) : Promise<DeleteResult> {
        const query = await this.createQueryBuilder('board');

        const result = await query
        .delete()
        .from(Board)
        .where('userId = :userId', {userId : user.id})
        .andWhere('id = :id', {id})
        .execute();

        return result;

    }
}