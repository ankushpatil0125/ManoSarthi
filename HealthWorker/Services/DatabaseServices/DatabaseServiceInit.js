// DatabaseService.js
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("HealthWorker.db");

export default db;
