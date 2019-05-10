"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const sync_env_1 = require("../sync-env");
const filePath = [
    { path: "/users/fish/.env", expect: '.env' },
    { path: "/users/fish/.env.example", expect: '.env' },
    { path: "/users/fish/.env.local", expect: '.env' },
    { path: "users/fish/.env", expect: '.env' }
];
suite("Sync Env helpers", function () {
    test("Get file name", function () {
        filePath.forEach(file => {
            assert.equal(sync_env_1.getFileName(file.path), file.expect);
        });
    });
});
//# sourceMappingURL=sync-env.test.js.map