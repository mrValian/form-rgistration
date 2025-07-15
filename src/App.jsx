// import { useState } from 'react';
// import { SimpleForm } from './components/simple/Form';
import { HookAndYup } from './components/hook&yup/hook&yup';

import style from './app.module.css';

export const App = () => {
	return (
		<div className={style.app}>
			{/* <SimpleForm /> */}
			<HookAndYup />
		</div>
	);
};
