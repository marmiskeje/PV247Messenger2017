import {uuid} from "./uuidGenerator";

test('Uuid generator test', () => {
    const id = uuid();
    expect(id).toBeDefined();
});