import React from 'react';
import { Route, IndexRoute } from "react-router"

import requireAuth from './utils/requireAuth.jsx';
import supervisorRole from './utils/supervisorRole.jsx';
import agentRole from './utils/agentRole.jsx';

import App from './App.jsx';

import DashboardWrapper from './components/dashboard/DashboardWrapper.jsx';

import WorkersWrapper from './components/workers/WorkersWrapper.jsx';
import WorkersView from './components/workers/WorkersView.jsx';
import WorkersCertificatesView from './components/workers/WorkersCertificatesView.jsx';

import ValidationWrapper from './components/validation/ValidationWrapper.jsx';
import ValidationView from './components/validation/ValidationView.jsx';

import TasksWrapper from './components/tasks/TasksWrapper.jsx';
import TasksView from './components/tasks/TasksView.jsx';

import Error404 from './components/errors/404.jsx';

export default (
	<Route>
		<Route path="/" component={ requireAuth(App) }>
			<IndexRoute component={DashboardWrapper} />

			<Route path="workers" component={WorkersWrapper} />
			<Route path="workers/:_id" component={WorkersView} />
			<Route path="workers/:_id/certificate/:certificateId" component={WorkersCertificatesView} />

			<Route path="validation" component={supervisorRole(ValidationWrapper)} />
			<Route path="validation/:_id" component={supervisorRole(ValidationView)} />

			<Route path="tasks" component={agentRole(TasksWrapper)} />
			<Route path="tasks/:_id" component={agentRole(TasksView)} />

		</Route>

		<Route path="*" component={Error404}/>
	</Route>
)