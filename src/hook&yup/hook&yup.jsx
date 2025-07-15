import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import style from './hookForm.module.css';

const sendFormData = (formData) => {
	console.log(formData);
};

const fieldsSchema = yup.object().shape({
	email: yup
		.string()
		.matches(
			/^[|\w](\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)$/,
			'Неверный эмейл.',
		),
	password: yup
		.string()
		.min(3, 'Неверный пароль. Должно быть не меньше 3 символов')
		.max(20, 'Неверный пароль. Должно быть не больше 20 символов'),
	passwordRep: yup
		.string()
		.min(3, 'Неверный пароль. Должно быть не меньше 3 символов')
		.max(20, 'Неверный пароль. Должно быть не больше 20 символов')
		.test('is-equal', 'Значения пароль должны совпадать', function (value) {
			return value === this.parent.password;
		}),
});

export const HookAndYup = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			passwordRep: '',
		},
		resolver: yupResolver(fieldsSchema),
	});

	const emailError = errors.email?.message;
	const passwordError = errors.password?.message;
	const passwordRepError = errors.passwordRep?.message;

	return (
		<>
			<form action="#" onSubmit={handleSubmit(sendFormData)}>
				<div>
					{emailError && <div className={style.error}>{emailError}</div>}
					<input
						type="text"
						name="email"
						placeholder="Email"
						{...register('email')}
					/>
				</div>
				<div>
					{passwordError && <div className={style.error}>{passwordError}</div>}
					<input
						type="text"
						name="password"
						placeholder="Password"
						{...register('password')}
					/>
				</div>
				<div>
					{passwordRepError && <div className={style.error}>{passwordRepError}</div>}
					<input
						type="text"
						name="repeatPassword"
						placeholder="Repeat password"
						{...register('passwordRep')}
					/>
				</div>
				<input
					type="submit"
					value="Send"
					disabled={!(!emailError && !passwordError && !passwordRepError)}
				/>
			</form>
		</>
	);
};
