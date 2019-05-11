import * as assert from 'assert';
import {
    getFileName
} from '../sync-env';

const filePath = [
  {path: "/users/fish/.env", expect: '.env'},
  {path: "/users/fish/.env.example", expect: '.env.example'},
  {path: "/users/fish/.env.local", expect: '.env.local'},
  {path: "users/fish/.env", expect: '.env'}
];

suite("Sync Env helpers", function () {

    test("Get file name", function() {
        filePath.forEach(file => {
            assert.equal(getFileName(file.path), file.expect);
        });
    });
});