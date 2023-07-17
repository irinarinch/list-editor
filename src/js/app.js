import ProductsList from './ProductList';
import Widget from './Widget';

const list = new ProductsList();
const widget = new Widget(list);

widget.init();
