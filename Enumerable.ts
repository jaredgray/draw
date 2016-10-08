
Array.prototype.forEach = (iterator: Function) =>
{
    for (var index = 0; index < this.length; index++) {
        var element = this[index];
        iterator(element, index);
    }
};