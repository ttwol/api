import { Repository, getRepository } from 'typeorm';

abstract class BaseRepository<T> {
  private _entityName: string;

  constructor(entityName: string) {
    this._entityName = entityName;
  }

  async create(item: T): Promise<T> {
    const repository = this.createRepository();
    return await repository.save(item);
  }

  async update(item: T): Promise<T> {
    const repository = this.createRepository();
    const id = repository.getId(item);
    await repository.update(id, item);
    return await repository.findOneOrFail(id);
  }

  async delete(id: string): Promise<boolean> {
    const repository = this.createRepository();
    await repository.delete(id);
    return true;
  }

  async findOne(id: string): Promise<T> {
    const repository = this.createRepository();
    return await repository.findOneOrFail(id);
  }

  async findAll(): Promise<T[]> {
    const repository = this.createRepository();
    return await repository.find();
  }

  protected createRepository(): Repository<T> {
    const repo = getRepository(this._entityName);
    return repo as Repository<T>;
  }
}

export default BaseRepository;
