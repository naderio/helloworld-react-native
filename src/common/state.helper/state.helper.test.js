import * as StateHelper from './state.helper';

test('StateHelper.createAction', () => {
  const output = StateHelper.createAction('MODULE', 'doSomething');

  expect({ ...output }).toMatchObject({
    MODULE: 'MODULE',
    NAME: 'doSomething',
    ID: 'MODULE.doSomething',
    TYPE: 'MODULE.doSomething.ACTION',
  });

  expect(typeof output.action).toBe('function');

  expect(output.action()).toStrictEqual({
    type: output.TYPE,
  });

  expect(
    output.action({
      a: 1,
      b: 2,
    }),
  ).toStrictEqual({
    type: output.TYPE,
    a: 1,
    b: 2,
  });
});

test('StateHelper.createAsyncAction', () => {
  const output = StateHelper.createAsyncAction('MODULE', 'doSomething', (x = 1) => x);

  let dispatch;

  expect({ ...output }).toMatchObject({
    MODULE: 'MODULE',
    NAME: 'doSomething',
    ID: 'MODULE.doSomething',
    REQUEST: 'MODULE.doSomething.REQUEST',
    SUCCESS: 'MODULE.doSomething.SUCCESS',
    FAILURE: 'MODULE.doSomething.FAILURE',
  });

  expect(typeof output.request).toBe('function');

  expect(output.request()).toStrictEqual({
    type: output.REQUEST,
  });

  expect(
    output.request({
      a: 1,
      b: 2,
    }),
  ).toStrictEqual({
    type: output.REQUEST,
    a: 1,
    b: 2,
  });

  expect(typeof output.success).toBe('function');

  dispatch = jest.fn();

  expect(output.success()(dispatch)).toStrictEqual({});

  expect(dispatch).toBeCalledWith({
    type: output.SUCCESS,
  });

  expect(
    output.success({
      a: 1,
      b: 2,
    })(dispatch),
  ).toStrictEqual({
    a: 1,
    b: 2,
  });

  expect(dispatch).toBeCalledWith({
    type: output.SUCCESS,
    a: 1,
    b: 2,
  });

  expect(typeof output.failure).toBe('function');

  dispatch = jest.fn();

  const error = new Error('error');

  expect(() => output.failure(error)(dispatch)).toThrowError(error);

  expect(dispatch).toBeCalledWith({
    type: output.FAILURE,
  });
});
