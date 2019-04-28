"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
let disposables = [];
const watchFileChangeDisposables = _1.default('.env', '.env.example');
watchFileChangeDisposables.forEach(disposable => {
    disposables.push(disposable);
});
//# sourceMappingURL=watch.js.map