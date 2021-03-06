import React from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import Layout from "layout/Layout";

const Welcome = React.lazy(() => import("pages/Welcome/Welcome"));
const CreatorDetails = React.lazy(() => import("pages/CreatorDetails/CreatorDetails"));

const App = () => {

	return (
		<Layout>
            <React.Suspense fallback={<p>Loading...</p>}>
				<Switch>
					<Route path="/" exact component={Welcome} />
					<Route path="/:username" exact component={CreatorDetails} />
					{/* <Route path="*" exact component={NotFound} /> */}
				</Switch>
            </React.Suspense>
		</Layout>
	);
}

export default withRouter(App);
