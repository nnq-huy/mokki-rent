export const ErrorMessage = ({ name }: { name: any }) => {
	return (
		<>
			<p className="text-red-500 dark:text-orange-600">{name?.message}</p>
		</>
	);
};
