import {VelocityTracker} from '../utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('VelocityTracker', () => {
    // 9.1
    test('keeps a fixed-size buffer and drops the oldest points', () => {
        const tracker = new VelocityTracker(3);

        tracker.addMovement({x: 0, y: 1});
        tracker.addMovement({x: 0, y: 2});
        tracker.addMovement({x: 0, y: 3});
        tracker.addMovement({x: 0, y: 4});
        tracker.addMovement({x: 0, y: 5});

        expect(tracker.points).toHaveLength(3);
        // The most recent movement is stored first
        expect(tracker.points[0].y).toBe(5);
        // Only the last 3 movements are kept
        expect(tracker.points.map((point) => point.y)).toEqual([5, 4, 3]);
    });

    // 9.2
    test('clear() resets stored points', () => {
        const tracker = new VelocityTracker(3);

        tracker.addMovement({x: 0, y: 1});
        tracker.addMovement({x: 0, y: 2});

        tracker.clear();

        expect(tracker.points).toHaveLength(3);
        expect(tracker.points.filter(Boolean)).toHaveLength(0);
        expect(tracker.getYAcceleration()).toBe(0);
    });

    // 9.3
    test('getYAcceleration() returns 0 when there are not enough points', () => {
        const tracker = new VelocityTracker();

        // No points at all
        expect(tracker.getYAcceleration()).toBe(0);

        // Only a single point — not enough to compute acceleration
        tracker.addMovement({x: 0, y: 10});
        expect(tracker.getYAcceleration()).toBe(0);
    });

    // 9.4
    test('getYAcceleration() computes acceleration by the delta-y / delta-t^2 formula', () => {
        const nowSpy = jest.spyOn(Date, 'now');
        nowSpy.mockReturnValueOnce(1000).mockReturnValueOnce(1100);

        const tracker = new VelocityTracker();
        tracker.addMovement({x: 0, y: 0}); // start point, timeStamp 1000
        tracker.addMovement({x: 0, y: 50}); // end point, timeStamp 1100

        const expected = (50 - 0) / Math.pow(1100 - 1000, 2);

        expect(tracker.getYAcceleration()).toBeCloseTo(expected);
        expect(tracker.getYAcceleration()).toBeCloseTo(0.005);
    });

    // 9.5
    test('getYAcceleration() sign reflects the movement direction', () => {
        const nowSpy = jest.spyOn(Date, 'now');
        nowSpy
            .mockReturnValueOnce(1000)
            .mockReturnValueOnce(1100)
            .mockReturnValueOnce(1000)
            .mockReturnValueOnce(1100);

        const movingDown = new VelocityTracker();
        movingDown.addMovement({x: 0, y: 0});
        movingDown.addMovement({x: 0, y: 100});

        const movingUp = new VelocityTracker();
        movingUp.addMovement({x: 0, y: 100});
        movingUp.addMovement({x: 0, y: 0});

        expect(movingDown.getYAcceleration()).toBeGreaterThan(0);
        expect(movingUp.getYAcceleration()).toBeLessThan(0);
    });
});
