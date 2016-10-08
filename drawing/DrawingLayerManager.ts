class DrawingLayerManager implements IEventHost<ILayerCollectionChangedCallback>, IEventHost<IActiveLayerChangedCallback>
{
    constructor()
    {
        this._layers = new Array<DrawingLayer>();
        this.LayerCollectionChanged = new TEvent<ILayerCollectionChangedCallback>();
        this._layerCollectionChangedItems = this.LayerCollectionChanged.getItems();
        this.ActiveLayerChanged = new TEvent<IActiveLayerChangedCallback>();
        this._activeLayerChangedItems = this.ActiveLayerChanged.getItems();
    }
    private _layers: Array<DrawingLayer>;
    private _activeLayer: DrawingLayer;

    // Events
    public LayerCollectionChanged: TEvent<ILayerCollectionChangedCallback>;
    public ActiveLayerChanged: TEvent<IActiveLayerChangedCallback>;

    // Events impl
    private _layerCollectionChangedItems: Array<ILayerCollectionChangedCallback>;
    private _activeLayerChangedItems: Array<IActiveLayerChangedCallback>;


    public addLayer(layer: DrawingLayer)
    {
        if (this._layers.indexOf(layer) == -1)
        {
            var callbacks = this._layerCollectionChangedItems;
            for (var index = 0; index < callbacks.length; index++)
            {
                var element = callbacks[index];
                if (element)
                    element(layer, true);
            }
        }
    }
    public removeLayer(layer: DrawingLayer)
    {
        if (this._layers.indexOf(layer) == -1)
        {
            var callbacks = this._layerCollectionChangedItems;
            for (var index = 0; index < callbacks.length; index++)
            {
                var element = callbacks[index];
                if (element)
                    element(layer, false);
            }
        }
    }


}

interface ILayerCollectionChangedCallback
{
    (layer: DrawingLayer, added: boolean): void;
}
interface IActiveLayerChangedCallback
{
    (newlayer: DrawingLayer, oldlayer: DrawingLayer): void;
}