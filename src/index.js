import dva from 'dva';
import { IntlProvider } from 'react-intl';
import ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

import './index.css';


// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);

app.model(require('./models/order').default)

// 4. Router
app.router(require('./router').default);

// 5. Start
// app.start('#root');

const App = app.start();


ReactDOM.render(
    <IntlProvider locale='en'>
        <I18nextProvider i18n={i18n}>
            <App/>
        </I18nextProvider>
    </IntlProvider>
, document.getElementById("root"));
