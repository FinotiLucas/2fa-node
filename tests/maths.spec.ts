import { test } from '@japa/runner'

function sum(a: number, b:number) {
  return a + b
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
test('add two numbers', ({ assert }: any) => {
  assert.equal(sum(2, 2), 4)
})
