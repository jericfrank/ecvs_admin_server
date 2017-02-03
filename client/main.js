import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, browserHistory } from "react-router";
import { IntlProvider } from 'react-intl';

import routes from '../imports/ui/Routes.jsx';

Meteor.startup(() => {
  render( <IntlProvider locale="en"><Router history={browserHistory} routes={routes} /></IntlProvider> , document.getElementById('app'));
});