import {createHistory} from "./createHistory";

test('Create history test', () => {
    const history = createHistory();
    expect(history).toBeDefined();
});