//
import * as foodGroceryService from '../../src/service/foodGroceryService';
import * as foodGroceryDao from '../../src/dao/FoodGroceryDao';
import { FoodGrocery } from '../../src/model/FoodGrocery';

jest.mock('../../src/dao/FoodGroceryDao');

const mockFoodGroceryDao = foodGroceryDao as any;

describe('saveFoodGrocery', () => {
    test('422 returned if no upc_food provided', async () => {
        // foodGroceryDao.saveFoodGrocery will return undefined rather than execute
        expect.assertions(1);
        // Stubbing - Replacing a method with a fake method implementation
        mockFoodGroceryDao.saveFoodGrocery.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });

        const payload = {
            food: 'Bread',
            //upc_food: '007341001385Bread',
            notes: 'Multi Grain'
        }

        try {
            // This async function should reject due to missing upc_food
            await foodGroceryService.saveFoodGrocery(payload);
            fail('foodGroceryService.saveFoodGrocery did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });

    test('422 returned if no food is provided', async () => {
        // foodGroceryDao.saveFoodGrocery will return undefined rather than execute
        expect.assertions(1);
        // Stubbing - Replacing a method with a fake method implementation
        mockFoodGroceryDao.saveFoodGrocery.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });

        const payload = {
            //food: 'Bread',
            upc_food: '007341001385Bread',
            notes: 'Multi Grain'
        }

        try {
            // This async function should reject due to missing firstName
            await foodGroceryService.saveFoodGrocery(payload);
            fail('foodGroceryService.saveFoodGrocery did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });

    test('Input object transformed to FoodGrocery object', async () => {
        mockFoodGroceryDao.saveFoodGrocery.mockImplementation(o => o);

        const payload = {
            food: 'Bread',
            upc_food: '007341001385Bread',
            notes: 'Multi Grain'
        };

        const result = await foodGroceryService.saveFoodGrocery(payload);

        expect(payload).not.toBeInstanceOf(FoodGrocery);
        expect(result).toBeInstanceOf(FoodGrocery);
    });


    test('Extraneous fields in input are not in output', async () => {
        mockFoodGroceryDao.saveFoodGrocery.mockImplementation(o => o);

        const payload = {
            food: 'Bread',
            upc_food: '007341001385Bread',
            notes: 'Multi Grain',
            likesSkateboards: true
        };

        const result = await foodGroceryService.saveFoodGrocery(payload) as any;

        expect(result.likesSkateboards).not.toBeDefined();
    });
});
//
//
//describe('patchPerson', () => {
//    /* Testing behavior of patchPerson */
//    /*
//        1. When a valid patch with an id property is provied, patch succeeds
//            returning a truthy object.
//        2. When a patch with no id property is provided, an error should be thrown.
//    */
//
//    test('successful patch', async () => {
//        expect.assertions(1);
//
//        mockPeopleDao.patchPerson
//            .mockImplementation(() => ({}));
//
//        const payload = {
//            id: 1,
//            firstName: 'Abby',
//            lastName: 'Adams',
//            birthdate: '2020-01-01'
//        };
//
//        const result = await peopleService.patchPerson(payload);
//        expect(result).toBeTruthy();
//    });
//
//    test('patch fails when no valid id is provided', async () => {
//        expect.assertions(1);
//
//        mockPeopleDao.patchPerson
//            .mockImplementation(() => ({}));
//
//        const payload = {
//            firstName: 'Abby',
//            lastName: 'Adams',
//            birthdate: '2020-01-01'
//        };
//
//        try {
//            await peopleService.patchPerson(payload);
//            fail();
//        } catch(err) {
//            expect(err).toBeTruthy();
//        }
//    });
//});