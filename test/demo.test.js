function sum(a, b) {
  return a + b;
}
test('10 + 20 is 30', () => {
  const res = sum(10, 20);
  expect(res).not.toBe(20);
  expect(res).toBe(30);
});
