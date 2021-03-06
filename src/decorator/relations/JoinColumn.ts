import {getMetadataArgsStorage} from "../../index";
import {JoinColumnOptions} from "../options/JoinColumnOptions";
import {JoinColumnMetadataArgs} from "../../metadata-args/JoinColumnMetadataArgs";

/**
 */
export function JoinColumn(options?: JoinColumnOptions): Function {
    return function (object: Object, propertyName: string) {
        options = options || {} as JoinColumnOptions;
        const args: JoinColumnMetadataArgs = {
            target: object.constructor,
            propertyName: propertyName,
            name: options.name,
            referencedColumnName: options.referencedColumnName
        };
        getMetadataArgsStorage().joinColumns.add(args);
    };
}

