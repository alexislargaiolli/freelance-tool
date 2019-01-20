// import { DeepPartial, ObjectLiteral, Repository } from 'typeorm';

// export abstract class RESTService<Entity extends ObjectLiteral> {

//     constructor(
//         protected readonly repository: Repository<Entity>,
//     ) { }

//     async findById(id: number) {
//         return this.repository.findOne(id);
//     }

//     async findAll(): Promise<Entity[]> {
//         return this.repository.find();
//     }

//     async create(entityLike: DeepPartial<Entity>) {
//         return this.repository.save(entityLike);
//     }

//     async update(id: number, partialEntity: DeepPartial<Entity>) {
//         partialEntity = { ...partialEntity, id };
//         const entity = await this.repository.preload(partialEntity);

//         return this.repository.update(id, entity);
//     }

//     async delete(id: number) {
//         return this.repository.delete(id);
//     }

// }
