import { App } from './components/App';
import { dispatcher } from './middleware/dispatcher';
import reducers from './reducers';

exports.App = App;
exports.Dispatcher = dispatcher;
exports.reducers = reducers;
