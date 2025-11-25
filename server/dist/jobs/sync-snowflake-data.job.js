"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const node_cron_1 = __importDefault(require("node-cron"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const snowflake_1 = __importDefault(require("../services/snowflake"));
const CACHE_DIRECTORY = path_1.default.join(__dirname, '..', 'cache');
// Create the cache directory if it doesn't exist
if (!fs_1.default.existsSync(CACHE_DIRECTORY)) {
    fs_1.default.mkdirSync(CACHE_DIRECTORY);
}
function sanitizeFilename(filename) {
    // Replace unsafe characters with underscores
    return filename.replace(/[^a-zA-Z0-9-_]/g, '_');
}
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    const cohortList = yield snowflake_1.default.getCohortList();
    const sortedCohortList = [
        {
            name: 'National',
            type: 'all',
            latitude: 35.86,
            longitude: -98.26,
            timezone: 'US/Eastern'
        }
    ];
    cohortList.forEach((region) => {
        sortedCohortList.push({
            name: region.name,
            type: region.type,
            latitude: region.latitude,
            longitude: region.longitude,
            timezone: region.timezone
        });
        if (region.divisions) {
            region.divisions.forEach((sub_region) => {
                sortedCohortList.push({
                    name: sub_region.name,
                    type: sub_region.type,
                    latitude: sub_region.latitude,
                    longitude: sub_region.longitude,
                    timezone: sub_region.timezone
                });
                if (sub_region.divisions) {
                    sub_region.divisions.forEach((division) => {
                        sortedCohortList.push({
                            name: division.name,
                            type: division.type,
                            latitude: division.latitude,
                            longitude: division.longitude,
                            timezone: division.timezone
                        });
                    });
                }
            });
        }
    });
    for (let i = 0; i < sortedCohortList.length; i++) {
        console.log(`[${i + 1} / ${sortedCohortList.length}] Fetching Cohort Data ${sortedCohortList[i].name} is started `);
        const cohortData = yield snowflake_1.default.getCohortData(sortedCohortList[i].name, sortedCohortList[i].type);
        const cacheFilename = `${sanitizeFilename(sortedCohortList[i].name).toLowerCase()}-${sanitizeFilename(sortedCohortList[i].type)}.json`;
        const cacheFilePath = path_1.default.join(__dirname, '..', 'cache', cacheFilename);
        // Add a timestamp field to the result
        const timestampedResult = {
            timestamp: new Date().toISOString(),
            data: cohortData
        };
        try {
            fs_1.default.writeFileSync(cacheFilePath, JSON.stringify(timestampedResult, null, 2));
            console.log(`Result saved to ${cacheFilePath}`);
        }
        catch (error) {
            console.error('Error saving result to cache:', error);
        }
    }
});
if (process.argv[2] === '--now') {
    run();
}
else {
    node_cron_1.default.schedule('*/30 * * * *', run);
}
