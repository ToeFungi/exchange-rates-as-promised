/**
 * Old mocha.opts
 *
 * --require ts-node/register
 * --require ./test/support/setup.spec.ts
 * --recursive test/unit/../...spec.ts
 */

module.exports = {
  require: [
    'ts-node/register',
    './test/support/setup.spec.ts'
  ],
  spec: './test/unit/**/*.spec.ts'
}
