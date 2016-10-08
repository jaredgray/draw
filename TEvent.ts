class TEvent<T>
{
    constructor()
    {
        this._eventHandlers = new Array<T>();
        this._getItemsCount = 0;
    }

    private _eventHandlers: Array<T>;
    private _getItemsCount: number;
    /**
     * by convention the host of an event should create the event instance in it's constructor
     * immediately followed by a call to getItems() to get a reference to the internal collection.
     * this prevents unwanted references to the internal collection
     */
    public getItems() : Array<T>
    {
        if(this._getItemsCount > 0)
            throw 'there is only one opportunity to get the internal items collection which are intended only for the host of the event.';
        ++this._getItemsCount;
        return this._eventHandlers;
    }

    public add(handler: T)
    {
        if(this._eventHandlers.indexOf(handler) == -1)
        {
            this._eventHandlers.push(handler);
        }
    }

    public remove(handler: T)
    {
        if(this._eventHandlers.indexOf(handler) != -1)
        {
            this._eventHandlers.slice(this._eventHandlers.indexOf(handler), 1);
        }
    }
}