// DatabaseService.js
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("HealthWorker1.db");

export default db;
