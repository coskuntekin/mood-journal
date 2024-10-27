import SQLite from 'react-native-sqlite-storage';

// Open or create the database
const db = SQLite.openDatabase({name: 'mood_journal.db', location: 'default'});

// Create the tables
db.transaction((tx: SQLite.Transaction) => {
  // Create the users table
  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      profileImage TEXT,
      calendarStartDay TEXT NOT NULL DEFAULT '0'
    );`,
  );

  // Create the moods table
  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS moods (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      emoji TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      note TEXT,
      FOREIGN KEY (userId) REFERENCES users (id)
    );`,
  );
});

// Insert a new user
const insertUser = async (
  username: string,
  profileImage: string,
  calendarStartDay: string,
) => {
  (await db).transaction((tx: SQLite.Transaction) => {
    tx.executeSql(
      'INSERT INTO users (username, profileImage, calendarStartDay) VALUES (?, ?, ?)',
      [username, profileImage, calendarStartDay],
    );
  });
};

const updateUserSettings = async (
  userId: number,
  username: string,
  profileImage: string,
  calendarStartDay: string,
) => {
  return new Promise<void>(async (resolve, reject) => {
    (await db).transaction((tx: SQLite.Transaction) => {
      tx.executeSql(
        'UPDATE users SET username = ?, profileImage = ?, calendarStartDay = ? WHERE id = ?',
        [username, profileImage, calendarStartDay, userId],
        (_, results) => {
          if (results.rowsAffected > 0) {
            resolve();
          } else {
            reject(new Error('Failed to update user settings'));
          }
        },
      );
    });
  });
};

const insertMood = async (
  userId: number,
  emoji: string,
  date: string,
  time: string,
  note: string,
) => {
  (await db).transaction((tx: SQLite.Transaction) => {
    tx.executeSql(
      'INSERT INTO moods (userId, emoji, date, time, note) VALUES (?, ?, ?, ?, ?)',
      [userId, emoji, date, time, note],
    );
  });
};

const getUserProfile = (userId: number) => {
  return new Promise(async (resolve, reject) => {
    (await db).transaction((tx: SQLite.Transaction) => {
      tx.executeSql(
        'SELECT username, profileImage, calendarStartDay FROM users WHERE id = ?',
        [userId],
        (tx, results) => {
          if (results.rows.length > 0) {
            const {username, profileImage, calendarStartDay} =
              results.rows.item(0);
            resolve({username, profileImage, calendarStartDay});
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
        'SELECT emoji, date, time, note FROM moods WHERE userId = ?',
        [userId],
        (tx, results) => {
          const moods = [];
          for (let i = 0; i < results.rows.length; i++) {
            const {emoji, date, time, note} = results.rows.item(i);
            moods.push({emoji, date, time, note});
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
        'SELECT emoji, date, time, note FROM moods WHERE userId = ? AND date = ?',
        [userId, date],
        (tx, results) => {
          const moods = [];
          for (let i = 0; i < results.rows.length; i++) {
            const {emoji, date: moodDate, time, note} = results.rows.item(i);
            moods.push({emoji, date: moodDate, time, note});
          }
          resolve(moods);
        },
      );
    });
  });
};

const exportDatabaseData = async () => {
  return new Promise(async (resolve, _) => {
    const userData = await new Promise(async (resolve, reject) => {
      (await db).transaction(tx => {
        tx.executeSql(
          'SELECT id, username, profileImage FROM users',
          [],
          (__, results) => {
            const users = [];
            for (let i = 0; i < results.rows.length; i++) {
              const {id, username, profileImage} = results.rows.item(i);
              users.push({id, username, profileImage});
            }
            resolve(users);
          },
          error => reject(error),
        );
      });
    });

    const moodData = await new Promise(async (resolve, reject) => {
      (await db).transaction(tx => {
        tx.executeSql(
          'SELECT userId, emoji, date, time, note FROM moods',
          [],
          (__, results) => {
            const moods = [];
            for (let i = 0; i < results.rows.length; i++) {
              const {userId, emoji, date, time, note} = results.rows.item(i);
              moods.push({userId, emoji, date, time, note});
            }
            resolve(moods);
          },
          error => reject(error),
        );
      });
    });

    resolve({users: userData, moods: moodData});
  });
};

export {
  insertUser,
  insertMood,
  getUserProfile,
  getUserMoods,
  updateUserSettings,
  getUserMoodsByDate,
  exportDatabaseData,
};
