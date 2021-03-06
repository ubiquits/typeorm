import {RelationOptions} from "../options/RelationOptions";
import {RelationTypes} from "../../metadata/types/RelationTypes";
import {getMetadataArgsStorage} from "../../index";
import {ConstructorFunction} from "../../common/ConstructorFunction";
import {RelationMetadataArgs} from "../../metadata-args/RelationMetadataArgs";

/**
 * One-to-one relation allows to create direct relation between two entities. Entity1 have only one Entity2.
 * Entity1 is an owner of the relationship, and storages Entity1 id on its own side.
 */
export function OneToOne<T>(typeFunction: (type?: any) => ConstructorFunction<T>, options?: RelationOptions): Function;

/**
 * One-to-one relation allows to create direct relation between two entities. Entity1 have only one Entity2.
 * Entity1 is an owner of the relationship, and storages Entity1 id on its own side.
 */
export function OneToOne<T>(typeFunction: (type?: any) => ConstructorFunction<T>,
                            inverseSide?: string|((object: T) => any),
                            options?: RelationOptions): Function;

/**
 * One-to-one relation allows to create direct relation between two entities. Entity1 have only one Entity2.
 * Entity1 is an owner of the relationship, and storages Entity1 id on its own side.
 */
export function OneToOne<T>(typeFunction: (type?: any) => ConstructorFunction<T>,
                            inverseSideOrOptions?: string|((object: T) => any)|RelationOptions,
                            options?: RelationOptions): Function {
    let inverseSideProperty: string|((object: T) => any);
    if (typeof inverseSideOrOptions === "object") {
        options = <RelationOptions> inverseSideOrOptions;
    } else {
        inverseSideProperty = <string|((object: T) => any)> inverseSideOrOptions;
    }

    return function (object: Object, propertyName: string) {
        if (!options) options = {} as RelationOptions;

        const reflectedType = (Reflect as any).getMetadata("design:type", object, propertyName);
        const isLazy = reflectedType && typeof reflectedType.name === "string" && reflectedType.name.toLowerCase() === "promise";

        const args: RelationMetadataArgs = {
            target: object.constructor,
            propertyName: propertyName,
            propertyType: reflectedType,
            isLazy: isLazy,
            relationType: RelationTypes.ONE_TO_ONE,
            type: typeFunction,
            inverseSideProperty: inverseSideProperty,
            options: options
        };
        getMetadataArgsStorage().relations.add(args);
    };
}