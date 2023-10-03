const db = require('../database');

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  const values = [email, password];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = results[0];
    return res.json({ success: true, user: { firstName: user.firstname, lastName: user.lastname, email: user.email } });
  });
}

// signup user
const signupUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // Check if the email already exists
    const checkEmailQuery = 'SELECT COUNT(*) AS count FROM users WHERE email = ?';
    db.query(checkEmailQuery, [email], (checkEmailError, checkEmailResults) => {
        if (checkEmailError) {
            console.error(checkEmailError);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const emailExists = checkEmailResults[0].count > 0;

        if (emailExists) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // If email is unique, proceed with insertion
        const insertUserQuery = 'INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)';
        const values = [firstName, lastName, email, password];

        db.query(insertUserQuery, values, (insertError, result) => {
            if (insertError) {
                console.error(insertError);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            console.log('User added to the database');
            res.json({ success: true });
        });
    });
}

module.exports = { loginUser, signupUser };
