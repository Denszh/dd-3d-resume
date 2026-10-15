import assert from 'node:assert/strict'
import test from 'node:test'
import { resolveRoute } from '../src/routes.js'

test('resolves the Starift updates page, including a trailing slash', () => {
  assert.deepEqual(resolveRoute('/starift/updates/'), {
    page: 'updates',
    productPrefix: '/starift',
  })
})

test('keeps existing Starift support routes under the Starift prefix', () => {
  assert.deepEqual(resolveRoute('/starift/support'), {
    page: 'support',
    productPrefix: '/starift',
  })
})
