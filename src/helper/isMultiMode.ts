export const isMultiMode = (): boolean => {
	const isMultiMode = process.argv.includes("--multi") || !!process.env.npm_config_multi;
	return isMultiMode;
};