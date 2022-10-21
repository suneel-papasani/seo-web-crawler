const { normalizeURL, getURLsFromHTML } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL protocol', () => {
  const input = 'https://blog.sun.to/path'
  const actual = normalizeURL(input)
  const expected = 'blog.sun.to/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL slash', () => {
  const input = 'https://blog.sun.to/path/'
  const actual = normalizeURL(input)
  const expected = 'blog.sun.to/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
  const input = 'https://BLOG.sun.to/path'
  const actual = normalizeURL(input)
  const expected = 'blog.sun.to/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL http', () => {
  const input = 'http://BLOG.sun.to/path'
  const actual = normalizeURL(input)
  const expected = 'blog.sun.to/path'
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute', () => {
  const inputURL = 'https://blog.sun.to'
  const inputBody = '<html><body><a href="https://blog.sun.to"><span>Sun.to></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = [ 'https://blog.sun.to/' ]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
  const inputURL = 'https://blog.sun.to'
  const inputBody = '<html><body><a href="/path/one"><span>Sun.to></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = [ 'https://blog.sun.to/path/one' ]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML both', () => {
  const inputURL = 'https://blog.sun.to'
  const inputBody = '<html><body><a href="/path/one"><span>Sun.to></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = [ 'https://blog.sun.to/path/one', 'https://other.com/path/one' ]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML handle error', () => {
  const inputURL = 'https://blog.sun.to'
  const inputBody = '<html><body><a href="path/one"><span>Sun.to></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = [ ]
  expect(actual).toEqual(expected)
})
