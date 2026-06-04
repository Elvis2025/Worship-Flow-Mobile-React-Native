import * as SQLite from 'expo-sqlite';

type LegacyResult<T> = {
  rows: {
    _array: T[];
  };
};

type SQLiteDatabase = {
  runAsync?: (sql: string, params?: unknown[]) => Promise<unknown>;
  getAllAsync?: <T>(sql: string, params?: unknown[]) => Promise<T[]>;
  getFirstAsync?: <T>(sql: string, params?: unknown[]) => Promise<T | null>;
  transaction?: (callback: (tx: { executeSql: Function }) => void) => void;
};

const sqliteModule = SQLite as typeof SQLite & {
  openDatabaseSync?: (name: string) => SQLiteDatabase;
  openDatabase?: (name: string) => SQLiteDatabase;
};

export const db = sqliteModule.openDatabaseSync
  ? sqliteModule.openDatabaseSync('worship-flow.db')
  : sqliteModule.openDatabase?.('worship-flow.db');

export async function executeSql(sql: string, params: unknown[] = []): Promise<unknown> {
  if (!db) throw new Error('SQLite database is not available.');
  if (db.runAsync) return db.runAsync(sql, params);

  return new Promise((resolve, reject) => {
    db.transaction?.((tx) => {
      tx.executeSql(
        sql,
        params,
        (_: unknown, result: unknown) => resolve(result),
        (_: unknown, error: Error) => {
          reject(error);
          return false;
        },
      );
    });
  });
}

export async function getAll<T>(sql: string, params: unknown[] = []): Promise<T[]> {
  if (!db) throw new Error('SQLite database is not available.');
  if (db.getAllAsync) return db.getAllAsync<T>(sql, params);

  const result = (await executeSql(sql, params)) as LegacyResult<T>;
  return result.rows._array;
}

export async function getFirst<T>(sql: string, params: unknown[] = []): Promise<T | null> {
  if (!db) throw new Error('SQLite database is not available.');
  if (db.getFirstAsync) return db.getFirstAsync<T>(sql, params);

  const rows = await getAll<T>(sql, params);
  return rows[0] ?? null;
}
