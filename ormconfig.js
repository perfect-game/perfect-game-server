import { get } from 'config';

const databaseConfig = get('database');

export default { ...databaseConfig };
