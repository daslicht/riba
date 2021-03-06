"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const npm_runner_1 = require("./npm.runner");
const index_1 = require("../../interfaces/index");
const schematic_runner_1 = require("./schematic.runner");
const yarn_runner_1 = require("./yarn.runner");
class RunnerFactory {
    static create(runner) {
        switch (runner) {
            case index_1.Runner.SCHEMATIC:
                return new schematic_runner_1.SchematicRunner();
            case index_1.Runner.NPM:
                return new npm_runner_1.NpmRunner();
            case index_1.Runner.YARN:
                return new yarn_runner_1.YarnRunner();
            default:
                console.info(chalk_1.default.yellow(`[WARN] Unsupported runner: ${runner}`));
        }
    }
}
exports.RunnerFactory = RunnerFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVubmVyLmZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3J1bm5lcnMvcnVubmVyLmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBMEI7QUFDMUIsNkNBQXlDO0FBQ3pDLGtEQUFnRDtBQUNoRCx5REFBcUQ7QUFDckQsK0NBQTJDO0FBRTNDLE1BQWEsYUFBYTtJQUNqQixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQWM7UUFDakMsUUFBUSxNQUFNLEVBQUU7WUFDZCxLQUFLLGNBQU0sQ0FBQyxTQUFTO2dCQUNuQixPQUFPLElBQUksa0NBQWUsRUFBRSxDQUFDO1lBRS9CLEtBQUssY0FBTSxDQUFDLEdBQUc7Z0JBQ2IsT0FBTyxJQUFJLHNCQUFTLEVBQUUsQ0FBQztZQUV6QixLQUFLLGNBQU0sQ0FBQyxJQUFJO2dCQUNkLE9BQU8sSUFBSSx3QkFBVSxFQUFFLENBQUM7WUFFMUI7Z0JBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFLLENBQUMsTUFBTSxDQUFDLDhCQUE4QixNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDdEU7SUFDSCxDQUFDO0NBQ0Y7QUFoQkQsc0NBZ0JDIn0=