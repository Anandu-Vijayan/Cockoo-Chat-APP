import { FilterQuery, Model, Types } from "mongoose";
import { AbstractEntity } from "./abstract.entity";
import { Logger, NotFoundException } from "@nestjs/common";

export abstract class AbstractRespository<T extends AbstractEntity> {
    protected abstract readonly logger: Logger
    constructor(private readonly model: Model<T>) { }

    async create(document: Omit<T, '_id'>): Promise<T> {
        const createDocument = new this.model({
            ...document,
            _id: new Types.ObjectId(),
        })
        return (await createDocument.save()).toJSON() as unknown as T;
    }

    async findOne(filterQuery: FilterQuery<T>): Promise<T> {
        const document = await this.model.findOne(filterQuery, {}, { lean: true });
        if (!document) {
            this.logger.warn('Document not found with filterQuery:%o', filterQuery);
            throw new NotFoundException('Document')
        }

        return document as unknown as T;
    }
    async findOneAndUpdate(
        filterQuery: FilterQuery<T>
        , update: Partial<T>,
    ): Promise<T> {
        const document = await this.model.findOneAndUpdate(filterQuery, update, { lean: true, new: true });
        if (!document) {
            this.logger.warn('Document not found with filterQuery:%o', filterQuery);
            throw new NotFoundException('Document')
        }

        return document as unknown as T;
    }
    async find(filterQuery: FilterQuery<T>): Promise<T[]> {
        return this.model.find(filterQuery, {}, { lean: true, }) as unknown as T[];
    }

// lean: true used for return the plain data from mongodb

    async findOneAndDelete(filterQuery: FilterQuery<T>): Promise<T> {
        return this.model.findOneAndDelete(filterQuery, { lean: true }) as unknown as T;
    }

}
