import { FilterQuery, Model, Types } from "mongoose";
import { AbstractDocument } from "./abstract.schema";
import { Logger, NotFoundException } from "@nestjs/common";

export abstract class AbstractRespository<TDocument extends AbstractDocument> {
    protected abstract readonly logger: Logger
    constructor(private readonly model: Model<TDocument>) { }

    async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
        const createDocument = new this.model({
            ...document,
            _id: new Types.ObjectId(),
        })
        return (await createDocument.save()).toJSON() as unknown as TDocument;
    }

    async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
        const document = await this.model.findOne(filterQuery, {}, { lean: true });
        if (!document) {
            this.logger.warn('Document not found with filterQuery:%o', filterQuery);
            throw new NotFoundException('Document')
        }

        return document as unknown as TDocument;
    }
    async findOneAndUpdate(
        filterQuery: FilterQuery<TDocument>
        , update: Partial<TDocument>,
    ): Promise<TDocument> {
        const document = await this.model.findOneAndUpdate(filterQuery, update, { lean: true, new: true });
        if (!document) {
            this.logger.warn('Document not found with filterQuery:%o', filterQuery);
            throw new NotFoundException('Document')
        }

        return document as unknown as TDocument;
    }
    async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
        return this.model.find(filterQuery, {}, { lean: true, }) as unknown as TDocument[];
    }

// lean: true used for return the plain data from mongodb

    async findOneAndDelete(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
        return this.model.findOneAndDelete(filterQuery, { lean: true }) as unknown as TDocument;
    }

}
