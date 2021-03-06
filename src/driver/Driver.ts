import {SchemaBuilder} from "../schema-builder/SchemaBuilder";
import {ColumnMetadata} from "../metadata/ColumnMetadata";
import {ConnectionOptions} from "../connection/ConnectionOptions";

/**
 * Driver communicates with specific database.
 */
export interface Driver {

    /**
     * Access to the native implementation of the database.
     */
    readonly native: any;

    /**
     * Access to the connection of the native interface of the database.
     */
    readonly nativeConnection: any;

    /**
     * Connection options used in this driver.
     */
    connectionOptions: ConnectionOptions;
    
    /**
     * Database name to which this connection is made.
     */
    readonly db: string;
    
    /**
     * Creates a schema builder which can be used to build database/table schemas.
     */
    createSchemaBuilder(): SchemaBuilder;

    /**
     * Performs connection to the database based on given connection options.
     */
    connect(): Promise<void>;

    /**
     * Closes connection with database.
     */
    disconnect(): Promise<void>;

    /**
     * Executes a given SQL query and returns raw database results.
     */
    query<T>(query: string): Promise<T>;

    /**
     * Removes all tables from the currently connected database.
     */
    clearDatabase(): Promise<void>;

    /**
     * Updates rows that match given simple conditions in the given table.
     */
    update(tableName: string, valuesMap: Object, conditions: Object): Promise<void>;

    /**
     * Inserts a new row into given table.
     */
    insert(tableName: string, valuesMap: Object): Promise<any>;

    /**
     * Performs a simple DELETE query by a given conditions in a given table.
     */
    delete(tableName: string, conditions: Object): Promise<void>;
    
    /**
     * Starts transaction.
     */
    beginTransaction(): Promise<void>;
    
    /**
     * Commits transaction.
     */
    commitTransaction(): Promise<void>;
    
    /**
     * Ends transaction.
     */
    rollbackTransaction(): Promise<void>;
    
    /**
     * Checks if transaction has been already started.
     */
    isTransactionActive(): boolean;

    /**
     * Prepares given value to a value to be persisted, based on its column type and metadata.
     */
    preparePersistentValue(value: any, column: ColumnMetadata): any;

    /**
     * Prepares given value to a value to be hydrated, based on its column type and metadata.
     */
    prepareHydratedValue(value: any, column: ColumnMetadata): any;

    /**
     * Escapes given value.
     */
    escape(value: any): any;

    /**
     * Inserts new values into closure table.
     */
    insertIntoClosureTable(tableName: string, newEntityId: any, parentId: any, hasLevel: boolean): Promise<number>;
    
}