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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const snowflake_1 = __importDefault(require("./services/snowflake"));
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.get('/api/cohorts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield snowflake_1.default.getCohortList();
    res.json(result);
}));
app.get('/api/metrics', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield snowflake_1.default.getMetrics();
    res.json(result);
}));
const CACHE_DIRECTORY = path_1.default.join(__dirname, 'cache');
// Create the cache directory if it doesn't exist
if (!fs_1.default.existsSync(CACHE_DIRECTORY)) {
    fs_1.default.mkdirSync(CACHE_DIRECTORY);
}
function sanitizeFilename(filename) {
    // Replace unsafe characters with underscores
    return filename.replace(/[^a-zA-Z0-9-_]/g, '_');
}
app.get('/api/data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cohort, cohort_type } = req.query;
    // Sanitize and validate input values
    const sanitizedCohort = sanitizeFilename(cohort);
    const sanitizedCohortType = sanitizeFilename(cohort_type);
    const cacheFilename = `${sanitizedCohort.toLowerCase()}-${sanitizedCohortType}.json`;
    const cacheFilePath = path_1.default.join(__dirname, 'cache', cacheFilename);
    if (fs_1.default.existsSync(cacheFilePath)) {
        try {
            console.log('## Date is fetched from cache: ', cacheFilePath);
            const fileContents = fs_1.default.readFileSync(cacheFilePath, 'utf8');
            const cachedData = JSON.parse(fileContents);
            // Return the cached data
            res.json(cachedData.data);
            return;
        }
        catch (error) {
            console.error('Error reading cache file:', error);
        }
    }
    console.log(`Fetching data from snowflake`);
    const result = yield snowflake_1.default.getCohortData(cohort, cohort_type);
    const timestampedResult = {
        timestamp: new Date().toISOString(),
        data: result
    };
    try {
        fs_1.default.writeFileSync(cacheFilePath, JSON.stringify(timestampedResult, null, 2));
        console.log(`Result saved to ${cacheFilePath}`);
    }
    catch (error) {
        console.error('Error saving result to cache:', error);
    }
    res.json(result);
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
