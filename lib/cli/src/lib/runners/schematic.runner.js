"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const debug_1 = require("debug");
const abstract_runner_1 = require("./abstract.runner");
class SchematicRunner extends abstract_runner_1.AbstractRunner {
    constructor() {
        super(`"${SchematicRunner.findClosestSchematicsBinary(__dirname)}"`);
    }
    static findClosestSchematicsBinary(path) {
        const segments = path.split(path_1.sep);
        const binaryPath = ['node_modules', '.bin', 'schematics'];
        const combineSegments = (pkgLastIndex) => [
            path_1.sep,
            ...segments.slice(0, pkgLastIndex),
            ...binaryPath,
        ];
        const globalBinPathSegments = combineSegments(segments.lastIndexOf('cli') + 1);
        const schematicsGlobalPath = path_1.join(...globalBinPathSegments);
        if (fs_1.existsSync(schematicsGlobalPath)) {
            return schematicsGlobalPath;
        }
        const localBinPathSegments = combineSegments(segments.lastIndexOf('node_modules'));
        const schematicsLocalPath = path_1.join(...localBinPathSegments);
        if (fs_1.existsSync(schematicsLocalPath)) {
            return schematicsLocalPath;
        }
        const schematicsBin = path_1.join(__dirname, '../../..', 'node_modules/.bin/schematics');
        this.debug('Äschematics binary: ' + schematicsBin);
        return schematicsBin;
    }
}
exports.SchematicRunner = SchematicRunner;
SchematicRunner.debug = debug_1.debug('schematic:runner');