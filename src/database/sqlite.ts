import * as SQLite from 'expo-sqlite';
const sqlite = SQLite as unknown as { openDatabaseSync?: (name: string) => any; openDatabase?: (name: string) => any };
export const db = sqlite.openDatabaseSync ? sqlite.openDatabaseSync('worship-flow.db') : sqlite.openDatabase?.('worship-flow.db');
export async function executeSql(sql: string, params: unknown[] = []) { if (db?.runAsync) return db.runAsync(sql, params); return new Promise((resolve, reject) => db.transaction((tx: any) => tx.executeSql(sql, params, (_: any, result: any) => resolve(result), (_: any, error: any) => { reject(error); return false; }))); }
export async function getAll<T>(sql: string, params: unknown[] = []): Promise<T[]> { if (db?.getAllAsync) return db.getAllAsync(sql, params); const result: any = await executeSql(sql, params); return result.rows?._array ?? []; }
export async function getFirst<T>(sql: string, params: unknown[] = []): Promise<T | null> { if (db?.getFirstAsync) return db.getFirstAsync(sql, params); const rows = await getAll<T>(sql, params); return rows[0] ?? null; }
