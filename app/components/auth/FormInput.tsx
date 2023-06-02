'use client';

import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "./ErrorMessage";

export const FormInput = ({
	label,
	name,
	type,
	formOptions,
	errors,
}: {
	label?: any;
	name?: string;
	type?: any;
	formOptions?: any;
	errors?: any;
}) => {
	const { register } = useFormContext();

	return (
		<>
			<div className="mt-2">
				{label && (
					<div className="flex items-center justify-between">
						<label htmlFor="" className="block text-sm font-medium leading-6 text-mokki-green">
							{label}
						</label>
					</div>
				)}
				<>
					<input
						type={`${type ? type : "text"}`}
						{...register(name ? name : "", formOptions)}
						className={`bg-gray-100 form-input border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 text-gray-500  text-normal py-3 h-12 px-2 text-lg w-full flex items-center`}
					/>
				</>
			</div>
			<ErrorMessage name={errors} />
		</>
	);
};
