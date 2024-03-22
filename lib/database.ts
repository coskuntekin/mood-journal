import SQLite from 'react-native-sqlite-storage';

// Open or create the database
const db = SQLite.openDatabase({name: 'mood_journal.db', location: 'default'});

// Create the tables
db.transaction((tx: SQLite.Transaction) => {
  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      profileImage TEXT
    );`,
  );

  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS moods (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      emoji TEXT NOT NULL,
      date TEXT NOT NULL,
      note TEXT,
      FOREIGN KEY (userId) REFERENCES users (id)
    );`,
  );
});

// Insert a new user
const insertUser = async (username: string, profileImage: string) => {
  (await db).transaction((tx: SQLite.Transaction) => {
    tx.executeSql('INSERT INTO users (username, profileImage) VALUES (?, ?)', [
      username,
      profileImage,
    ]);
  });
};

const insertMood = async (
  userId: number,
  emoji: string,
  date: string,
  note: string,
) => {
  (await db).transaction((tx: SQLite.Transaction) => {
    tx.executeSql(
      'INSERT INTO moods (userId, emoji, date, note) VALUES (?, ?, ?, ?)',
      [userId, emoji, date, note],
    );
  });
};

const updateMood = async (moodId: number, moodEmoji: string) => {
  (await db).transaction(tx => {
    tx.executeSql('UPDATE moods SET moodEmoji = ? WHERE id = ?', [
      moodEmoji,
      moodId,
    ]);
  });
};

const getUserProfile = (userId: number) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT username, profileImage FROM users WHERE id = ?',
        [userId],
        (tx, results) => {
          if (results.rows.length > 0) {
            const {username, profileImage} = results.rows.item(0);
            resolve({username, profileImage});
          } else {
            reject(new Error('User not found'));
          }
        },
      );
    });
  });
};

const getUserMoods = async (userId: number) => {
  return new Promise(async (resolve, _) => {
    (await db).transaction((transaction: SQLite.Transaction) => {
      transaction.executeSql(
        'SELECT emoji, date, note FROM moods WHERE userId = ?',
        [userId],
        (tx, results) => {
          const moods = [];
          for (let i = 0; i < results.rows.length; i++) {
            const {emoji, date, note} = results.rows.item(i);
            moods.push({emoji, date, note});
          }
          resolve(moods);
        },
      );
    });
  });
};

const getUserMoodsByDate = async (userId: number, date: string) => {
  return new Promise(async (resolve, _) => {
    (await db).transaction((transaction: SQLite.Transaction) => {
      transaction.executeSql(
        'SELECT emoji, date, note FROM moods WHERE userId = ? AND date = ?',
        [userId, date],
        (tx, results) => {
          const moods = [];
          for (let i = 0; i < results.rows.length; i++) {
            const {emoji, date: moodDate, note} = results.rows.item(i);
            moods.push({emoji, date: moodDate, note});
          }
          resolve(moods);
        },
      );
    });
  });
};

export {
  insertUser,
  insertMood,
  getUserProfile,
  getUserMoods,
  getUserMoodsByDate,
};
