module.exports = {
  require: [
    'ts-node/register',
    './test/support/setup.spec.ts'
  ],
  spec: './test/unit/**/*.spec.ts'
}
