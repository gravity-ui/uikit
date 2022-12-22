class Point {
    x: number;
    y: number;
    timeStamp: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.timeStamp = Date.now();
    }
}

export class VelocityTracker {
    pointsLen: number;
    points: Point[] = [];

    constructor(len = 5) {
        this.pointsLen = len;
        this.clear();
    }

    clear() {
        this.points = new Array(this.pointsLen);
    }

    addMovement({x, y}: {x: number; y: number}) {
        this.points.pop();
        this.points.unshift(new Point(x, y));
    }

    getYAcceleration(lastPointCount = 1) {
        const endPoint = this.points[0];
        const startPoint = this.points[lastPointCount];

        if (!endPoint || !startPoint) {
            return 0;
        }

        return (endPoint.y - startPoint.y) / Math.pow(endPoint.timeStamp - startPoint.timeStamp, 2);
    }
}
