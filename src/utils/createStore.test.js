import {createStore} from "./createStore";
import {createHashHistory} from "history";

test('Create store test', () => {
    const createHistory = jest.fn().mockImplementation(() => createHashHistory());
    const store = createStore(createHistory());
    expect(store).toBeDefined();
});