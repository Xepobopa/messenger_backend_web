import { AbstractEntity } from 'src/global/entity/abstract.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { RoomEntity } from './room.dto';

@Entity('message')
export class MessageEntity extends AbstractEntity {
    @Column()
    message: string;

    @Column('timestamptz')
    date: Date;

    @ManyToOne(() => UserEntity, (user) => user.id)
    from: UserEntity;

    @ManyToOne(() => RoomEntity, (room) => room.id)
    to: RoomEntity;
}
