class Collision {
    static checkCollide(obj1, obj2) {
        let distX = Math.abs(obj1.x - obj2.x);
        let distY = Math.abs(obj1.y - obj2.y);
        if (distX < obj1.width / 2) {
            if (distY < obj1.height / 2) {
                return 1;
            }
        }
        return !1;
    }
}