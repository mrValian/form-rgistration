import { useState, useRef } from 'react';
import style from './form.module.css';

const initialState = {
	email: '',
	password: '',
	repeatPassword: '',
};

const useStore = () => {
	const [state, setState] = useState(initialState);

	return {
		getState: () => state,
		updateState: (fieldName, newValue) => {
			setState({ ...state, [fieldName]: newValue });
		},
	};
};

const sendData = (formData) => {
	console.log(formData);
};

export const SimpleForm = () => {
	const { getState, updateState } = useStore();

	const [emailValid, setEmailValid] = useState(true);
	const [emailError, setEmailError] = useState('');
	const [areEqual, setAreEqual] = useState(true);
	const [passwordError, setPasswordError] = useState('');
	const [repPasswordError, setRepPasswordError] = useState('');

	const submitBtnRef = useRef(null);

	const onSubmit = (event) => {
		event.preventDefault();

		sendData(getState());
	};

	const { email, password, repeatPassword } = getState();

	const compereValue = (value1, value2) => {
		if (value1 === value2) {
			setAreEqual(false);
		} else {
			setAreEqual(true);
		}
	};

	const onChange = ({ target }) => {
		const value = target.value;
		const name = target.name;

		console.log(value);

		if (name === 'email') {
			updateState(name, value);
			if (!/^[|\w](\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)$/.test(email)) {
				setEmailError('Email не валиден');
				setEmailValid(true);
			} else {
				setEmailValid(false);
				setEmailError('');
			}
		} else if (name === 'password') {
			updateState(name, value);

			if (value.length < 6) {
				setPasswordError('Пароль должен быть больше 6 символов.');
			} else {
				setPasswordError('');
			}

			compereValue(value, repeatPassword);
		} else if (name === 'repeatPassword') {
			updateState(name, value);

			if (value.length < 6) {
				setRepPasswordError('Пароль должен быть больше 6 символов.');
			} else if (password !== value) {
				setRepPasswordError('Пароли не совпадают.');
			} else {
				setRepPasswordError('');
			}

			compereValue(password, value);
		}

		if (submitBtnRef.current) {
			submitBtnRef.current.focus();
		}
	};

	// const onBlur = ({target}) => {
	// }

	return (
		<>
			<form action="#" onSubmit={onSubmit}>
				<div>
					{emailError !== '' && <div className={style.error}>{emailError}</div>}
					<input
						type="email"
						name="email"
						placeholder="Email"
						value={email}
						onChange={onChange}
					/>
				</div>
				<div>
					{passwordError !== '' && (
						<div className={style.error}>{passwordError}</div>
					)}
					<input
						type="text"
						name="password"
						placeholder="Password"
						value={password}
						onChange={onChange}
					/>
				</div>
				<div>
					{repPasswordError !== '' && (
						<div className={style.error}>{repPasswordError}</div>
					)}
					<input
						type="text"
						name="repeatPassword"
						placeholder="Repeat password"
						value={repeatPassword}
						onChange={onChange}
						// onBlur={onBlur}
					/>
				</div>
				<button
					ref={submitBtnRef}
					type="submit"
					disabled={!(!emailValid && !areEqual)}
				>
					Send
				</button>
			</form>
		</>
	);
};
